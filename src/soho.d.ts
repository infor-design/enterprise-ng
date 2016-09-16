interface SohoToastOptions {
  title: string;
  message: string;
  position?: 'top right' | 'top left' | 'bottom left' | 'bottom right';
  audibleOnly?: boolean;
  progressBar?: boolean;
  timeout?: number;
}

interface ToastStatic {
  show: () => void;
}

interface SohoApplicationMenuOptions {
  breakpoint: 'phablet' | 'tablet' | 'desktop' | 'large';
  openOnLarge: boolean;
  triggers: any[];
}

interface ApplicationMenuStatic {
  openMenu: (noFocus?: boolean) => void;
  closeMenu: () => void;
  modifyTriggers: (triggers: any[], remove: boolean, norebuild: boolean) => void;
}

interface SohoBusyIndicatorOptions {
  blockUI?: boolean;
  text: string;
  delay: number;
  timeToComplete: number;
  timeToClose: number;
}

interface BusyIndicatorStatic {
  activate: () => void;
  close: () => void;
}

interface SplitterStatic {

}

interface SohoSplitterOptions {
  axis: 'x' | 'y';
  resize: 'immediate' | 'end';
  containment: any;
}

interface SohoToolbarEvent {
  currentTarget: HTMLElement;
  item: any;
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

interface SohoTabsEvent {
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

interface SohoMenuButtonOptions {
  menu: string;
  trigger?: string;
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

interface JQueryStatic {
  applicationmenu: ApplicationMenuStatic;
  toast: ToastStatic;
  busyindicator: BusyIndicatorStatic;
  splitter: SplitterStatic;
}

interface JQuery {
  applicationmenu(options?: SohoApplicationMenuOptions): JQuery;
  toast(options?: SohoToastOptions): JQuery;
  busyindicator(options?: SohoBusyIndicatorOptions): JQuery;
  tabs(): JQuery;
  initialize(locale: string): JQuery;
  personalize(): JQuery;
  splitter(): JQuery;
}

interface LocaleStatic {
  currentLocale: { name: string, data: any };

  currentCulture(): string;
  translate(key: string): string;
  calendar(): {dateFormat: any, timeFormat: string};
  set(locale: string): any;
}

declare var Locale: LocaleStatic;
