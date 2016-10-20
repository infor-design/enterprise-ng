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
  currentLocale: { name: string, data: any };

  currentCulture(): string;

  translate(key: string): string;

  calendar(): { dateFormat: any, timeFormat: string };

  set(locale: string): any;

  addCulture(locale: string, data: any);
}

declare var Locale: SohoLocaleStatic;

interface JQuery {
  initialize(locale: string): JQuery;
}
