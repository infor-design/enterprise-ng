import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-timepicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoTimePickerComponent)]
})
export class SohoTimePickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, AfterViewChecked, OnDestroy {
  private runUpdatedOnCheck: boolean;
  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private timepicker: SohoTimePickerStatic;
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private options: SohoTimePickerOptions = {
    mode: undefined,
    timeFormat: undefined,
    minuteInterval: undefined,
    roundToInterval: false
  };

  /**
   * Indicates mode, either 'standard' or 'range'; default value is 'standard'
   */
  @Input() set mode(mode: SohoTimePickerMode) {
    this.options.mode = mode;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates the pattern for the time format.
   */
  @Input() set timeFormat(timeFormat: string) {
    this.options.timeFormat = timeFormat;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown;
   * default value is 5.
   */
  @Input() set minuteInterval(minuteInterval: number) {
    this.options.minuteInterval = minuteInterval;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event;
   * default value is false;
   */
  @Input() set roundToInterval(roundToInterval: boolean) {
    this.options.roundToInterval = roundToInterval;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.timepicker == null) {
      this.isDisabled = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isDisabled = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => {
        this.timepicker.disable();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.timepicker.enable();
        this.isReadOnly = false;
      });
    }
  }

  /**
   * Sets the control to readonly
   *
  * @param readonly
   */
  @Input() set readonly(value: boolean) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.timepicker == null) {
      this.isReadOnly = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isReadOnly = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => this.timepicker.readonly());
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.timepicker.enable();
        this.isDisabled = false;
      });
    }
  }

  /**
   * Called when the datepicker value changes
   */
  @Output() change: EventEmitter<SohoTimePickerEvent> = new EventEmitter<SohoTimePickerEvent>();

  /**
   * Public API
   */
  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  public setValue(time: string) {
    // There is no API to set the value on the timepicker, so this
    // emulates what the control does internally.
    this.timepicker.element.val(time).trigger('change');
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.timepicker') get isTimepicker() {
    return true;
  }

  /**
   * Creates an instance of SohoTimePickerComponent.
   *
   * @param {ElementRef} element the element this component encapsulates.
   * @param {NgZone} ngZone the angular zone for this component.
   * @param {ChangeDetectorRef} ref reference to the change detector
   * @memberof SohoTimePickerComponent
   */
  constructor(private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the timepicker control
      this.jQueryElement.timepicker(this.options);

      // extract the api
      this.timepicker = this.jQueryElement.data('timepicker');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement
        .on('change', (args: SohoTimePickerEvent) => this.onChange(args));

      if (this.internalValue) {
        this.timepicker.element.val(this.internalValue);
      }

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      // Ensure the enabled/disabled flags are set.
      if (this.isDisabled !== null) {
        this.disabled = this.isDisabled;
      }
      if (this.isReadOnly !== null) {
        this.readonly = this.isReadOnly;
      }

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.timepicker) {
          this.timepicker.updated();
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
      }

      if (this.timepicker) {
        // Destroy any widget resources.
        this.timepicker.destroy();
        this.timepicker = null;
      }
    });
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoTimePickerEvent) {
    this.internalValue = this.timepicker.element.val();

    // Set the date on the event.
    event.data = this.internalValue;

    // When the request for data has completed, make sure we
    // update the 'dropdown' control.
    this.ngZone.run(() => {
      // Fire the event
      this.change.emit(event);
    });
  }

  /**
   * Override writeValue to allow the time picker
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.timepicker) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.timepicker.element.val(value);
    }
  }

  /**
 * This function is called when the control status changes to or from "DISABLED".
 * Depending on the value, it will enable or disable the appropriate DOM element.
 *
 * @param isDisabled
 */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
 * Marks the components as requiring a rebuild after the next update.
 */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }
}
