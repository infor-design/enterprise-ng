import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'input[soho-searchfield]',
  template: '<ng-content></ng-content>'
})
export class SohoSearchfieldComponent implements AfterViewInit, OnDestroy {
  @Input() allResultsCallback: Function;
  /**
   * If defined as an array, displays a dropdown containing categories that can be used to filter results
   */
  @Input() categories: Object[];
  /**
   * If true, creates a multiselectable Categories list
   */
  @Input() categoryMultiselect: boolean;
  /**
   * Has an X to clear
   */
  @Input() clearable: boolean;
  @Input() showAllResults: boolean;
  /**
   * If true, will show any available categories that are selected to teh left of the Dropdown field.
   */
  @Input() showCategoryText: boolean;
  @Input() source: Function;
  /**
   * Template that can be passed
   */
  @Input() template: string;

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() { return true; }

  /**
   * Local variables
   */
  private jQueryElement: any;
  private searchfield: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.searchfield({
      allResultsCallback: this.allResultsCallback,
      categories: this.categories,
      categoryMultiselect: this.categoryMultiselect,
      clearable: this.clearable,
      showAllResults: this.showAllResults,
      showCategoryText: this.showCategoryText,
      source: this.source,
      template: this.template,
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));

    this.searchfield = this.jQueryElement.data('searchfield');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.searchfield.destroy();
  }
  // get classes() {
  //   return 'searchfield';
  // }
  // get wrapperClasses() {
  //   return 'searchfield-wrapper';
  // }
}
