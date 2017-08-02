/**
 * Soho Mask.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Mask control.
 */

/** SohoMaskModes */
type SohoMaskMode = 'group' | 'number' | 'date' | 'time';

/** Possible mask symbols. */
type SohoMaskShowSymbol = false | 'currency' | 'percent';

/** Custom definitions type.
 *  (map), e.g.
 *  {'#': /[0-9]/,
 *  '0': /[0-9]/,
 *  'x': /[\u00C0-\u017Fa-zA-Z]/}
 */
interface SohoMaskDefinitions { [key: string]: RegExp; }

/** */
interface SohoMaskEvent extends JQueryEventObject {
}

interface SohoMaskOptions {
  /** The pattern to use for the mask. */
  pattern?: string;

  /** The placeholder text for the mask.  */
  placeholder?: string;

  /** The mask shortcut definitions. */
  definitions?: SohoMaskDefinitions;

  /**
   * Indicates if each section of the group pattern match must be full in order for
   * the literals in-between each section to be automatically added (meaning you can't
   * type a literal to end that group until all characters in that group are entered).
   */
  groupComplete?: boolean;

  /** Indicates special formatting rules may apply to the mask. */
  mode?: SohoMaskMode;

  /** Indicates to complete the full mask or the mask will revert to empty. */
  mustComplete?: boolean;

  /**
   * Indicates you can enter the negative symbol in front of the number;
   * automatically set to true if a negative symbol is detected inside the mask.
   */
  negative?: boolean;

  /** Option defined in control, but not referenced. */
  number?: boolean;

  /** When false, the mask is not initially applied. */
  processOnInitialize?: boolean;

  /**
   * Indicates the thousands separator for numbers (based on localization) will be
   * inserted wherever necessary during typing; automatically set to true if the
   * localized thousands separator is detected inside the mask.
   */
  thousandsSeparator?: boolean;

  /**
   * Indicates to display the localized symbol for currency or percent;
   * backwards compatible with old 'data-show-currency'; value true equates to currency
   */
  showSymbol?: SohoMaskShowSymbol;
}

/**
 * This interface represents the public API exposed by the
 * Mask.
 */
interface SohoMaskStatic {
  /** Access to the control's options block. */
  settings: SohoMaskOptions;

  /** Tears dwn the control and recreates it. */
  updated(): void;

  /** Destructor. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  mask: SohoMaskStatic;
}

interface JQuery {
  mask(options?: SohoMaskOptions): JQuery;
}
