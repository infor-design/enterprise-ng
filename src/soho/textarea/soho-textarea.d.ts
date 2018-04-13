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
}

interface SohoTextAreaEvent extends JQuery.Event {
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

  destroy();

  updateCounter();
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  element: SohoTextAreaStatic;
}

interface JQuery {
  textarea(options?: SohoTextAreaOptions): JQuery;
}
