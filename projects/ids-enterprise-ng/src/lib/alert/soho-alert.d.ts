/**
 * Soho Alert.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery alert control.
 */

type SohoAlertType = 'error' | 'alert' | 'confirm' | 'info' | 'icon';

interface SohoAlertOptions {
  /** */
  message?: string;

  /** */
  inline?: boolean;

  /** */
  type?: SohoAlertType;

  /**
   * If true, does not display control border color, control text color, and control icon color.
   */
  isAlert?: boolean;

  /**
   * If true, events will be triggered
   */
  triggerEvents?: boolean;

  /** */
  icon?: string;
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

  addMessage(options?: SohoAlertOptions): JQuery;

  getErrorMessage(options?: SohoAlertOptions): string;

  getMessage(options?: SohoAlertOptions): string;

  removeError(options?: SohoAlertOptions): JQuery;

  removeMessage(options?: SohoAlertOptions): JQuery;

  scrollIntoView(alignToTop?: boolean, options?: SohoAlertOptions);
}
