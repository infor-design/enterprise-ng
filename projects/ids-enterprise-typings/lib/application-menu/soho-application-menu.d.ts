/// <reference path='../accordion/soho-accordion.d.ts' />
/// <reference path='../searchfield/soho-searchfield.d.ts' />

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
  'desktop-to-extralarge' | undefined;

type SohoApplicationMenuExpandSwitcherFunction = (
  applicationMenu: any,
  element: HTMLElement,
  settings: any
) => void;

type SohoApplicationMenuCollapseSwitcherFunction = (
  applicationMenu: any,
  element: HTMLElement,
  settings: any
) => void;

interface SohoApplicationMenuOptions {
  /** Defines the point at which the application should be displayed - depends on device. */
  breakpoint: SohoApplicationMenuBreakPoint;

  /** Is this application menu filterable. */
  filterable?: boolean;

  /** Is this application menu resizable. */
  resizable?: boolean;

  /** Is this application menu resizable. */
  savePosition?: boolean;

  /** Open the menu when the screen width is larger that the breakpoint. */
  openOnLarge: boolean | undefined;

  /** Allows the menu to become closed after an actionable header has been selected */
  dismissOnClickMobile: boolean | undefined;

  /** The controls which can trigger the display state of the application menu. */
  triggers: any[];

  onExpandSwitcher?: SohoApplicationMenuExpandSwitcherFunction;

  onCollapseSwitcher?: SohoApplicationMenuCollapseSwitcherFunction;
}

/**
 * Application Menu Api
 */
interface SohoApplicationMenuStatic {
  /** Control settings. */
  settings: SohoApplicationMenuOptions;

  /** Accordion element */
  accordionEl: HTMLElement;

  /** Searchfield element, if present */
  searchEl?: HTMLElement | null;

  /** Searchfield API, if present */
  searchAPI?: SohoSearchFieldStatic;

  /**
   * Opens the application menu.
   *
   * param noFocus - if set the current focus is not modified.
   */
  openMenu(noFocus?: boolean, userOpened?: boolean, openedByClass?: boolean): void;

  /**
   * Closes the application menu.
   */
  closeMenu(): void;

  /**
   * Add and remove application nav menu triggers.
   *
   * @param triggers - list of triggers
   * @param remove - if set the triggers will be removed.
   * @param norebuild - if set this control's events won't automatically be rebound to include
   *                    the new triggers.
   */
  modifyTriggers(triggers: any[], remove: boolean, norebusild: boolean): void;

  /**
   * Updates the control based on the new settings.
   */
  updated(): void;

  /**
   * Closes the panel area controlled by switcher
   */
  closeSwitcherPanel(): void;

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
  destroy(): void;
}

interface JQueryStatic {
  applicationmenu: SohoApplicationMenuStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  applicationmenu(options?: SohoApplicationMenuOptions): JQuery;
}
