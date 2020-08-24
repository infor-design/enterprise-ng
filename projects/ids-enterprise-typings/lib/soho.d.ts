interface SohoStatic {
  renderLoop: SohoRenderLoop;
  breakpoints: SohoBreakpointsStatic;
  Validation: SohoValidationRules;
  theme: SohoThemeStatic;
}

interface SohoConfig {
  renderLoop: SohoConfigRenderLoop;
}

interface SohoValidationRules {
  rules: object;
  ValidationTypes: Array<object>;
}

interface SohoRenderLoop {
  start: Function;
  stop: Function;
  register: Function;
  unregister: Function;
}

interface SohoConfigRenderLoop {
  noAutoStart: boolean;
}

/**
 * Breakpoint Api exposed by Soho Controls.
 */
interface SohoBreakpointsStatic {
  'phone': number;
  'slim': number;
  'phablet': number;
  'phone-to-tablet': number;
  'wide-tablet': number;
  'tablet-to-desktop': number;
  'desktop': number;
  'desktop-to-extralarge': number;

  /**
   * Get the name of the current CSS breakpoint by checking the populated 'content' value of the
   * <body> tag's `::after` pseudo-element.  These names should be reflected in the breakpoints object
   * above.
   * @returns {string} name of the current breakpoint
   */
  current: () => string;

  /**
   * @param {string} breakpoint matches one of the entries in the "Soho.breakpoints" object.
   * @returns {boolean} whether or not the window is currently wider than the breakpoint provided.
   */
  isAbove: (breakpoint: string) => boolean;

  /**
   * @param {string} breakpoint matches one of the entries in the "Soho.breakpoints" object.
   * @returns {boolean} whether or not the window is currently more narrow
   *  than the breakpoint provided.
   */
  isBelow: (breakpoint: string) => boolean;
}

interface SohoTheme {
  id: string;
  name: string;
}

type SohoPersonalizationColors = { [key: string]: SohoPersonalizationColor };

interface SohoPersonalizationColor {
  id: string; // id of the color
  name: string; // human readable name of the color
  value: string; // hex value of the color
  backgroundColorClass: string; // class that sets the background color of an element
}

interface SohoThemeStatic {
  /**
   * The theme currently set
   */
  currentTheme: SohoTheme;

  /**
   * Return a list of all the available themes.
   * @returns {array} The list of themes.
   */
  themes: () => SohoTheme[];

  /**
   * Return the colors used in the current theme that are recommended for personalization.
   * @returns {object} An object full of the colors with id, name, and hex value.
   */
  personalizationColors: () => SohoPersonalizationColors;

  /**
   * Set the current application theme.
   * @param {string} themeId The id of the theme.
   * @returns {Theme} the theme object just set as the theme.
   */
  setTheme: (themeId: string) => SohoTheme;
}

declare var Soho: SohoStatic;
declare var SohoConfig: SohoConfig;
