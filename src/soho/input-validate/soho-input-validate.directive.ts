import { AfterViewInit, Attribute, Directive, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

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

  @HostBinding('attr.data-validate') @Input('data-validate') dataValidate: string;   // tslint:disable-line

  @Output() error = new EventEmitter<SohoInputValidateEvent>();
  @Output() alert = new EventEmitter<SohoInputValidateEvent>();
  @Output() confirm = new EventEmitter<SohoInputValidateEvent>();
  @Output() info = new EventEmitter<SohoInputValidateEvent>();
  @Output() valid = new EventEmitter<SohoInputValidateEvent>();

  constructor(private el: ElementRef, @Attribute('data-validate') dataValidateAttr) {   // tslint:disable-line
    this.dataValidate = dataValidateAttr;
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {  // tslint:disable-line
    this.jQueryElement = jQuery(this.el.nativeElement);

    this.jQueryElement.validate();

    this.validator = this.jQueryElement.data("validate");

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
    .on('error', (event: SohoInputValidateEvent, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.error.emit(event);
    })
    .on('alert', (event: SohoInputValidateEvent, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.alert.emit(event);
    })
    .on('confirm', (event: SohoInputValidateEvent, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.confirm.emit(event);
    })
    .on('info', (event: SohoInputValidateEvent, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.info.emit(event);
    })
    .on('valid', (event: SohoInputValidateEvent, validation) => {
      event.validation = {
        field:   validation.field[0],
        message: validation.message
      };
      this.valid.emit(event);
    });
  }

  /** 
   * Remove the message from the field if there is one and mark the field valid
   */
  public removeMessage(type) {
    this.validator.removeMessage(this.jQueryElement, type);
  }

  /**
   * Trigger validation of the field
   */
  public validate(event) {
    this.validator.validate(this.jQueryElement, false, event);
  }  
}
