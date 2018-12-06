interface JQueryStatic {
  createIcon(options: any): string;
  createIconPath(options: any): string;
}

interface SohoUtilsExcelStatic {
  /**
   * Export the grid contents to csv
   * @param fileName The desired export filename in the download.
   * @param customDs An optional customized version of the data to use.
   * @param separator The seperator to use in the cvs file, defaults to 'sep=,'
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

interface SohoStatic {
  excel: SohoUtilsExcelStatic;
}
