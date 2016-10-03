import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'input[soho-timepicker]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
export class SohoTimePickerComponent implements AfterViewInit, OnDestroy {
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
  };

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

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.timepicker') get isTimepicker() {
    return true;
  };

  /**
   * Local variables
   */
  private jQueryElement: any;
  private timepicker: any;
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private options: SohoTimePickerOptions = {
    mode: undefined,
    timeFormat: undefined,
    minuteInterval: undefined,
    roundToInterval: false
  };

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.timepicker(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoTimePickerEvent) => this.change.emit(event));

    this.timepicker = this.jQueryElement.data('timepicker');
  }
  ngOnDestroy() {
    if (this.timepicker) {
      this.timepicker.destroy();
      this.timepicker = null;
    }
  }
}
