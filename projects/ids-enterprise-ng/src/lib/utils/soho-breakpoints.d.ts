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

interface SohoStatic {
  breakpoints: SohoBreakpointsStatic;
}
