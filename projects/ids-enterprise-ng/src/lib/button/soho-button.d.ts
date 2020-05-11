/**
 * Soho Button.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho button control.
 */

/**
 * Button Options
 */
interface SohoButtonOptions {
  /** An optional identifier for the button. */
  id?: string;

  /** The icon to use for on state toggle buttons. */
  toggleOnIcon?: string;

  /** The icon to use for off state on toggle buttons. */
  toggleOffIcon?: string;

  /** If true the selection will be used to replace the content. */
  replaceText?: boolean;

  /** Hides menu arrow usually displayed to the right of a menu button/icon. */
  hideMenuArrow?: boolean;

  /** button style: defaults to "default" */
  style?: string,

  /** button type: defaults to "default" */
  type?: string,

  /** ripple */
  ripple?: boolean,

  // **** Added for buttonse **/
  /** validate? */
  validate?: boolean

  audible?: boolean;

  text?: string;

  icon?: string;

  disabled?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * button.
 */
declare class SohoButtonStatic {
  settings: SohoButtonOptions;

  /**  */
  element: HTMLButtonElement;

  disable(): void;

  destroy(): void;

  /**
   * whether or not this is a valid toggle button in a pressed state.
   */
  get pressed(): boolean;

  /**
   * On a Toggle or Favorite button, sets the current pressed state.
   * @param {boolean} val whether or not to set a "pressed" state on this valid toggle button.
   * @returns {void}
   */
  set pressed(val: boolean);

  /**
   * Provides a JSON-compatible data representation of this button component for use with
   * higher-level components.
   *
   * @param addContextElement if true, adds a reference to this button element to the return data (NOT JSON-compatible).
   * @returns JSON-compatible representation of this button's configuration.
   */
  toData(addContextElement: boolean): string;

  /**
   * Toggles the current state of the icon button.
   */
  toggle(): void;

  /** Update the component with new settings. */
  updated(settings: SohoButtonOptions): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  button: SohoButtonStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  button(options?: SohoButtonOptions): JQuery;
}
