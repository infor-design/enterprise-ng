/**
 * Soho Actionsheet.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho Actionsheet control.
 */

/**
 * Actionsheet Options
 */

type SohoActionsheetDisplay = false | 'responsive' | 'always' | null | undefined;

type SohoActionsheetTrayBackgroundColors = 'slate' | 'ruby' | 'amber' | 'emerald' | 'azure' | 'turquoise' | 'amethyst' | null | undefined;

interface SohoActionsheetOptions {
  actions?: SohoActionsheetActions;
  autoFocus?: boolean;
  breakpoint?: string;
  displayAsActionSheet?: SohoActionsheetDisplay;
  overlayOpacity?: number;
  onSelect?: Function | null;
  onCancel?: Function | null;
  tray?: boolean;
  trayOpts?: SohoActionsheetTrayOptions;
  showCancelButton?: boolean;
  attributes?: Array<Object> | Object;
}

interface SohoActionsheetTrayOptions {
  text?: string;
  icon?: string;
  backGroundColor?: SohoActionsheetTrayBackgroundColors;
}

interface SohoActionsheetActions {
  icon?: string;
  text?: string;
}

interface SohoActionsheet {
  settings: SohoActionsheetOptions;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  actionsheet(options?: SohoActionsheetTrayOptions): JQuery;
}
