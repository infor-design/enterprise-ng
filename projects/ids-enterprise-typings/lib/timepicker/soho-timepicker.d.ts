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
  mode?: SohoTimePickerMode;

  /** Formatting for the time component. */
  timeFormat?: string;

  /** Minute interval. */
  minuteInterval?: number;

  /** Rounding. */
  roundToInterval?: boolean;

  /** Locale to use for this instance; if not set, the current locale is used. */
  locale?: string;

  /** Name of the language to use for this instance; if not set, the current locale is used or the passed locale is used. */
  language?: string;

  /** Second interval. */
  secondInterval?: number;

  /** If set, will be used as the target element. */
  parentElement?: JQuery;

  /** If false, focus will not be returned to the calling element. */
  returnFocus?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;

  /** Set the input to tabbable */
  tabbable?: boolean;
}

interface SohoTimePickerEvent extends JQuery.TriggeredEvent {
}

/**
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoTimePickerStatic {
  settings: SohoTimePickerOptions;

  /** Underlying element. */
  element: JQuery;

  destroy(): void;

  disable(): void;

  enable(): void;

  readonly(): void;

  updated(): void;

  show(): void;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  timepicker: SohoTimePickerStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  timepicker(options?: SohoTimePickerOptions): JQuery;
}
