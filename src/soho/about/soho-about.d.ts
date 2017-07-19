/**
 * Soho About Dialog Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery about dialog control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in about.js.
 */

/**
 * Soho About Dialog configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoAboutOptions {
  /** The Main Application Name to display in the heading */
  appName?: string;

  /** Additional Text content to display at the top of the about dialog */
  content?: string;

  /** The year displayed in the copyright, defaults to current year. */
  copyrightYear?: string;

  /** Determines whether or not to display device information (Browser, Platform, Locale, Cookies Enabled) */
  deviceSpecs?: boolean;

  /** Additional product name information to display */
  productName?: string;

  /** Add the Legal Approved Infor Copyright Text */
  useDefaultCopyright?: boolean;

  /** Semantic Version Number for example (4.0.0) */
  version?: string;
}

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface SohoAboutStatic {

  /** Element. */
  element: JQuery;

  /**
   * Close the about dialog.
   *
   */
  close(): void;

  /**
   * Releases all resources managed by the about dialog.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery {
  about(options: SohoAboutOptions): JQuery;
}

interface JQueryStatic {
  about: SohoAboutStatic;
}
