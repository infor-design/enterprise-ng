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

  /**
   * If defined, provides a way to place the popdown against an alternate element.
   */
  trigger?: any;

  /**
   * If true, when the popdown is opened, the first available input/button in its content area will be focused.
   */
  autoFocus?: boolean;

  /**
   * If true, popdown will be toggle soon focused on the popdown trigger.
   */
  toggleOnFocus?: boolean;

  /**
   * Hook to work with tabbing in and out of the popdown.
   */
  firstLastTab?: any;
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

  /** Returns whether or not the popdown is open.  */
  isOpen(): boolean;

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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  popdown(options?: SohoPopDownOptions): JQuery;
}
