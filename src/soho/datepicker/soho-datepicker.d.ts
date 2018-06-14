/**
 * Soho DatePicker.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho datepicker control.
 */

type SohoDatePickerMode = 'standard' | 'range';

/**
 * Date Picker Options
 */
interface SohoDatePickerOptions {
  /** Include the time in the date picker; defaults to false (in the soho control). */
  showTime?: boolean;

  /** Time format, e.g. HH:mm:ss.*/
  timeFormat?: string;

  /** An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown. */
  minuteInterval?: number;

  /** An integer from 1 to 60; multiples of this value are displayed as options in the seconds dropdown. */
  secondInterval?: number;

  /** Indicates the entry mode. */
  mode?: SohoDatePickerMode;

  /** If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event. */
  roundToInterval?: number;

  /** The pattern used to format the date; or a locale to use. */
  dateFormat?: string;

  /** Display a placeholder for empty values? */
  placeholder?: boolean;

  /** A date or range of dates that are enabled/disabled. */
  disable?: SohoDatePickerDisable;

  /** If true a legend is show to associate dates. */
  showLegend?: boolean;

  /** If true the internal validation is disabled. */
  customValidation?: boolean;

  /** If true the month and year will render as dropdowns. */
  showMonthYearPicker?: boolean;

  /** If true the days portion of the calendar will be hidden. */
  hideDays?: boolean;

  /** The number of months in each direction to show in the dropdown for months (when initially opening) */
  advanceMonths?: boolean;

  /** The number of months in each direction to show in the dropdown for months (when initially opening) */
  legend?: SohoDatePickerLegend;

  /** Use range of two dates options. */
  range?:  SohoDatePickerRange;

  /** Calendar name. */
  calendarName?:  'gregorian'|'islamic-umalqura';

  /** If true the dates will use UTC format. This is only partially
   * implemented https://jira.infor.com/browse/SOHO-3437 */
  useUTC?: boolean;
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

  // TODO: waiting on SOHO-4834 - 4.0 Datepicker - Needs to support enable(), disable(), and readonly() methods
  enable(): void;

  disable(): void;

  updated(SohoDatePickerOptions): void;

  // SOHO-4777 - 4.0 Datepicker - Needs destroy method.
  destroy(): void;
}

/**
 * Type safe date picker event object.
 */
interface SohoDatePickerEvent extends JQuery.Event {
  data: any;
  elem: HTMLElement[];
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  datepicker: SohoDatePickerStatic;
}

interface JQuery<TElement extends Node = HTMLElement> {
  datepicker(options: SohoDatePickerOptions): JQuery;
  on(events: string,
     handler: JQuery.EventHandlerBase<TElement, SohoDatePickerEvent>): this;
}
