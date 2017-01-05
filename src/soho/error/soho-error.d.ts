/**
 * Soho Error.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery error control.
 */

interface SohoErrorOptions {
  /** Custom click event; can be used with a modal dialog and custom list component */
  message?: string;

  showTooltip?: boolean;

  inline?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * Error.
 */
interface SohoErrorStatic {
  /** Access to the control's options block. */
  settings: SohoErrorOptions;



  /** Tears dwn the control and recreates it. */
  updated(): void;

  /** Destructor. */
  destroy(): void;
}

interface JQuery {
  addError(options?: SohoMaskOptions): JQuery;

  removeError(options?: SohoMaskOptions): JQuery;
}
