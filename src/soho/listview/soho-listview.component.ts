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
  QueryList
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';

import { SohoSearchFieldComponent } from '../searchfield/soho-searchfield.component';

/**
 * This component will allow the developer to modify any DOM element
 * by exposing it (if desired)
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-search]',
  template: `
    <input soho-searchfield *ngIf="buildSearch">
    <ng-content select="span[soho-searchfield-wrapper]"></ng-content>
    <ng-content select="input[soho-searchfield]"></ng-content>
    <ng-content></ng-content>
  `,
})
export class SohoListViewSearchComponent {
  /**
   * Use this flag if you are projecting a soho-searchfield into this component
   * from another component and do not want this component to build another
   * searchfield
   */
  @Input() buildSearch = true;

  @HostBinding('class.listview-search') get isListviewSearch() { return true; }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-item]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewItemComponent implements AfterViewInit {
  /** Underling jQuery item. */
  private listItem: JQuery;

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
  constructor(public element: ElementRef) {
  }

  /**
   * The index of the list view item in it's parent.
   */
  public get index() {
    return this.selector.index();
  }

  public get selector() {
    return this.listItem;
  }

  ngAfterViewInit(): void {
    this.listItem = jQuery(this.element.nativeElement);
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-header]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewHeaderComponent {
  @HostBinding('class.listview-heading') get isHeading() { return true; }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-subheader]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewSubHeaderComponent {
  @HostBinding('class.listview-subheading') get isSubHeading() { return true; }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-micro]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewMicroComponent {
  @HostBinding('class.listview-micro') get isMicro() { return true; }
}

@Component({
  selector: 'soho-listview',
  templateUrl: './soho-listview.component.html',
  styles: [`
    .smaller {
      width: 50%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewComponent implements AfterViewInit, OnDestroy, AfterViewChecked {
  @ContentChildren(SohoListViewItemComponent) items: QueryList<SohoListViewItemComponent>;

  /**
   * String of classes to append to the class for the list-view div element
   */
  @Input() class: string;

  @Input() sohoListviewElementId: string;

  /**
   * Force a update to fire next viewChecked.
   */
  public updateRequired: boolean;

  /**
   * Array of data
   */
  @Input() set dataset(value: Object[]) {
    this.options.dataset = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.dataset = value;
      this.updateRequired = true;
    }
  }
  get dateset(): Object[] {
    return this.options.dataset;
  }

  /** Audible Label (or use parent title). */
  @Input() set description(value: string) {
    this.options.description = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.description = value;
      this.listview.updated();
    }
  }

  /** If paging is activated, sets the number of listview items available per page. */
  @Input() set pagesize(value: number) {
    this.options.pagesize = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.pagesize = value;
      this.listview.updated();
    }
  }

  /** If true, activates paging. */
  @Input() set paging(value: boolean) {
    this.options.paging = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.paging = value;
      this.listview.updated();
    }
  }

  /** If true, associates itself with a Searchfield/Autocomplete and allows itself to be filtered.  */
  @Input() set searchable(value: boolean) {
    this.options.searchable = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.searchable = value;
      this.listview.updated();
    }
  }
  get searchable() {
    return this.options.searchable;
  }

  /** false, 'single', or 'multiple'. */
  @Input() set selectable(value: SohoListViewSelectable) {
    this.options.selectable = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.selectable = value;
      this.listview.updated();
    }
  }

  /** Select on focus change?true or false. */
  @Input() set selectOnFocus(value: boolean) {
    this.options.selectOnFocus = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.selectOnFocus = value;
      this.listview.updated();
    }
  }

  /** External function that can be used to provide an empty  message when no data is available. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.emptyMessage = value;
      this.listview.updated();
    }
  }

  /** External function that can be used to provide a datasource, or a URL. */
  @Input() set source(value: SohoListViewSourceFunction | string) {
    this.options.source = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.source = value;
      this.listview.updated();
    }
  }

  /** Html Template String. */
  @Input() set template(value: string) {
    this.options.source = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.source = value;
      this.listview.updated();
    }
  }

  @Input() set disableItemDeactivation(value: boolean) {
    this.options.disableItemDeactivation = value;
    if (this.jQueryElement && this.listview) {
      this.listview.settings.disableItemDeactivation = value;
      this.listview.updated();
    }
  }
  get disableItemDeactivation() {
    return this.options.disableItemDeactivation;
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
  get getSelectedItems(): SohoListViewItemReference[] {
    // Map the selected items as indexes
    // @todo could map to the SohoListViewItemComponent?
    return this.listview.selectedItems.map((element) => element.index());
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
  @Output() click: EventEmitter<Object> = new EventEmitter<Object>();

   /**
   * Called once an item is double clicked. This isnt used that often.
   */
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called during right click to enable context menus on list items.
   * Use popupmenu during this event.
   */
  @Output() contextmenu: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Called after the list has been sorted for any reason
   */
  @Output() sorted: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  // Used to locate the listViewReference in the HTML to init the component through jQuery
  @ViewChild('listview') listViewRef: ElementRef;
  @ContentChild(forwardRef(() => SohoSearchFieldComponent)) // tslint:disable-line
  public searchfieldRef: SohoSearchFieldComponent = null;

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  private listview: SohoListViewStatic;

  private options: SohoListViewOptions = {};

  /**
   * Constructor.
   */
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    if (!this.listViewRef) {
      throw Error('Unable to find listview reference...');
    }
    // Found a searchfield in the template, set searchable to true
    if (this.searchfieldRef) {
      this.options.searchable = true;
    }

    this.jQueryElement = jQuery(this.listViewRef.nativeElement);

    this.jQueryElement.listview(this.options);

    this.listview = this.jQueryElement.data('listview');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('unselected', (...args) => this.unselected.emit(args));
    this.jQueryElement.on('deselected', (...args) => this.deselected.emit(args));
    this.jQueryElement.on('itemactivated', (...args) => this.itemactivated.emit(args));
    this.jQueryElement.on('itemdeactivated', (...args) => this.itemdeactivated.emit(args));
    this.jQueryElement.on('click', (...args) => this.click.emit(args));
    this.jQueryElement.on('dblclick', (...args) => this.dblclick.emit(args));
    this.jQueryElement.on('contextmenu', (...args) => this.contextmenu.emit(args));
    this.jQueryElement.on('sorted', (...args) => this.sorted.emit(args));
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.listview.updated();
      this.updateRequired = false;
    }
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.listview) {
      this.listview.destroy();
      this.listview = null;
    }
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
    this.listview.clearAllSelected();
  }

  /**
   * Toggle the selected listview items between all and none.
   */
  toggleAll () {
    this.listview.toggleAll();
  }

  /**
   * Removes the list item (or list items) identified by their index or jQuery element.
   *
   * @param index - the index (or list of indices) of the items to be removed.
   * @throws Error if the argument is null, or contains out of range indices then any error is thrown.
   */
  remove(index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    this.apply((e) => this.listview.remove(e), index);
  }

  /**
   * Unselects the list item (or list items) identified by their index or jQuery element.
   *
   * @param index - the index (or list of indices) of the items to be unselected.
   * @throws Error if the argument is null, or contains out of range indices then any error is thrown.
   */
  unselect(index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    this.apply((e) => this.listview.unselect(e), index);
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
    this.apply((e) => this.listview.select(e), index);
  }

  /**
   * Activate the given list item.
   */
  activateItem(item: SohoListViewItemReference): void {
    this.apply((e) => this.listview.activateItem(e), item);
  }

  /**
   * Return an object containing info about the currently activated item.
   */
  activatedItem(): any {
    return this.listview.activatedItem();
  }

  /**
   * De-activate the given list item. If no item is specified the currently
   * activated item will be deactivated.
   */
  deactivateItem(item?: SohoListViewItemReference): void {
    this.listview.deactivateItem(item);
  }

  /**
   * Toggle Activation on the given list item.
   */
  toggleItemActivation(item: SohoListViewItemReference): void {
    this.apply((e) => this.listview.toggleItemActivation(e), item);
  }

  /**
   * Apply the given function to the list view item(s).
   *
   * @param fn the function to apply - must take a SohoListViewReference.
   * @param index the index of list view item(s).
   */
   private apply(fn: (index: SohoListViewItemReference) => void, index: SohoListViewItemReference | SohoListViewItemReference[]): void {
    ArgumentHelper.checkNotNull('index', index);

    if (this.listview) {
      this.boundsCheck(index);

      if (index instanceof Array) {
        index.forEach(element => fn(element) );
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
        if (indexNumber < 0 || indexNumber >= this.itemCount) {
          throw Error(`The item index '${index}' is out of bounds.`);
        }
      } else if (index instanceof Array) {
        index.forEach(element => this.boundsCheck(element) );
      }
  }

  /**
   * The number of items in the list.
   */
  private get itemCount(): number {
    return this.items.length;
  }
}
