
export class SohoIconUtils {
  /**
   * Returns the RAW HTML for creating a new icon in string form
   * @param params
   * @returns {string}
   */
  static createIcon(params: any): string {
    return $.createIcon(params);
  }

  /**
   * Returns a jQuery-wrapped element containing a new icon
   * @param options
   * @returns {JQuery}
   */
  static createIconElement(options: any): JQuery {
    return $($.createIcon(options));
  }

  /**
   * Returns just the path part
   * @param options
   * @returns {any}
   */
  static createIconPath(options: any): string {
    return $.createIconPath(options);
  }
}
