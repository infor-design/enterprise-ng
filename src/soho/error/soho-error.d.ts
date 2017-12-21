/**
 * Soho Error.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery error control.
 * @deprecated - use SohoAlert instead
 */

/**
 * @deprecated - use SohoAlert instead
 */
interface SohoErrorOptions {
  /** */
  message?: string;

  /** */
  showTooltip?: boolean;

  /** */
  inline?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * Error.
 * @deprecated - use SohoAlert instead
 */
interface SohoErrorStatic {
  /** Access to the control's options block. */
  settings: SohoErrorOptions;

  /** Tears down the control and recreates it. */
  updated(): void;

  /** Destructor. */
  destroy(): void;
}

interface JQuery {
  addError(options?: SohoErrorOptions): JQuery;

  removeError(options?: SohoErrorOptions): JQuery;

  getErrorMessage(options?: SohoErrorOptions): JQuery;

  scrollIntoView(alignToTop?: boolean, options?: SohoErrorOptions);
}
