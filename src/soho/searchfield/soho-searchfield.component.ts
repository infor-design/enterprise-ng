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
  selector: '[soho-searchfield-wrapper]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoSearchFieldWrapperComponent {
  @HostBinding('class.searchfield-wrapper') get isSearchfieldWrapper() { return true; }
}

@Component({
  selector: 'input[soho-searchfield]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
export class SohoSearchFieldComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  @Input() options: SohoSearchFieldOptions = {};

  @Input() set allResultsCallback(value: (searchTerm: string) => void) {
    this.options.allResultsCallback = value;
  }
  /** Displays a dropdown containing categories that can be used to filter results. */
  @Input() set categories(value: Object[]) {
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

  /** AutoComplete : Source Function/Data/Url/Array */
  @Input() set source(value: SohoAutoCompleteSource) {
    this.options.source = value;
  }

  /** Template that can be passed */
  @Input() set template(value: string) {
    this.options.template = value;
  }

  // ------------------------------------------------------------

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() { return true; }

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private searchfield: SohoSearchFieldStatic;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.searchfield(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));

    this.searchfield = this.jQueryElement.data('searchfield');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.searchfield) {
      this.searchfield.destroy();
      this.searchfield = null;
    }
  }
  clear(): void {
    this.searchfield.clear();
  }
  // get classes() {
  //   return 'searchfield';
  // }
  // get wrapperClasses() {
  //   return 'searchfield-wrapper';
  // }
}
