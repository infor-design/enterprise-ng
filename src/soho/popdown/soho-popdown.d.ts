/**
 * Soho PopDown.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery popdown control.
 */

 /**
  * Settings for the soho popdown control
  */
interface SohoPopDownOptions {
  /**
   * Forces the popdown to stay open
   */
  keepOpen?: boolean;

}

interface SohoPopDownStatic {
  /** Control options */
  settings: SohoPopDownOptions;

  /** Returns the selected html element. */
  getSelected(): any;

  /** Updates the control to reflect the settings. */
  updated(): void;

  /** Tear down. */
  teardown(): void;

  /** Destroy the markup and any other resources.  */
  destroy(): void;

  /** Open the popdown*/
  open(): void;

  /** Close the popdown*/
  close(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  popdown: SohoPopDownStatic;
}

interface JQuery {
  popdown(options?: SohoPopDownOptions): JQuery;
}
