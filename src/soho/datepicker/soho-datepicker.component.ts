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
} from '@angular/core';
import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-datepicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoDatePickerComponent)]
})
export class SohoDatePickerComponent extends BaseControlValueAccessor<Date> implements AfterViewChecked, AfterViewInit, OnDestroy {

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  private datepicker: SohoDatePickerStatic;

  private isDisabled: boolean = null;

  private isReadOnly: boolean = null;

  private options: SohoDatePickerOptions = {};

  /**
   * Indicates to display the timepicker; defaults to false.
   */
  @Input() set showTime(showTime: boolean) {
    this.options.showTime = showTime;
  }
  /**
   * Indicates the pattern for the time format.
   */
  @Input() set timeFormat(timeFormat: string) {
    this.options.timeFormat = timeFormat;
  }
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown.
   */
  @Input() set minuteInterval(minuteInterval: number) {
    this.options.minuteInterval = minuteInterval;
  }

  /**
   * Indicates mode, either 'standard' or 'range'.
   */
  @Input() set mode(mode: SohoDatePickerMode) {
    this.options.mode = mode;

    if (mode === 'range') {
      if (this.options.range) {
        this.options.range.useRange = true;
      } else {
        this.options.range = {};
        this.options.range.useRange = true;
      }
    }
    if (this.datepicker) {
      this.datepicker.updated(this.options);
    }
  }

  /**
   * Use range of two dates options.
   */
  @Input() set range(range: SohoDatePickerRange) {
    this.options.range = range;

    if (this.datepicker) {
      this.datepicker.updated(this.options);
    }
  }

  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event.
   */
  @Input() set roundToInterval(roundToInterval: number) {
    this.options.roundToInterval = roundToInterval;
  }

  /**
   * Indicates the pattern for the date format or the value of 'locale'.
   */
  @Input() set dateFormat(dateFormat: string) {
    this.options.dateFormat = dateFormat;
  }

  /**
   * Indicates a placeholder for an empty value; defaults to false.
   */
  @Input() set placeholder(placeholder: boolean) {
    this.options.placeholder = placeholder;
  }
  /**
   * Indicates an object containing a date or range of dates that are enabled or disabled.
   */
  @Input() set disable(disable: any) {
    this.options.disable = disable;
  }
  /**
   * Enables or disables the control
   */
  // TODO: waiting on SOHO-4834 - 4.0 Datepicker - Needs to support enable(), disable(), and readonly() methods
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

    if (this.datepicker) {
      if (value) {
        this.datepicker.disable();
        this.isDisabled = true;
      } else {
        this.datepicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * Sets the control to readonly
   */
  // TODO: waiting on SOHO-4834 - 4.0 Datepicker - Needs to support enable(), disable(), and readonly() methods
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    if (this.datepicker) {
      if (value) {
        this.datepicker.readonly();
        this.isReadOnly = true;
      } else {
        this.datepicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * Called when the datepicker value changes
   */
  @Output() change = new EventEmitter<SohoDatePickerEvent>();

  /**
   * Public API
   */
  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  public setValue(value: Date) {
    this.datepicker.setValue(value, true);
  }

  public getValue(): Date {
    return this.internalValue;
  }

  public focus(): void {
    if (this.datepicker) {
      this.datepicker.element.focus();
    }
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.datepicker') get isDatepicker() {
    return true;
  }
  @HostBinding('class.timepicker') get isTimepicker() {
    return !!this.options.showTime;
  }

  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.datepicker(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (args: SohoDatePickerEvent) => this.onChange(args));

    this.datepicker = this.jQueryElement.data('datepicker');

    if (this.internalValue) {
      this.datepicker.setValue(this.internalValue);
    }
  }

  ngAfterViewChecked() {
    // Make sure the control is disabled, if required.
    this.disabled = this.isDisabled;
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoDatePickerEvent) {
    this.internalValue = this.datepicker.element.val() as any;

    // Set the date on the event.
    event.data = this.internalValue;

    // Fire the event
    this.change.emit(event);
  }

  /**
   * Override writeValue to allow the date picker
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.datepicker) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.datepicker.element.val(value);
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

  ngOnDestroy() {
    if (this.datepicker) {
      if (this.datepicker) {
        this.datepicker.destroy();
        this.datepicker = null;
      }
    }
  }
}
