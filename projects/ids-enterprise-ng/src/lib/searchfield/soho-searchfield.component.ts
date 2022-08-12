import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-searchfield-wrapper]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoSearchFieldWrapperComponent {
  @HostBinding('class.searchfield-wrapper') get isSearchfieldWrapper() {
    return true;
  }
}

@Component({
  selector: 'input[soho-searchfield]', // eslint-disable-line
  template: '<ng-content></ng-content>'
})
export class SohoSearchFieldComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  @Input() options: SohoSearchFieldOptions = {};

  @Input() set allResultsCallback(value: (searchTerm: string) => void) {
    this.options.allResultsCallback = value;
  }
  /** Displays a dropdown containing categories that can be used to filter results. */
  @Input() set categories(value: SohoSearchFieldCategoryType[]) {
    this.options.categories = value;
  }

  /** If true, creates a multiselectable Categories list. */
  @Input() set categoryMultiselect(value: boolean) {
    this.options.categoryMultiselect = value;
  }

  /** Has an X to clear. */
  @Input() set clearable(value: boolean) {
    this.options.clearable = value;
  }

  @Input() set showAllResults(value: boolean) {
    this.options.showAllResults = value;
  }

  /** Show any available categories that are selected to teh left of the Dropdown field. */
  @Input() set showCategoryText(value: boolean) {
    this.options.showCategoryText = value;
  }

  /** Extra button available to show. */
  @Input() set button(value: SohoSearchFieldExtraButton) {
    this.options.button = value;
  }

  /** AutoComplete : Source Function/Data/Url/Array */
  @Input() set source(value: SohoAutoCompleteSource) {
    this.options.source = value;
  }

  /** Template that can be passed */
  @Input() set template(value: string) {
    this.options.template = value;
  }

  /** Number representing a size that will be used when a collapsible Searchfield becomes collapsed. */
  @Input() set collapseSize(value: ((api: SohoSearchFieldStatic) => number) | number) {
    this.options.collapseSize = value;
  }

  /** Set the input to tabbable */
  @Input() set tabbable(value: boolean) {
    this.options.tabbable = value;
  }

  // ------------------------------------------------------------

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() cleared: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() {
    return true;
  }

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private searchfield?: SohoSearchFieldStatic | null;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.searchfield(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('cleared', (...args) => this.ngZone.run(() => this.cleared.emit(args)));

    this.searchfield = this.jQueryElement.data('searchfield');
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // clean up attached events.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.searchfield) {
        this.searchfield.destroy();
        this.searchfield = null;
      }
    });
  }

  clear(): void {
    this.ngZone.runOutsideAngular(() => this.searchfield?.clear());
  }

  /**  Gets a complete list of categories in jQuery-collection form. */
  getCategories(): any {
    return this.ngZone.runOutsideAngular(() => {
      return this.searchfield?.getCategories();
    });
  }

  /** Gets the categories as data. Passing true will return only the selected category data.*/
  getCategoryData(onlySelected: boolean): SohoSearchFieldCategory[] | undefined {
    return this.ngZone.runOutsideAngular(() => {
      return this.searchfield?.getCategoryData(onlySelected);
    });
  }

  /**  Gets a complete list of categories in jQuery-collection form. */
  getSelectedCategories(): any {
    return this.ngZone.runOutsideAngular(() => {
      return this.searchfield?.getSelectedCategories();
    });
  }

  /** Gets the currently selected list of categories in jQuery-collection form. */
  setCategoryButtonText(textContent?: string): void {
    this.ngZone.runOutsideAngular(() => this.searchfield?.setCategoryButtonText());
  }

  updated(settings?: SohoSearchFieldOptions) {
    this.ngZone.runOutsideAngular(() => this.searchfield?.updated(settings));
  }
}
