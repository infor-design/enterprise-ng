/// <reference path="./soho-components.d.ts" />


interface SohoCheckBoxEvent {
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

interface SplitterStatic {

}

interface SohoSplitterOptions {
  axis: 'x' | 'y';
  resize: 'immediate' | 'end';
  containment: any;
}

// timepicker
type SohoTimePickerMode = 'standard' | 'range';

interface SohoTimePickerOptions {
  mode: SohoTimePickerMode;
  timeFormat: string;
  minuteInterval: number;
  roundToInterval: boolean;
}

interface SohoTimePickerEvent extends BaseJQueryEventObject {
}
interface SohoToolbarEvent extends BaseJQueryEventObject {
}

interface SohoTabsEvent extends BaseJQueryEventObject {
}

interface SohoTextareaEvent extends BaseJQueryEventObject {
}

interface SohoMenuButtonOptions {
  menu: string;
  trigger?: string;
}

interface SohoTextAreaOptions {
  characterCounter?: boolean;
  printable?: boolean;
  charRemainingText: string;
  charMaxText: string;
}

/**
 * List of valid formatters.
 */
declare var Formatters: {
  Text: any;
  Readonly: any;
  Date: any;
  Autocomplete: any;
  Lookup: any;
  Decimal: any;
  Integer: any;
  Hyperlink: any;
  Template: any;
  Drilldown: any;
  Password: any;
  TextArea: any;
  Checkbox: any;
  SelectionCheckbox: any;
  Actions: any;
  Textarea: any;
  Expander: any;
  ClassRange: any;
  Badge: any;
  Tag: any;
  Alert: any;
  Image: any;
  Color: any;
  Button: any;
  Dropdown: any;
  Favorite: any;
  Status: any;
  Tree: any
};

declare var Editors: {
  // @todo
};

/**
 * JQuery Integration
 */

interface JQueryStatic {
  splitter: SplitterStatic;
}

interface JQuery {
  mask(options?: SohoMaskOptions): JQuery;
  tabs(): JQuery;
  textarea(options?: SohoTextAreaOptions): JQuery;
  initialize(locale: string): JQuery;
  personalize(): JQuery;
  splitter(): JQuery;
  timepicker(options?: SohoTimePickerOptions): JQuery;
}

interface LocaleStatic {
  currentLocale: { name: string, data: any };

  currentCulture(): string;
  translate(key: string): string;
  calendar(): { dateFormat: any, timeFormat: string };
  set(locale: string): any;
}

declare var Locale: LocaleStatic;
