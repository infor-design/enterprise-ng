/**
 * Soho Home Page.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho home page control.
 */

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoHomePageStatic {
  /**
   * Resize the control.
   */
  resize(): void;

  /**
   * Destroys any resources created by this control.
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  homepage: SohoHomePageStatic;
}

interface JQuery {
  homepage(): JQuery;
}
