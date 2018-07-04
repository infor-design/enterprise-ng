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
  addCulture(locale: string, data: any): void;
  calendar(): {dateFormat: any, timeFormat: string};
  cultureInHead(): boolean;
  formatDate(value: string | Date, attribs: any): string;
  formatNumber(number: number | string, options: any): string;
  getCulturesPath(): string;
  isRTL(): boolean;
  numbers(): any;
  parseDate(dateString: string, dateFormat?: string, isStrict?: boolean): Date;
  parseNumber(input: string): number;
  set(locale: string): any;
  setCurrentLocale(name: string, data: any): void;
  translate(key: string): string;
  translateDayPeriod(period: string): string;
}

declare var Locale: SohoLocaleStatic;

interface JQuery {
  initialize(locale: string): JQuery;
}
