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
  selector: 'input[soho-datepicker]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoDatePickerComponent)]
})
export class SohoDatePickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, AfterViewChecked, OnDestroy {

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck?: boolean;

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;

  private datepicker?: SohoDatePickerStatic | null;

  private isDisabled?: boolean = undefined;

  private isReadOnly?: boolean = undefined;

  private _options: SohoDatePickerOptions = {};

  /**
   * Indicates to display the timepicker; defaults to false.
   */
  @Input() set showTime(showTime: boolean) {
    this._options.showTime = showTime;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If true current time will be used for the time portion otherwise 12:00 midnight is used.
   */
  @Input() set useCurrentTime(useCurrentTime: boolean) {
    this._options.useCurrentTime = useCurrentTime;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates the pattern for the time format.
   */
  @Input() set timeFormat(timeFormat: string) {
    this._options.timeFormat = timeFormat;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown.
   */
  @Input() set minuteInterval(minuteInterval: number) {
    this._options.minuteInterval = minuteInterval;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the seconds dropdown.
   */
  @Input() set secondInterval(secondInterval: number) {
    this._options.secondInterval = secondInterval;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Change the datepickers first day of the week.
   * An integer from 0 - 6 where 0 = Sunday, 1 = Monday, etc...
   */
  @Input() set firstDayOfWeek(firstDayOfWeek: SohoDatePickerDayOfWeek) {
    this._options.firstDayOfWeek = firstDayOfWeek;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If true the field will be sized to the width of the date.
   */
  @Input() set autoSize(autoSize: boolean) {
    this._options.autoSize = autoSize;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Show the today button on the header.
   */
  @Input() set showToday(showToday: boolean) {
    this._options.showToday = showToday;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this._options.attributes = attributes;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates mode, either 'standard' or 'range'.
   */
  @Input() set mode(mode: SohoDatePickerMode) {
    this._options.mode = mode;

    if (mode === 'range') {
      if (this._options.range) {
        this._options.range.useRange = true;
      } else {
        this._options.range = {};
        this._options.range.useRange = true;
      }
    }
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Use range of two dates options.
   */
  @Input() set range(range: SohoDatePickerRange) {
    this._options.range = range;

    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event.
   */
  @Input() set roundToInterval(roundToInterval: boolean) {
    this._options.roundToInterval = roundToInterval;

    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates the pattern for the date format or the value of 'locale'.
   */
  @Input() set dateFormat(dateFormat: string) {
    this._options.dateFormat = dateFormat;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates a placeholder for an empty value; defaults to false.
   */
  @Input() set placeholder(placeholder: string) {
    this._options.placeholder = placeholder;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates an object containing a date or range of dates that are enabled or disabled.
   */
  @Input() set disable(disable: any) {
    this._options.disable = disable;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates a legend is shown to associate dates
   */
  @Input() set showLegend(showLegend: boolean) {
    this._options.showLegend = showLegend;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates if the month and year will render as dropdowns.
   */
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean) {
    this._options.showMonthYearPicker = showMonthYearPicker;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates if the days portion of the calendar will be hidden.
   */
  @Input() set hideDays(hideDays: boolean) {
    this._options.hideDays = hideDays;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * The number of years ahead to show in the month/year picker should total 9 with yearsBack.
   */
  @Input() set yearsAhead(yearsAhead: number) {
    this._options.yearsAhead = yearsAhead;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * The number of years back to show in the month/year picker should total 9 with yearsAhead.
   */
  @Input() set yearsBack(yearsBack: number) {
    this._options.yearsBack = yearsBack;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Options for how the legend displays
   */
  @Input() set legend(legend: Array<SohoDatePickerLegend>) {
    this._options.legend = legend;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * The name of the locale to use for this instance. If not set, the current locale will be used.
   */
  @Input() set locale(locale: string) {
    this._options.locale = locale;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Calendar's name. Currently just 'gregorian' or 'islamic-umalqura'
   */
  @Input() set calendarName(calendarName: SohoDatePickerCalendarName) {
    this._options.calendarName = calendarName;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates if the dates will use UTC format
   */
  @Input() set useUTC(useUTC: boolean) {
    this._options.useUTC = useUTC;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Sets the options for the date picker
   */
  @Input() set options(options: SohoDatePickerOptions) {
    this._options = options;
    if (this.datepicker) {
      this.markForRefresh();
    }
  }

  get options(): SohoDatePickerOptions {
    return this._options;
  }

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.datepicker == null) {
      this.isDisabled = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isDisabled = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => {
        this.datepicker?.disable();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.datepicker?.enable();
        this.isReadOnly = false;
      });
    }
  }

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.datepicker == null) {
      this.isReadOnly = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isReadOnly = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => this.datepicker?.readonly());
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.datepicker?.enable();
        this.isDisabled = false;
      });
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  /**
   * Called when the datepicker value changes
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output() change = new EventEmitter<SohoDatePickerEvent>();

  /**
   * Public API
   */

  public setValue(value: Date | string) {
    this.datepicker?.setValue(value, true);
  }

  public getValue(asDate: boolean = false): string | Date {
    if (asDate) {
      const calendar = Soho.Locale.calendar();
      const dateFormat = this._options.dateFormat || calendar.dateFormat.short;
      const timeFormat = this._options.timeFormat || calendar.timeFormat;
      let format = dateFormat;
      if (this._options.showTime) {
        format += 'T' + timeFormat;
      }
      return Soho.Locale.parseDate(this.internalValue, format);
    }
    return this.internalValue;
  }

  public focus(): void {
    if (this.datepicker) {
      this.datepicker.element.trigger('focus');
    }
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.datepicker') get isDatepicker() {
    return true;
  }
  @HostBinding('class.timepicker') get isTimepicker() {
    return !!this._options.showTime;
  }

  /**
   * Creates an instance of SohoDatePickerComponent.
   *
   * @param element the element this component encapsulates.
   * @param ngZone the angular zone for this component.
   * @param ref reference to the change detector
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

      // initialise the colorpicker control
      this.jQueryElement.datepicker(this._options);

      // extract the api
      this.datepicker = this.jQueryElement.data('datepicker');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement
        .on('change', (args: any) => this.onChange(args));

      if (this.internalValue) {
        this.datepicker?.element.val(this.internalValue);
      }
      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      // Ensure the enabled/disabled flags are set.
      if (this.isDisabled !== null && this.isDisabled !== undefined) {
        this.disabled = this.isDisabled;
      }
      if (this.isReadOnly !== null && this.isReadOnly !== undefined) {
        this.readonly = this.isReadOnly;
      }

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.datepicker) {
          this.datepicker.updated(this._options);
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoDatePickerEvent) {
    this.internalValue = this.datepicker?.element.val();

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
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {

      if (this.jQueryElement) {
        this.jQueryElement.off();
      }

      if (this.datepicker) {
        this.datepicker.destroy();
        this.datepicker = null;
      }
    });
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
