/**
 * Soho Text Area.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery textarea control.
 */

interface SohoTextAreaOptions {
  /** Turns on the character counter for the element. */
  characterCounter?: boolean;

  /** Sets the element as printable */
  printable?: boolean;

  /** Text to display for the remaining characters hint. */
  charRemainingText?: string;

  /** Text to display for maximum characters. */
  charMaxText?: string;

  /** Sets the max character length available for a textarea.  */
  maxLength?: number;

  /** Sets the trigger to make textarea growable.  */
  autoGrow?: boolean;

  /** Sets the maximum ceiling of growable textarea. */
  autoGrowMaxHeight?: number;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

interface SohoTextAreaEvent extends JQuery.TriggeredEvent {
}

/**
 * @deprecated
 */
interface SohoTextareaEvent extends SohoTextAreaEvent {
}

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoTextAreaStatic {
  /** Options. */
  settings: SohoTextAreaOptions;
  element: JQuery;

  enable(): void;

  disable(): void;

  readonly(): void;

  destroy(): void;

  updated(settings: SohoTextAreaOptions): void;

  updateCounter(): void;

  autoGrow(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  element: SohoTextAreaStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  textarea(options?: SohoTextAreaOptions): JQuery;
}
