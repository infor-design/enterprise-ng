/// <reference path="./soho-components.d.ts" />

// mask
type SohoMaskMode = 'group' | 'number' | 'date' | 'time';

type SohoMaskShowSymbol = boolean | 'currency' | 'percent';

interface SohoMaskOptions {
  pattern: string;
  placeholder: string;
  definitions: any;
  groupComplete: boolean;
  mode: SohoMaskMode;
  mustComplete: boolean;
  negative: boolean;
  number: boolean;
  processOnInitialize: boolean;
  thousandsSeparator: boolean;
  showSymbol: SohoMaskShowSymbol;
}

interface SohoMaskEvent extends JQueryEventObject {
}

interface SohoTabsEvent extends JQueryEventObject {
}

interface SohoTextareaEvent extends JQueryEventObject {
}

interface SohoTextAreaOptions {
  characterCounter?: boolean;
  printable?: boolean;
  charRemainingText: string;
  charMaxText: string;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
}

interface JQuery {
  mask(options?: SohoMaskOptions): JQuery;
  tabs(): JQuery;
  textarea(options?: SohoTextAreaOptions): JQuery;
  initialize(locale: string): JQuery;
  timepicker(options?: SohoTimePickerOptions): JQuery;
}

