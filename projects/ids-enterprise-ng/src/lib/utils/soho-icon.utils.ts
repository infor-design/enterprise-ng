export class SohoIconUtils {
  /**
   * Returns the RAW HTML for creating a new icon in string form
   */
  static createIcon(params: any): string {
    return $.createIcon(params);
  }

  /**
   * Returns a jQuery-wrapped element containing a new icon
   */
  static createIconElement(options: any): JQuery {
    return $($.createIcon(options));
  }

  /**
   * Returns just the path part
   */
  static createIconPath(options: any): string {
    return $.createIconPath(options);
  }
}
