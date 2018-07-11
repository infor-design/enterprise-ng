/**
 * Locale Api exposed by Soho Controls.
 */

interface SohoLocaleData {
  language: string;
  englishName: string;
  nativeName: string;
  direction: 'left-to-right' | 'right-to-left';
  calendars: SohoLocaleCalendar[];
  currencySign: string;
  currentFormat: SohoLocaleCurencyFormat;
  numbers: any;
  messages: SohoLocaleMessage[];
}

interface SohoLocaleCurencyFormat {
  percentSign: string;
  percentFormat: string;
  minusSign: string;
  decimal: string;
  group: string;
}

interface SohoLocaleMessage {
  key: string;
  data: { id: string, value: string, comment: string };
}

interface SohoLocaleCalendar {
  name: string;
  dataFormat: any;
  days: string[];
  months: string[];
  timeFormat: string;
  dayPeriods: string[];
}

interface SohoLocaleStatic {
  cultures: any;
  culturesPath: string;
  currentLocale: { name: string, data: any };

  /**
   * Internally stores a new culture file for future use.
   *
   * @param {string} locale the 4-character Locale ID
   * @param {object} data translation data and locale-specific functions, such as calendars.
   * @returns {void}
   */
  addCulture(locale: string, data: any): void;
  calendar(): {dateFormat: any, timeFormat: string};
  cultureInHead(): boolean;
  formatDate(value: string | Date, attribs?: any): string;
  formatNumber(number: number | string, options?: any): string;

  /**
   * Get the path to the directory with the cultures
   *
   * @returns {string} path containing culture files.
   */
  getCulturesPath(): string;
  isRTL(): boolean;
  numbers(): any;
  parseDate(dateString: string, dateFormat?: string, isStrict?: boolean): Date;
  parseNumber(input: string): number;
  set(locale: string): any;
  setCurrentLocale(name: string, data: any): void;

  /**
   * Overridable culture messages
   *
   * @param {string} key  The key to search for on the string.
   * @param {boolean} [showAsUndefined] causes a translated phrase to be
    instead of defaulting to the default locale's version of the string.
   * @returns {string|undefined} a translated string, or nothing, depending on configuration
   */
  translate(key: string, showAsUndefined?: string): string;

  /**
   * Translate Day Period
   * @param {string} period should be "am", "pm", "AM", "PM", or "i"
   * @returns {string} the translated day period.
   */
  translateDayPeriod(period: string): string;
}

interface SohoStatic {
  Locale: SohoLocaleStatic;
}

interface JQuery {
  initialize(locale: string): JQuery;
}
