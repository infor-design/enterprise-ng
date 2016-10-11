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
  // All options are set via attributes.
}

/**
 * This interface represents the public API exposed by the
 * busy indicator.
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
  button(): JQuery;
}
