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

  /** Indicates the entry mode. */
  mode?: SohoDatePickerMode;

  /** If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event. */
  roundToInterval?: number;

  /** The html markup for the time picker. */
  timepickerMarkup?: string;

  /** The pattern used to format the date; or a locale to use. */
  dateFormat?: string;

  /** Display a placeholder for empty values? */
  placeholder?: boolean;

  /** A date or range of dates that are enabled/disabled. */
  disable?: SohoDatePickerDisable;
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
  dateOfWeek?: number[];

  /** Enabled. */
  isEnable?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * datepicker.
 */
interface SohoDatePickerStatic {

  readonly(): void;

  // TODO: waiting on SOHO-4834 - 4.0 Datepicker - Needs to support enable(), disable(), and readonly() methods
  enable(): void;

  disable(): void;

  // SOHO-4777 - 4.0 Datepicker - Needs destroy method.
  destroy(): void;
}

/**
 * Type safe date picker event object.
 */
interface SohoDatePickerEvent extends JQueryEventObject {
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  datepicker: SohoDatePickerStatic;
}

interface JQuery {
  datepicker(options: SohoDatePickerOptions): JQuery;
}
