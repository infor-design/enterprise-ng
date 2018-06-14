import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[soho-field-filter]' // tslint:disable-line
})
export class SohoFieldFilterDirective implements AfterViewInit, OnDestroy {

  @Input() set fieldSettings(settings: SohoFieldFilterSettings) {
    if (settings) {
      this._settings = settings;
    }
  }

  @Input() set fieldDropdownDataSet(dataset: Array<SohoFieldFilterOption>) {
    if (dataset) {
      this._settings.dataset = dataset;
    }
  }

  @Input() set dropdownOpts(options: SohoDropDownOptions) {
    if (options) {
      this._settings.dropdownOpts = options;
    }
  }

  @Input() set template(template: string) {
    if (template) {
      this._settings.template = template;
    }
  }

  @Output() filtered: EventEmitter<SohoFieldFilteredEvent> = new EventEmitter<SohoFieldFilteredEvent>();

  // default to only equals
  private _settings: SohoFieldFilterSettings = {
    dataset: [
      { value: 'equals', text: 'Equals', icon: 'filter-equals' }
    ]
  };

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private fieldFilter: SohoFieldFilterStatic;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) {  }

  ngAfterViewInit() {
    // -----------------------------------------------------------------------
    // Must run outside angular so that timeouts in the soho code won't cause
    // a ViewCheck in angular. Not running outside angular results in
    // unnecessary cycles causing the app to lock up (when lots of field-filter
    // objects are used) until all the timeouts have resolved.
    // -----------------------------------------------------------------------
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.fieldfilter(this._settings);
      this.fieldFilter = this.jQueryElement.data('field-filter');

      this.jQueryElement.on('filtered', (event: SohoFieldFilteredEvent, args: any) => this.onFiltered(event, args));
    });
  }

  /** Destructor. */
  ngOnDestroy() {
    if (this.fieldFilter) {
      this.ngZone.runOutsideAngular(() => {
        this.fieldFilter.destroy();
        this.fieldFilter = null;
      });
    }
  }

  private onFiltered(event: SohoFieldFilteredEvent, args) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.filterOption = args.data;
      this.filtered.emit(event);
    }, 1));
  }
}
