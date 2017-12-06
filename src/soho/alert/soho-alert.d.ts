/**
 * Soho Alert.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery alert control.
 */

type SohoAlertType = 'error' | 'alert' | 'confirm' | 'info';

interface SohoAlertOptions {
  /** */
  message?: string;

  /** */
  showTooltip?: boolean;

  /** */
  inline?: boolean;

  /** */
  type?: SohoAlertType;
}

/**
 * This interface represents the public API exposed by the
 * Alert.
 */
interface SohoAlertStatic {
  /** Access to the control's options block. */
  settings: SohoAlertOptions;

  /** Tears down the control and recreates it. */
  updated(): void;

  /** Destructor. */
  destroy(): void;
}

interface JQuery {
  addError(options?: SohoAlertOptions): JQuery;

  removeError(options?: SohoAlertOptions): JQuery;

  addMessage(options?: SohoAlertOptions): JQuery;

  removeMessage(options?: SohoAlertOptions): JQuery;

  getErrorMessage(options?: SohoAlertOptions): JQuery;

  scrollIntoView(alignToTop?: boolean, options?: SohoAlertOptions);
}
