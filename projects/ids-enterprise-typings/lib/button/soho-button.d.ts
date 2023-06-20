/**
 * Soho Button.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho button control.
 */
type SohoButtonOptionsStyle = 'default' | 'btn' | 'btn-primary' | 'btn-secondary' | 'btn-tertiary' | 'btn-destructive' | null | undefined;

type SohoButtonOptionsType = 'default' | 'btn-icon' | 'btn-menu' | 'btn-actions' | 'btn-toggle' |
  'icon-favorite' | 'btn-editor' | 'input' | null | undefined;

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

  /** button style: defaults to "default". */
  style?: SohoButtonOptionsStyle;

  /** button type: defaults to "default". */
  type?: SohoButtonOptionsType;

  /** Ripple */
  ripple?: boolean;

  /** Add bigger hit area (for mobile) */
  hitbox?: boolean;

  /** Used to set a notification badge on the button */
  notificationBadge?: boolean;

  /** Set the position and color of the notification badge on the button */
  notificationBadgeOptions?: SohoNotificationBadgeOptions;

  /** validate? */
  validate?: boolean;

  /** Audible? */
  audible?: boolean;

  /** Displayed text. */
  text?: string;

  /** Setting to override the more button behavior */
  title?: string;

  /** Associated icon. */
  icon?: string;

  /** Icon placement */
  iconAlign?: 'start' | 'end';

  /** Disabled? */
  disabled?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * This interface represents the public API exposed by the
 * button.
 */
declare class SohoButtonStatic {
  /** Internal settings. */
  settings: SohoButtonOptions;

  /** Associated HTML element. */
  element: HTMLButtonElement;

  /** Destroys any resources held by the button. */
  destroy(): void;

  /** Returns true if the button is disabled; otherwise false. */
  get disabled(): boolean;

  /** Sets the disable state of the button. */
  set disabled(value: boolean);

  /** Whether or not this is a valid toggle button in a pressed state. */
  get pressed(): boolean;

  /** On a Toggle or Favorite button, sets the current pressed state. */
  set pressed(val: boolean);

  /**
   * Provides a JSON-compatible data representation of this button component for use with
   * higher-level components.
   */
  toData(addContextElement: boolean): string;

  /** Toggles the current state of the icon button. */
  toggle(): void;

  /** Update the component with new settings. */
  updated(settings?: SohoButtonOptions): void;
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
