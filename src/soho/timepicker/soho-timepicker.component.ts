import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';


@Component({
  selector: 'input[soho-timepicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  providers: [provideControlValueAccessor(SohoTimePickerComponent)]
})
export class SohoTimePickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

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
      this.timepicker.updated();
    }
  }
  /**
   * Indicates the pattern for the time format.
   */
  @Input() set timeFormat(timeFormat: string) {
    this.options.timeFormat = timeFormat;
    if (this.timepicker) {
      this.timepicker.updated();
    }
  }
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown;
   * default value is 5.
   */
  @Input() set minuteInterval(minuteInterval: number) {
    this.options.minuteInterval = minuteInterval;
    if (this.timepicker) {
      this.timepicker.updated();
    }
  }
  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event;
   * default value is false;
   */
  @Input() set roundToInterval(roundToInterval: boolean) {
    this.options.roundToInterval = roundToInterval;
    if (this.timepicker) {
      this.timepicker.updated();
    }
  }

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

    if (this.timepicker) {
      if (value) {
        this.timepicker.disable();
        this.isDisabled = true;
      } else {
        this.timepicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }
  /**
   * Sets the control to readonly
   */
  // TODO: waiting on SOHO-4875 - 4.0 Timepicker - Needs to support readonly() method
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    if (this.timepicker) {
      if (value) {
        this.timepicker.readonly();
        this.isReadOnly = true;
      } else {
        this.timepicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
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
    // There is not API to set the value on thetime picker, so this
    // emulates what the control does internally.
    this.timepicker.element.val(time).trigger('change');
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.timepicker') get isTimepicker() {
    return true;
  }

  constructor(private element: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.timepicker(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (args: SohoTimePickerEvent) => this.onChange(args));

    this.timepicker = this.jQueryElement.data('timepicker');

    if (this.internalValue) {
      this.timepicker.element.val(this.internalValue);
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoTimePickerEvent) {
    this.internalValue = this.timepicker.element.val();

    // Set the date on the event.
    event.data = this.internalValue;

    // Fire the event
    this.change.emit(event);
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

  ngOnDestroy() {
    if (this.timepicker) {
      this.timepicker.destroy();
      this.timepicker = null;
    }
  }
}
