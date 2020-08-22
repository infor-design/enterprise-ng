interface JQueryStatic {
  createIcon(options: any): string;
  createIconPath(options: any): string;
}

interface SohoUtilsExcelStatic {
  /**
   * Export the grid contents to csv
   * @param fileName The desired export filename in the download.
   * @param customDs An optional customized version of the data to use.
   * @param separator The separator to use in the cvs file, defaults to 'sep=,'
   * @param self The grid api to use (if customDs is not used)
   * @returns void
   */
  exportToCsv(fileName?: string, customDs?: any, separator?: string, self?: any): void;

  /**
   * Export the grid contents to xls format. This may give a warning when opening the file.
   * exportToCsv may be prefered.
   * @param fileName The desired export filename in the download.
   * @param worksheetName A name to give the excel worksheet tab.
   * @param customDs An optional customized version of the data to use.
   * @param self The grid api if customDS is not used
   * @returns void
   */
  exportToExcel(fileName?: string, worksheetName?: string, customDs?: any, self?: any): void;
}

interface SohoUtilsStatic {
  /**
   * Merges various sets of options into a single object,
   * whose intention is to be set as options on a Soho component.
   * @private
   * @param {HTMLElement|SVGElement|jQuery[]} [element] the element to process for inline-settings
   * @param {Object|function} incomingOptions desired settings
   * @param {Object|function} [defaultOptions] optional base settings
   * @returns {object} processed settings
   */
  mergeSettings(element: HTMLElement|SVGElement|JQuery[],
    incomingOptions: Object|Function,
    defaultOptions: Object|Function): Object;
}

interface SohoUtilsKeyboard {
  pressedKeys: Map<String, boolean>;
}

interface SohoStatic {
  excel: SohoUtilsExcelStatic;
  keyboard: SohoUtilsKeyboard;
  utils: SohoUtilsStatic;

  /**
   * Check if given element is within the viewport.
   * @param {object} element The element to check
   * @returns {boolean} whether or not the element is in the viewport.
   */
  isInViewport(element: HTMLElement): boolean;
}
