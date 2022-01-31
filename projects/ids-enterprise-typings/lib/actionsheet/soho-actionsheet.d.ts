/**
 * Soho Actionsheet.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho Actionsheet control.
 */

/**
 * Actionsheet Options
 */

type SohoActionsheetDisplay = false | 'responsive' | 'always';

type SohoActionsheetTrayBackgroundColors = 'slate' | 'ruby' | 'amber' | 'emerald' | 'azure' | 'turquoise' | 'amethyst';

interface SohoActionsheetOptions {
  actions?: SohoActionsheetActions;
  autoFocus?: boolean;
  breakpoint?: string;
  displayAsActionSheet?: SohoActionsheetDisplay;
  overlayOpacity?: number;
  onSelect?: Function;
  onCancel?: Function;
  tray?: boolean;
  trayOpts?: SohoActionsheetTrayOptions;
  showCancelButton?: boolean;
  attributes?: Array<Object> | Object;
}

interface SohoActionsheetTrayOptions {
  text?: string;
  icon?: string;
  backgroundColor?: SohoActionsheetTrayBackgroundColors;
}

interface SohoActionsheetActions {
  icon?: string;
  text?: string;
}

interface SohoActionsheetStatic {
  settings: SohoActionsheetOptions;

  /** Returns true if the Action Sheet is currently visible */
  get visible(): boolean;

  /** Returns true if the Action Sheet is currently visible */
  get actionElems(): boolean;

  /** Returns attached Popupmenu API, if available */
  get popupmenuAPI(): SohoPopupMenuOptions;

  /** Returns true if there is a currently-open Popupmenu attached to the trigger button */
  get hasOpenPopupMenu(): boolean;

  /** Returns {boolean} whether or not this Action Sheet instance should currently display in
   * full size mode (uses the settings, but determined at runtime)
   * */
  get currentlyNeedsActionSheet(): boolean;

  /** Opens the Action Sheet */
  open(): void;

  /** Opens a simple Popupmenu containing the same actions as the sheet. */
  openPopupMenu(): void;

  /** Tears down and removes any added markup and events. */
  destroy(): void;

  /** Triggers a UI Resync. */
  updated(settings?: SohoActionsheetOptions): void;
}

/** jQuery Integration */
interface jQueryStatic {
  actionsheet: SohoActionsheetStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  actionsheet(options?: SohoActionsheetOptions): JQuery;
}
