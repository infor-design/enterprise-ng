/**
 * Locale Api exposed by Soho Controls.
 */

interface SohoLocaleData {
  calendars: SohoLocaleCalendar[];
  currentFormat: SohoLocaleCurrencyFormat;
  currencySign: string;
  direction: string;
  englishName: string;
  nativeName: string;
  language: string;
  messages: SohoLocaleMessages;
  name: string;
  numbers: SohoLocaleNumberData;
}

interface SohoCurrentLocale {
  dataName: string;
  name: string;
  data?: SohoLocaleData;
}

interface SohoLanguageData {
  name: string;
  englishName: string;
  nativeName: string;
  direction: 'left-to-right' | 'right-to-left';
  messages: SohoLocaleMessages;
}

interface SohoLocaleCurrencyFormat {
  percentSign: string;
  percentFormat: string;
  minusSign: string;
  decimal: string;
  group: string;
  groupSizes: [3, 3];
}

interface SohoLocaleNumberData {
  decimal: string;
  group: string;
  groupSizes: [3, 3];
  minusSign: string;
  percentFormat: string;
  percentPrefix: string;
  percentSign: string;
  percentSuffix: string;
}

interface SohoLocaleMessage {
  id: string;
  value: string;
  comment?: string;
}

interface SohoLocaleMessages {
  [id: string]: SohoLocaleMessage;
}

interface SohoLocaleCalendar {
  name: string;
  dateFormat: any;
  days: string[];
  months: string[];
  timeFormat: string;
  dayPeriods: string[];
  firstDayofWeek: number;
}

interface SohoLocaleParseDateOptions {
  dateFormat?: string;
  pattern?: string;
  locale?: string;
  calendarName?: string;
}

interface SohoLocaleStatic {
  cultures: any;
  culturesPath: string;
  currentLocale: SohoCurrentLocale;
  currentLanguage: SohoLanguageData;
  languages: any;
  defaultLocales: any;
  supportedLocales: any;
  defaultLocale: string;

  /**
   * Internally stores a new culture file for future use.
   * @param locale the 4-character Locale ID
   * @param data translation data and locale-specific functions, such as calendars.
   */
  addCulture(locale: string, data: any): void;
  calendar(locale?: string, name?: string): SohoLocaleCalendar;
  cultureInHead(): boolean;
  formatDate(value: string | Date, attribs?: any): string;
  formatNumber(number: number | string, attribs?: any): string;
  getTimeZone(date: Date, timeZoneName?: string): string;
  dateToTimeZone(date: Date, timeZone?: string, timeZoneName?: string): Date;
  dateToUTC(date: Date): Date;
  toLocaleString(number: number, locale: string, options?: any): string;
  convertNumberToEnglish(string: string): number;
  isValidDate(date: Date): boolean;

  /**
   * Get the path to the directory with the cultures
   * @returns path containing culture files.
   */
  getCulturesPath(): string;
  isRTL(): boolean;
  numbers(): SohoLocaleNumberData;
  parseDate(dateString: string, dateFormat?: string | SohoLocaleParseDateOptions, isStrict?: boolean): Date;
  parseNumber(input: string): number;
  set(locale: string): any;
  getLocale(locale: string, filename?: string): any;
  setLanguage(language: string): any;

  /**
   * Overridable culture messages
   * @param key  The key to search for on the string.
   * @param  [options|string] A list of options, supported are a non default locale
   * and showAsUndefined which causes a translated phrase to be shown in square brackets
   * instead of defaulting to the default locale's version of the string.
   * For backwards compatiblity sending in true or false will set showAsUndefined.
   * @return  a translated string, or nothing, depending on configuration
   */
  translate(key: string, options?: any): string;

  /**
   * Add an object full of translations to the given language.
   */
  extendTranslations(language: string, messages?: any): void;

  /**
   * Translate Day Period
   * @param period should be "am", "pm", "AM", "PM", or "i"
   * @returns the translated day period.
   */
  translateDayPeriod(period: string): string;
}

interface SohoStatic {
  Locale: SohoLocaleStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  initialize(locale: string): JQuery;
}
