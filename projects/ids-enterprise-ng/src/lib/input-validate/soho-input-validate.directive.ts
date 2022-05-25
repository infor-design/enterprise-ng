import {
  AfterViewInit, Attribute, Directive, ElementRef,
  EventEmitter, HostBinding, Input, NgZone, Output, OnDestroy
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Input Validate Directive.
 *
 * This component searches for an element with the attribute
 * 'data-validate' or 'data-validate-on="submit"'.
 */
@Directive({
  selector: 'form[soho-input-validate], input[soho-input-validate], input[data-validate], input[data-validate-on="submit"], textarea[data-validate], select[data-validate]' // eslint-disable-line
})
export class SohoInputValidateDirective implements AfterViewInit, OnDestroy {

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;

  private validator?: SohoInputValidateStatic;

  @HostBinding('attr.data-validate') @Input('data-validate') dataValidate: string;   // eslint-disable-line

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() error = new EventEmitter<SohoInputValidateEvent>();
  @Output() alert = new EventEmitter<SohoInputValidateEvent>();

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() success = new EventEmitter<SohoInputValidateEvent>();
  @Output() icon = new EventEmitter<SohoInputValidateEvent>();
  @Output() info = new EventEmitter<SohoInputValidateEvent>();
  @Output() valid = new EventEmitter<SohoInputValidateEvent>();

  constructor(
    private el: ElementRef,
    @Attribute('data-validate') dataValidateAttr: any, // eslint-disable-line
    private ngZone: NgZone,
  ) {
    this.dataValidate = dataValidateAttr;
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.el.nativeElement);

      this.jQueryElement.validate();

      // Initialise any event handlers.
      this.jQueryElement.on('error', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.error.emit(event);
      }));

      this.jQueryElement.on('alert', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.alert.emit(event);
      }));

      this.jQueryElement.on('success', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.success.emit(event);
      }));

      this.jQueryElement.on('icon', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.icon.emit(event);
      }));

      this.jQueryElement.on('info', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.info.emit(event);
      }));

      this.jQueryElement.on('valid', (event: SohoInputValidateEvent, validation) => this.ngZone.run(() => {
        event.validation = { field: validation.field[0], message: validation.message };
        this.valid.emit(event);
      }));

      this.validator = this.jQueryElement.data('validate');
    });
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // clean up attached events.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      this.validator!.destroy();
      this.validator = undefined;
      this.el.nativeElement = undefined;
    });
  }

  /**
   * Remove the message from the field if there is one and mark the field valid
   */
  public removeMessage(type: any) {
    this.ngZone.runOutsideAngular(() => {
      this.validator?.removeMessage(this.jQueryElement, type);
    });
  }

  /**
   * Trigger validation of the field
   */
  public validate(event: any) {
    this.ngZone.runOutsideAngular(() => {
      this.validator?.validate(this.jQueryElement, false, event);
    });
  }
}
