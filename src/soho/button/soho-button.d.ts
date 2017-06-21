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
}

/**
 * This interface represents the public API exposed by the
 * button.
 */
interface SohoButtonStatic {
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  button: SohoButtonStatic;
}

interface JQuery {
  button(options?: SohoButtonOptions): JQuery;
}
