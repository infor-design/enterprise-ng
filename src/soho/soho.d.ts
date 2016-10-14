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
interface SohoMaskEvent {
  currentTarget: HTMLElement;
  data: any;
  delegateTarget: HTMLElement;
  handleObj: Object;
  isTrigger: number;
  namespace: string;
  result: any;
  rnamespace: any;
  target: HTMLElement;
  timeStamp: number;
  type: string;
}

interface SohoTabsEvent extends BaseJQueryEventObject {
}

interface SohoTextareaEvent extends BaseJQueryEventObject {
}

interface SohoTextAreaOptions {
  characterCounter?: boolean;
  printable?: boolean;
  charRemainingText: string;
  charMaxText: string;
}

interface SohoPersonalizeOptions {
  startingColor?: string;
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
  personalize(options?: SohoPersonalizeOptions): JQuery;
  timepicker(options?: SohoTimePickerOptions): JQuery;
}

