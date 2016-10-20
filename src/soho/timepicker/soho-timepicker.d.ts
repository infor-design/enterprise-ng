/**
 * Soho timepicker.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery timepicker control.
 */

// timepicker
type SohoTimePickerMode = 'standard' | 'range';

interface SohoTimePickerOptions {
  /** The mode of the time picker. */
  mode: SohoTimePickerMode;

  /** Formatting for the time component. */
  timeFormat: string;

  /** Minute interval. */
  minuteInterval: number;

  /** Rounding. */
  roundToInterval: boolean;
}

interface SohoTimePickerEvent extends BaseJQueryEventObject {
}

/**
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoTimePickerStatic {
  show(): void;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  timepicker: SohoTimePickerStatic;
}

interface JQuery {
  timepicker(options?: SohoTimePickerOptions): JQuery;
}
