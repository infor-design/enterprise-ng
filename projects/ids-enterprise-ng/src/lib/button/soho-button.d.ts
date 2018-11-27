/**
 * Soho Button.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho button control.
 */

/**
 * Button Options
 */
interface SohoButtonOptions {
  toggleOnIcon?: string;
  toggleOffIcon?: string;
  replaceText?: boolean;

  
  /** Hides menu arrow usually displayed to the right of a menu button/icon. */
  hideMenuArrow?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * button.
 */
interface SohoButtonStatic {
  settings: SohoButtonOptions;
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  button: SohoButtonStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  button(options?: SohoButtonOptions): JQuery;
}
