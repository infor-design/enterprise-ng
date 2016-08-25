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
  currentCulture(): string;
  translate(key: string): string;
  calendar(): string;
  set(locale:string):any;
}

declare var Locale: LocaleStatic;
