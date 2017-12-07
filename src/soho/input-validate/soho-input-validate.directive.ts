import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

/**
 * Angular Wrapper for the SoHo Input Validate Directive.
 *
 * This component searches for an element with the attribute
 * 'data-validate' or 'data-validate-on="submit"'.
 */
@Directive({
  selector: 'form[soho-input-validate], input[soho-input-validate], input[data-validate], input[data-validate-on="submit"], textarea[data-validate], select[data-validate]' // tslint:disable-line
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
    .on('error', (event: any, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.error.emit(event);
    })
    .on('valid', (event: any, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.valid.emit(event);
    });
  }
}
