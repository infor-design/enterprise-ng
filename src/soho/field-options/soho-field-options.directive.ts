import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Directive({
  selector: '[soho-field-options]' // tslint:disable-line
})
export class SohoFieldOptionsDirective implements AfterViewInit, OnDestroy {

  private _options: SohoFieldOptionsSettings;

  @HostBinding('class.field-options')
  allFieldOptions = true;

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private fieldOptions: SohoFieldOptionsStatic;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) {
    this._options = {};
  }

  ngAfterViewInit() {
    // -----------------------------------------------------------------------
    // Must run outside angular so that timeouts in the soho code won't cause
    // a ViewCheck in angular. Not running outside angular results in
    // unnecessary cycles causing the app to lock up (when lots of field-option
    // objects are used) until all the timeouts have resolved.
    // -----------------------------------------------------------------------
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.fieldoptions(this._options);
      this.fieldOptions = this.jQueryElement.data('field-options');
    });
  }

  /** Destructor. */
  ngOnDestroy() {
    if (this.fieldOptions) {
      this.ngZone.runOutsideAngular(() => {
        this.fieldOptions.destroy();
        this.fieldOptions = null;
      });
    }
  }
}
