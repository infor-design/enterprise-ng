// tslint:disable-next-line:no-unused-variable
import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
  QueryList, NgZone
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';

import { SohoSearchFieldComponent } from '../searchfield/soho-searchfield.component';

/**
 * This component will allow the developer to modify any DOM element
 * by exposing it (if desired)
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listview-search]',
    template: `
    <input soho-searchfield *ngIf="buildSearch">
    <ng-content select="span[soho-searchfield-wrapper]"></ng-content>
    <ng-content select="input[soho-searchfield]"></ng-content>
    <ng-content></ng-content>
  `,
    standalone: false
})
export class SohoListViewSearchComponent {
  /**
   * Use this flag if you are projecting a soho-searchfield into this component
   * from another component and do not want this component to build another
   * searchfield
   */
  @Input() buildSearch = true;

  @HostBinding('class.listview-search') get isListviewSearch() {
    return true;
  }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listview-item]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoListViewItemComponent implements AfterViewInit {
  /** Underling jQuery item. */
  private listItem?: JQuery;

  /** Sets the item as disabled.  */
  @HostBinding('class.is-disabled')
  @Input() disabled = false;

  /** Sets the item as selected.  */
  @HostBinding('class.is-selected')
  @Input() selected = false;

  /**
   * Constructor.
   *
   * @param element - the element.
   */
  constructor(public element: ElementRef) { }

  /**
   * The index of the list view item in it's parent.
   */
  public get index() {
    return this.selector?.index();
  }

  public get selector() {
    return this.listItem;
  }

  ngAfterViewInit(): void {
    this.listItem = jQuery(this.element.nativeElement);
  }

}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listview-header]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoListViewHeaderComponent {
  @HostBinding('class.listview-heading') get isHeading() {
    return true;
  }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listview-subheader]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoListViewSubHeaderComponent {
  @HostBinding('class.listview-subheading') get isSubHeading() {
    return true;
  }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listview-micro]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoListViewMicroComponent {
  @HostBinding('class.listview-micro') get isMicro() {
    return true;
  }
}

@Component({
    selector: 'soho-listview',
    templateUrl: 'soho-listview.component.html',
    styles: [`
    .smaller {
      width: 50%;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoListViewComponent implements AfterViewInit, OnDestroy, AfterViewChecked {
  @ContentChildren(SohoListViewItemComponent) items?: QueryList<SohoListViewItemComponent>;

  /**
   * String of classes to append to the class for the list-view div element
   */
  @Input() class?: string;

  @Input() sohoListviewElementId?: string;

  /**
   * Force a update to fire next viewChecked.
   */
  public updateRequired?: boolean;

  /**
   * Array of data
   */
  @Input() set dataset(value: Object[] | undefined) {
    this.options.dataset = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.dataset = value;
      this.updateRequired = true;
    }
  }
  get dateset(): Object[] | undefined {
    return this.options.dataset;
  }

  /** Audible Label (or use parent title). */
  @Input() set description(value: string) {
    this.options.description = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.description = value;
      this.updateRequired = true;
    }
  }

  /** If paging is activated, sets the number of listview items available per page. */
  @Input() set pagesize(value: number) {
    this.options.pagesize = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.pagesize = value;
      this.updateRequired = true;
    }
  }

  /** If true, activates paging. */
  @Input() set paging(value: boolean) {
    this.options.paging = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.paging = value;
      this.updateRequired = true;
    }
  }

  /** If true, associates itself with a Searchfield/Autocomplete and allows itself to be filtered.  */
  @Input() set searchable(value: boolean | undefined) {
    this.options.searchable = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.searchable = value;
      this.updateRequired = true;
    }
  }
  get searchable(): boolean | undefined {
    return this.options.searchable;
  }

  /** false, 'single', or 'multiple'. */
  @Input() set selectable(value: SohoListViewSelectable) {
    this.options.selectable = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.selectable = value;
      this.updateRequired = true;
    }
  }

  /** Select on focus change?true or false. */
  @Input() set selectOnFocus(value: boolean) {
    this.options.selectOnFocus = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.selectOnFocus = value;
      this.updateRequired = true;
    }
  }

  /** External function that can be used to provide an empty  message when no data is available. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** External function that can be used to provide a datasource, or a URL. */
  @Input() set source(value: SohoListViewSourceFunction | string) {
    this.options.source = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.source = value;
      this.updateRequired = true;
    }
  }

  /** Html Template String. */
  @Input() set template(value: string) {
    this.options.template = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.template = value;
      this.updateRequired = true;
    }
  }

  @Input() set disableItemDeactivation(value: boolean | undefined) {
    this.options.disableItemDeactivation = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.disableItemDeactivation = value;
      this.updateRequired = true;
    }
  }
  get disableItemDeactivation(): boolean | undefined {
    return this.options.disableItemDeactivation;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.attributes = attributes;
      this.updateRequired = true;
    }
  }
  get attributes(): Array<Object> | Object | undefined {
    return this.options.attributes;
  }

  /**
   * Set the list of selected items either by their indices or via the
   * jQuery selector for the li element.
   *
   * @param selectedItems the list of selected items.
   * @throws Error if any of the indicies are out of bounds.
   */
  @Input() set selectedItems(selectedItems: SohoListViewItemReference[]) {
    this.select(selectedItems);
  }

  /**
   * Selected List Items.
   *
   * Note currenty this returns the index of the selected item.
   *
   * @return the indexes of the selected list items.
   */
  get getSelectedItems(): SohoListViewItemReference[] | undefined {
    // Map the selected items as indexes
    // @todo could map to the SohoListViewItemComponent?
    return this.listview?.selectedItems.map((element) => element.index());
  }

  /**
   * Called after the listview is rendered, passes the dataset
   */
  @Output() rendered: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  /**
   * Called once an item is selected. Returns an object containing the event and the
   * current selected items.
   */
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is deselected. Returns an object containing the event and the
   * current selected items.
   */
  @Output() unselected: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is deselected. Returns an object containing the event and the
   * current selected items.
   */
  @Output() deselected: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is activated. Returns an object containing the event
   * and additional info about the activated item.
   */
  @Output() itemactivated: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is deactivated.  Returns an object containing the event
   * and additional info about the deactivated item.
   */
  @Output() itemdeactivated: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is clicked. You may also prefer need activated / deactived here.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() click: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called once an item is double clicked. This isnt used that often.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called during right click to enable context menus on list items.
   * Use popupmenu during this event.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() contextmenu: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called after the list has been sorted for any reason
   */
  @Output() sorted: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  // Used to locate the listViewReference in the HTML to init the component through jQuery
  @ViewChild('listview', { static: true }) listViewRef: ElementRef | undefined;
  @ContentChild(forwardRef(() => SohoSearchFieldComponent), { static: true }) // eslint-disable-line
  // eslint-disable-line
  // eslint-disable-line
  public searchfieldRef?: SohoSearchFieldComponent = undefined;

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private listview?: SohoListViewStatic | null;
  private options: SohoListViewOptions = {};

  /**
   * Constructor.
   */
  constructor(
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    if (!this.listViewRef) {
      throw Error('Unable to find listview reference...');
    }

    this.ngZone.runOutsideAngular(() => {
      // Found a searchfield in the template, set searchable to true
      if (this.searchfieldRef) {
        this.options.searchable = true;
      }

      this.jQueryElement = jQuery(this.listViewRef?.nativeElement);
      this.jQueryElement.listview(this.options);
      this.listview = this.jQueryElement.data('listview');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('rendered', (...args) => this.ngZone.run(() => this.rendered.emit(args)));
      this.jQueryElement.on('selected', (...args) => this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (...args) => this.ngZone.run(() => this.unselected.emit(args)));
      this.jQueryElement.on('deselected', (...args) => this.ngZone.run(() => this.deselected.emit(args)));
      this.jQueryElement.on('itemactivated', (...args) => this.ngZone.run(() => this.itemactivated.emit(args)));
      this.jQueryElement.on('itemdeactivated', (...args) => this.ngZone.run(() => this.itemdeactivated.emit(args)));
      this.jQueryElement.on('click', (...args) => this.ngZone.run(() => this.click.emit(args)));
      this.jQueryElement.on('dblclick', (...args) => this.ngZone.run(() => this.dblclick.emit(args)));
      this.jQueryElement.on('contextmenu', (...args) => this.ngZone.run(() => this.contextmenu?.emit(args)));
      this.jQueryElement.on('sorted', (...args) => this.ngZone.run(() => this.sorted.emit(args)));
    });

    this.items?.changes.subscribe(() => {
      this.updateRequired = true;
    });
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.listview?.updated());
      this.updateRequired = false;
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.listview) {
        this.listview.destroy();
        this.listview = null;
      }
    });
  }

  get listClass() {
    let classes = 'listview';
    if (this.class) {
      classes += ` ${this.class}`;
    }
    return classes;
  }

  /**
   * Clear all the currently selected listview items that are selected.
   */
  clearAllSelected() {
    if (this.listview) {
      this.ngZone.runOutsideAngular(() => this.listview?.clearAllSelected());
    }
  }

  /**
   * Toggle the selected listview items between all and none.
   */
  toggleAll() {
    if (this.listview) {
      this.ngZone.runOutsideAngular(() => this.listview?.toggleAll());
    }
  }

  /**
   * Removes the list item (or list items) identified by their index or jQuery element.
   *
   * @param index - the index (or list of indices) of the items to be removed.
   * @throws Error if the argument is null, or contains out of range indices then any error is thrown.
   */
  remove(index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    this.apply({ fn: (e) => this.ngZone.runOutsideAngular(() => this.listview?.remove(e)), index });
  }

  /**
   * Unselects the list item (or list items) identified by their index or jQuery element.
   *
   * @param index - the index (or list of indices) of the items to be unselected.
   * @throws Error if the argument is null, or contains out of range indices then any error is thrown.
   */
  unselect(index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    this.apply({ fn: (e) => this.ngZone.runOutsideAngular(() => this.listview?.deselect(e)), index });
  }
  /**
   * Selects the list item (or list items) identified by their index or jQuery element.
   *
   * If the argument is null, or contains out of range indices then any error is thrown.
   *
   * @param index the index (or list of indices) of the items to be deselected.
   * @throws Error if the argument is null, or contains out of range indices then any error is thrown.
   */
  select(index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    this.apply({ fn: (e: SohoListViewItemReference) => this.ngZone.runOutsideAngular(() => this.listview?.select(e)), index });
  }

  /**
   * Activate the given list item.
   */
  activateItem(item: SohoListViewItemReference): void {
    this.apply({ fn: (e) => this.ngZone.runOutsideAngular(() => this.listview?.activateItem(e)), index: item });
  }

  /**
   * Return an object containing info about the currently activated item.
   */
  activatedItem(): any {
    return this.ngZone.runOutsideAngular(() => this.listview?.activatedItem());
  }

  /**
   * De-activate the given list item. If no item is specified the currently
   * activated item will be deactivated.
   */
  deactivateItem(item?: SohoListViewItemReference): void {
    this.ngZone.runOutsideAngular(() => this.listview?.deactivateItem(item));
  }

  /**
   * Toggle Activation on the given list item.
   */
  toggleItemActivation(item: SohoListViewItemReference): void {
    this.apply({ fn: (e) => this.ngZone.runOutsideAngular(() => this.listview?.toggleItemActivation(e)), index: item });
  }

  /**
   * Apply the given function to the list view item(s).
   *
   * @param fn the function to apply - must take a SohoListViewReference.
   * @param index the index of list view item(s).
   */
  private apply({ fn, index }: { fn: (idx: SohoListViewItemReference) => void; index: SohoListViewItemReference | SohoListViewItemReference[]; }): void {
    ArgumentHelper.checkNotNull('index', index);

    if (this.listview) {
      this.boundsCheck(index);

      if (index instanceof Array) {
        index.forEach(element => fn(element));
      } else {
        fn(index);
      }
    } else {
      throw Error('Component not initialised.');
    }
  }

  /**
   * Verifies the given item reference is within allowable ranges.
   */
  private boundsCheck(index: SohoListViewItemReference | SohoListViewItemReference[]) {
    if (typeof index === 'number') {
      const indexNumber = index;
      if (indexNumber < 0 || indexNumber >= (this.itemCount as any)) {
        throw Error(`The item index '${index}' is out of bounds.`);
      }
    } else if (index instanceof Array) {
      index.forEach(element => this.boundsCheck(element));
    }
  }

  /**
   * The number of items in the list.
   */
  private get itemCount(): number | undefined {
    return this.items?.length;
  }
}
