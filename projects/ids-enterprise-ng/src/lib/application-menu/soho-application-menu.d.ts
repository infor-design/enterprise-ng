/**
 * Soho Application Menu.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery applicationmenu control.
 */

/**
 * Application Menu Options
 */
type SohoApplicationMenuBreakPoint =
  'phone' |
  'slim' |
  'phablet' |
  'phone-to-tablet' |
  'wide-tablet' |
  'tablet-to-desktop' |
  'desktop-to-extralarge';

interface SohoApplicationMenuOptions {
  /** Defines the point at which the application should be displayed - depends on device. */
  breakpoint: SohoApplicationMenuBreakPoint;

  /** Is this application menu filterable. */
  filterable?: boolean;

  /** Open the menu when the screen width is larger that the breakpoint. */
  openOnLarge: boolean;

  /** Allows the menu to become closed after an actionable header has been selected */
  dismissOnClickMobile: boolean;

  /** The controls which can trigger the display state of the application menu. */
  triggers: any[];
}

/**
 * Application Menu Api
 */
interface SohoApplicationMenuStatic {
  /** Control settings. */
  settings: SohoApplicationMenuOptions;

  /**
   * Opens the application menu.
   *
   * param noFocus - if set the current focus is not modified.
   */
  openMenu(noFocus?: boolean): void;

  /**
   * Closes the application menu.
   */
  closeMenu(): void;

  /**
   * Add and remove application nav menu triggers.
   *
   * @param triggers - list of triggers
   * @param remove - if set the the triggers will be removed.
   * @param norebuild - if set this control's events won't automatically be rebound to include
   *                    the new triggers.
   */
  modifyTriggers(triggers: any[], remove: boolean, norebusild: boolean): void;

  /**
   * Updates the control based on the new settings.
   */
  updated(): void;

  /**
   * Has this control got the defined class.
   *
   * @param clazz - the class to check for.
   */
  hasClass(clazz: string): boolean;

  /**
   * Checks if the application menu is open.
   *
   */
  isOpen(): boolean;

  /**
   * Cleans up any markup.
   */
  destroy();
}

interface JQueryStatic {
  applicationmenu: SohoApplicationMenuStatic;
}

interface JQuery {
  applicationmenu(options?: SohoApplicationMenuOptions): JQuery;
}
