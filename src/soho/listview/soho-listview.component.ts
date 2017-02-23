import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';

import { SohoSearchFieldComponent } from '../searchfield';

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
  @Input() buildSearch: boolean = true;
  @HostBinding('class.listview-search') get isListviewSearch() { return true; }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[soho-listview-item]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewItemComponent {
  @HostBinding('class.is-disabled')
  @Input() disabled: boolean;
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

  /**
   * String of classes to append to the class for the list-view div element
   */
  @Input() class: string;

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
   * Called after the list has been sorted for any reason
   */
  @Output() sorted: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  // Used to locate the listViewReference in the HTML to init the component through jQuery
  @ViewChild('listview') listViewRef: ElementRef;
  @ContentChild(forwardRef(() => SohoSearchFieldComponent))
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
    this.listview.destroy();
  }
  get listClass() {
    let classes = 'listview';
    if (this.class) {
      classes += ` ${this.class}`;
    }
    return classes;
  }

  clearAllSelected() {
    this.listview.clearAllSelected();
  }
}
