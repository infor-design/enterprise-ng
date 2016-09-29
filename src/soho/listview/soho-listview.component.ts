import {
  AfterViewInit,
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
  selector: '[soho-listview-item]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewItemComponent {
  @HostBinding('class.is-disabled')
  @Input() disabled: boolean;
}

@Component({
  selector: '[soho-listview-header]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewHeaderComponent {
  @HostBinding('class.listview-heading') get isHeading() { return true; }
}

@Component({
  selector: '[soho-listview-subheader]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewSubHeaderComponent {
  @HostBinding('class.listview-subheading') get isSubHeading() { return true; }
}

@Component({
  selector: '[soho-listview-micro]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewMicroComponent {
  @HostBinding('class.listview-micro') get isMicro() { return true; }
}

@Component({
  selector: 'soho-listview',
  templateUrl: 'soho-listview.component.html',
  styles: [`
    .smaller {
      width: 50%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListViewComponent implements AfterViewInit, OnDestroy {
  /**
   * String of classes to append to the class for the list-view div element
   */
  @Input() class: string;
  /**
   * Array of data
   */
  @Input() set dataset(value: Object[]) {
    if (this.jQueryElement && this.listview) {
      this.listview.updated();
    }
    this._dataset = value;
  }
  /**
   * Audible Label (or use parent title)
   */
  @Input() description: string;
  /**
   * If paging is activated, sets the number of listview items available per page
   */
  @Input() pagesize: number;
  /**
   * If true, activates paging
   */
  @Input() paging: boolean;
  /**
   * If true, associates itself with a Searchfield/Autocomplete and allows itself to be filtered
   */
  @Input() searchable: boolean;
  /**
   * false, 'single', or 'multiple'
   */
  @Input() selectable: boolean | 'single' | 'multiple';
  /**
   * true or false
   */
  @Input() selectOnFocus: boolean;
  /**
   * External function that can be used to provide a datasource
   */
  @Input() source: Function;
  /**
   * Html Template String
   */
  @Input() template: string;

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
  private searchfieldRef: SohoSearchFieldComponent = null;

  /**
   * Local variables
   */
  private jQueryElement: any;
  private listview: any;
  private _dataset: Object[];

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    if (!this.listViewRef) {
      console.error('Unable to find listview reference...');
    }
    // Found a searchfield in the template, set searchable to true
    if (this.searchfieldRef) {
      this.searchable = true;
    }
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.listViewRef.nativeElement);

    this.jQueryElement.listview({
      /**
       * Pass in the Input values as settings to the initializer
       */
      dataset: this._dataset,
      template: this.template,
      description: this.description,
      paging: this.paging,
      pagesize: this.pagesize,
      searchable: this.searchable,
      selectable: this.selectable,
      selectOnFocus: this.selectOnFocus,
      source: this.source,
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('sorted', (...args) => this.sorted.emit(args));

    this.listview = this.jQueryElement.data('listview');
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
}
