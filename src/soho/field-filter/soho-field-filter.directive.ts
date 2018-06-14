import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
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
export class SohoFieldFilterDirective implements AfterViewChecked, AfterViewInit, OnDestroy {

  @Input() set fieldSettings(settings: SohoFieldFilterSettings) {
    if (settings) {
      this._settings = settings;
      this.markForRefresh();
    }
  }

  @Input() set fieldDropdownDataSet(dataset: Array<SohoFieldFilterOption>) {
    if (dataset) {
      this._settings.dataset = dataset;
      this.markForRefresh();
    }
  }

  @Input() set dropdownOpts(options: SohoDropDownOptions) {
    if (options) {
      this._settings.dropdownOpts = options;
      this.markForRefresh();
    }
  }

  @Input() set template(template: string) {
    if (template) {
      this._settings.template = template;
      this.markForRefresh();
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
  private runUpdatedOnCheck: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone,
  ) {  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.fieldFilter) {
          this.fieldFilter.updated(this._settings);
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

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
        this.jQueryElement.off();
        this.fieldFilter.destroy();
        this.fieldFilter = null;
      });
    }
  }

  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatically the component may not be eligible for
    // updating.
    this.ref.markForCheck();
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
