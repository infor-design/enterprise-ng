/**
 * Soho PopDown.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery popdown control.
 */

interface SohoPopDownStatic {

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
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  popdown: SohoPopDownStatic;
}

interface JQuery {
  popdown(): JQuery;
}
