import { AfterViewInit, Attribute, Directive, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output } from '@angular/core';

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

  /**
   * A initial setting only of the events you'd like to have hooked up in the angular wrapper.
   * This aids in reducing change detection as each bound event that gets called (whether you
   * are interested in it or not) causes change detection to get called which causes the screen
   * to re-render each time.
   *
   * This is backward compatible if you don't use the registerForEvents input. If you want no
   * events hooked up then use registerForEvent="". Otherwise just specify the events you want
   * hooked up to sohoxi from this angular component.
   *
   * @type {string} a space delimited list of the events to be hooked up to sohoxi.
   *       example: "activated afterActivated tabAdded"
   */
  @Input() registerForEvents = undefined;

  @Output() error = new EventEmitter<SohoInputValidateEvent>();
  @Output() alert = new EventEmitter<SohoInputValidateEvent>();
  @Output() confirm = new EventEmitter<SohoInputValidateEvent>();
  @Output() icon = new EventEmitter<SohoInputValidateEvent>();
  @Output() info = new EventEmitter<SohoInputValidateEvent>();
  @Output() valid = new EventEmitter<SohoInputValidateEvent>();

  constructor(
    private el: ElementRef,
    @Attribute('data-validate') dataValidateAttr, // tslint:disable-line
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

      // Add listeners to emit events
      this.hookupRegisteredEvents();

      this.validator = this.jQueryElement.data('validate');
    });
  }

  /**
   * Remove the message from the field if there is one and mark the field valid
   */
  public removeMessage(type) {
    this.ngZone.runOutsideAngular(() => {
      this.validator.removeMessage(this.jQueryElement, type);
    });
  }

  /**
   * Trigger validation of the field
   */
  public validate(event) {
    this.ngZone.runOutsideAngular(() => {
      this.validator.validate(this.jQueryElement, false, event);
    });
  }

  /**
   * Bind to jQueryElement's events
   */
  private hookupRegisteredEvents() {
    NgZone.assertNotInAngularZone();

    let eventsToRegister = null;
    if (this.registerForEvents !== undefined) {
      eventsToRegister = this.registerForEvents.split(' ');
    }

    // if no events are registered then all events will be bound for backward comparability
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'error')) {
      this.jQueryElement.on('error', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.error.emit(event);
        }, 1));
      });
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'alert')) {
      this.jQueryElement.on('alert', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.alert.emit(event);
        }, 1));
      });
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'confirm')) {
      this.jQueryElement.on('confirm', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.confirm.emit(event);
        }, 1));
      });
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'icon')) {
      this.jQueryElement.on('icon', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.icon.emit(event);
        }, 1));
      });
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'info')) {
      this.jQueryElement.on('info', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.info.emit(event);
        }, 1));
      });
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'valid')) {
      this.jQueryElement.on('valid', (event: SohoInputValidateEvent, validation) => {
        this.ngZone.run(() => setTimeout(() => {
          event.validation = { field: validation.field[ 0 ], message: validation.message };
          this.valid.emit(event);
        }, 1));
      });
    }
  }
}
