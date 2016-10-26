/**
 * Soho Message Dialog Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery message dialog control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in js\message.js.
 */

/**
 * Soho Modal Dialog configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoMessageOptions {
  /** The string used as the title for the dialog - not defaulted. */
  title?: string;

  /** Show title as an Error with an icon. */
  isError?: boolean;

  /** The message content or text.*/
  message?: string;

  /** Width in pixels or auto. */
  width?: number | 'auto';

  /** Additional dialog styling. */
  cssClass?: string;

  /** The buttons to create. */
  buttons?: SohoModalButton[];

  /** Element to focus on return. */
  returnFocus?: JQuery;
}

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface SohoMessageStatic {
  /** Existing configuration settings. */
  settings: SohoModalOptions;

  /** Element. */
  element: JQuery;

  /**
   * Close the modal dialog.
   *
   * @param destroy - destroy the html elements.
   */
  close(destroy?: boolean): void;

  /**
   * Releases all resources managed by the modal.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery {
  message(options: SohoMessageOptions): JQuery;
}

interface JQueryStatic {
  message: SohoMessageStatic;
}
