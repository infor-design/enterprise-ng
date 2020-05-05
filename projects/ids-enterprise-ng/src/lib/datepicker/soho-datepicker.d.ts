/**
 * Soho DatePicker.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho datepicker control.
 */

type SohoDatePickerMode = 'standard' | 'range';

type SohoDatePickerCalendarName = 'gregorian' | 'islamic-umalqura';

type SohoDatePickerDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Date Picker Options
 */
interface SohoDatePickerOptions {
  /** Include the time in the date picker; defaults to false (in the soho control). */
  showTime?: boolean;

  /**  If true current time will be used for the time portion otherwise 12:00 midnight is used. */
  useCurrentTime?: boolean;

  /** Time format, e.g. HH:mm:ss.*/
  timeFormat?: string;

  /** An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown. */
  minuteInterval?: number;

  /** An integer from 1 to 60; multiples of this value are displayed as options in the seconds dropdown. */
  secondInterval?: number;

  /** Indicates the entry mode. */
  mode?: SohoDatePickerMode;

  /** If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event. */
  roundToInterval?: boolean;

  /** The pattern used to format the date; or a locale to use. */
  dateFormat?: string;

  /** Display a placeholder for empty values? */
  placeholder?: string;

  /** A date or range of dates that are enabled/disabled. */
  disable?: SohoDatePickerDisable;

  /** If true a legend is show to associate dates. */
  showLegend?: boolean;

  /** If true the month and year will render as dropdowns. */
  showMonthYearPicker?: boolean;

  /** The number of years ahead to show in the month/year picker should total 9 with yearsBack. */
  hideDays?: boolean;

  /** If true the days portion of the calendar will be hidden. */
  yearsAhead?: number;

  /** The number of years back to show in the month/year picker should total 9 with yearsAhead. */
  yearsBack?: number;

  /** The number of months in each direction to show in the dropdown for months (when initially opening) */
  legend?: Array<SohoDatePickerLegend>;

  /** Use range of two dates options. */
  range?:  SohoDatePickerRange;

  /** Calendar name. */
  calendarName?:  SohoDatePickerCalendarName;

  /** The name of the locale to use for this instance. If not set, the current locale will be used. */
  locale?: string;

  /** If true the dates will use UTC format. This is only partially
   * implemented https://jira.infor.com/browse/SOHO-3437 */
  useUTC?: boolean;

  /** Set first day of the week. '1' would be Monday. */
  firstDayOfWeek?: SohoDatePickerDayOfWeek;

  /** If true the field will be sized to the width of the date. */
  autoSize?: boolean;

  /** Show the today button on the header. */
  showToday?: boolean;
}

/* Options for the legend */
interface SohoDatePickerRange {
  /** Start date in range. **/
  start?: Date;

  /** End date in range. **/
  end?: Date;

  /** Visual separator between two dates. **/
  separator?: string;

  /** Minimum days to be in range. **/
  minDays?: number;

  /** Maximum days to be in range. **/
  maxDays?: number;

  /**  Range only in forward direction. **/
  selectForward?: boolean;

  /**  Range only in backward direction. **/
  selectBackward?: boolean;

  /**  Include disable dates in range of dates. **/
  includeDisabled?: boolean;

  /** Use range of two dates options. */
  useRange?:  boolean;
}

/* Options for the legend */
interface SohoDatePickerLegend {
  name?: string;
  color?: string;
  dates?: Date[];
  dayOfWeek?: number[];
}

/**
 * Disabled date ranges.
 */
interface SohoDatePickerDisable {
  /**
   * 'M/d/yyyy' or
   * ['M/d/yyyy'] or
   * ['M/d/yyyy', new Date('M/d/yyyy')] or
   * ['M/d/yyyy', new Date('M/d/yyyy'), new Date(yyyy,(M-0),d)]
   */
  dates?: string | (string | Date)[];

  /** 'M/d/yyyy' */
  minDate?: string|Date;

  /** 'M/d/yyyy' */
  maxDate?: string | Date;

  /** [2] or [0,6] - {0-sun, 1-mon, 2-tue, 3-wed, 4-thu, 5-fri, 6-sat} */
  dayOfWeek?: number[];

  /** Enabled. */
  isEnable?: boolean;

  /**
   * Restrict month selections on datepicker.
   * It requires minDate and maxDate for the feature to activate.
   */
  restrictMonths?: boolean;

  /**
   * Restrict month selections on datepicker.
   * It requires minDate and maxDate for the feature to activate.
   */
  callback?: SohoDatePickerDisableDatesCallback;
}

interface SohoDatePickerDisableDatesCallback {
  year?: number;
  month?: number;
  day?: number;
}

/**
 * This interface represents the public API exposed by the
 * datepicker.
 */
interface SohoDatePickerStatic {

  /** Underlying element. */
  element: JQuery;

  getCurrentDate(): Date;

  // Sets the value of the date picker.
  setValue(value: Date, trigger?: boolean): void;

  readonly(): void;

  enable(): void;

  disable(): void;

  updated(settings?: SohoDatePickerOptions): void;

  destroy(): void;
}

/**
 * Type safe date picker event object.
 */
interface SohoDatePickerEvent extends JQuery.TriggeredEvent {
  data: any;
  elem: HTMLElement[];
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  datepicker: SohoDatePickerStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  datepicker(options?: SohoDatePickerOptions): JQuery;
}
