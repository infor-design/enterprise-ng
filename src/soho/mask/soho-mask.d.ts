/**
 * Soho Mask.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Mask control.
 */

/**
 * SohoMaskProcess
 */
type SohoMaskProcess = 'number' | 'date' | 'time';

/**
 * SohoMaskPattern
 */
type SohoMaskPattern = string | Array<RegExp | string> | Function;

/**
 * SohoMaskModes
 * @deprecated use SohoMaskProcess instead
 */
type SohoMaskMode = 'group' | 'number' | 'date' | 'time';

/**
 * Possible mask symbols.
 * @deprecated use prefix or suffix instead
 */
type SohoMaskShowSymbol = false | 'currency' | 'percent';

/** Custom definitions type.
 *  (map), e.g.
 *  {'#': /[0-9]/,
 *  '0': /[0-9]/,
 *  'x': /[\u00C0-\u017Fa-zA-Z]/}
 */
interface SohoMaskDefinitions { [key: string]: RegExp; }

/** */
interface SohoMaskEvent extends JQuery.Event {
}

interface SohoMaskPatternOptions {
  /** When true, the decimal separator symbol is allowed in a formatted number. */
  allowDecimal?: boolean;

  /** When true, allows leading zeros in a formatted number. */
  allowLeadingZeros?: boolean;

  /** When true, the negative symbol is allowed in a formatted number. */
  allowNegative?: boolean;

  /** When true, adds the thousands separator symbol to the correct location in a formatted number. */
  allowThousandsSeparator?: boolean;

  /** The maximum number of digits to the left of the decimal separator symbol in a formatted number. */
  decimalLimit?: number;

  /** The maximum number of digits to the right of decimal separator symbol in a formatted number. */
  integerLimit?: number;

  /** The character that precedes the masked value. */
  prefix?: string;

  /** When true, the decimal separator symbol is required in a formatted number. */
  requireDecimal?: boolean;

  /** The character that follows the masked value. */
  suffix?: string;

  /** The symbols to use for the formatted number. */
  symbols?: SohoMaskPatternSymbols;
}

interface SohoMaskPatternSymbols {
  /** The currency symbol to use for the formatted number. */
  currency?: string;

  /** The decimal separator symbol to use for the formatted number. */
  decimal?: string;

  /** The negative symbol to use for the formatted number. */
  negative?: string;

  /** The thousands separator symbol to use for the formatted number. */
  thousands?: string;
}

interface SohoMaskOptions {
  /** The mask shortcut definitions. */
  definitions?: SohoMaskDefinitions;

  /** When true, appends the leftover characters in the placeholder to the conformed value. */
  guide?: boolean;

  /** When true, keeps groups of character intact. */
  keepCharacterPositions?: boolean;

  /** Function that replaces the internal masking functionality. */
  maskAPI?: Function;

  /**
   *  The pattern to use for the mask.
   *
   * This uses the sohoPrefix otherwise the pattern interferes
   * with the pattern on form groups.
   */
  pattern?: SohoMaskPattern;

  /** The pattern options. */
  patternOptions?: SohoMaskPatternOptions;

  /** Function that is executed after the masking process is complete. */
  pipe?: Function;

  /** The placeholder text for the mask. */
  placeholderChar?: string;

  /** Indicates special formatting rules may apply to the mask. */
  process?: any;

  /** When true, the onblur event executes mask processing. */
  processOnBlur?: boolean;

  /** When true, the mask process is initially executed. */
  processOnInitialize?: boolean;

  // deprecated properties
  /**
   * Option defined in control, but not referenced.
   * @deprecated use placeholderChar instead
   */
  placeholder?: string;

  /**
   * Indicates if each section of the group pattern match must be full in order for
   * the literals in-between each section to be automatically added (meaning you can't
   * type a literal to end that group until all characters in that group are entered).
   * @deprecated not supported
   */
  groupComplete?: boolean;

  /**
   * Indicates special formatting rules may apply to the mask.
   * @deprecated use process instead
   */
  mode?: SohoMaskMode;

  /**
   * Indicates to complete the full mask or the mask will revert to empty.
   * @deprecated not supported
   */
  mustComplete?: boolean;

  /**
   * Indicates you can enter the negative symbol in front of the number;
   * automatically set to true if a negative symbol is detected inside the mask.
   * @deprecated use allowNegative instead
   */
  negative?: boolean;

  /**
   * Option defined in control, but not referenced.
   * @deprecated not supported
   */
  number?: boolean;

  /**
   * Indicates the thousands separator for numbers (based on localization) will be
   * inserted wherever necessary during typing; automatically set to true if the
   * localized thousands separator is detected inside the mask.
   * @deprecated use allowThousandsSeparator instead
   */
  thousandsSeparator?: boolean;

  /**
   * Indicates to display the localized symbol for currency or percent;
   * backwards compatible with old 'data-show-currency'; value true equates to currency
   * @deprecated use prefix or suffix instead
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
