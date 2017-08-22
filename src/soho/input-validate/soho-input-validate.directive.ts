import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

/**
 * Angular Wrapper for the SoHo Input Validate Directive.
 *
 * This component searches for an element with the attribute
 * 'data-validate' or 'data-validate-on="submit"'.
 */
@Directive({
  selector: 'input[soho-input-validate], input[data-validate], input[data-validate-on="submit"], textarea[data-validate]', // tslint:disable-line
})
export class SohoInputValidateDirective implements AfterViewInit {

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  private validator: SohoInputValidateStatic;

  @Output() valid = new EventEmitter<SohoInputValidateEvent>();
  @Output() error = new EventEmitter<SohoInputValidateEvent>();

  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.el.nativeElement);

    this.jQueryElement.validate();

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
    .on('error', (event: SohoInputValidateEvent, validation) => { event.validation = validation; this.error.emit(event); })
    .on('valid', (event: SohoInputValidateEvent, validation) => { event.validation = validation; this.valid.emit(event); });
  }
}
