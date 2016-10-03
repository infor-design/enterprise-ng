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

// datepicker
type SohoDatePickerDateMode = 'standard' | 'range';
interface SohoDatePickerOptions {
  showTime: boolean;
  timeFormat: string;
  minuteInterval: number;
  mode: SohoDatePickerDateMode;
  roundToInterval: number;
  timepickerMarkup: string;
  dateFormat: string;
  placeholder: boolean;
  disable: any;
}
interface SohoDatePickerEvent {
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
interface SohoTimePickerEvent {
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

interface SohoTextareaEvent {
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

interface SohoTextAreaOptions {
  characterCounter?: boolean;
  printable?: boolean;
  charRemainingText: string;
  charMaxText: string;
}

interface SohoPersonalizeOptions {
  startingColor?: string;
}

interface SohoEditorOptions {
  buttons?: {
    editor: Object,
    source: Object
  };
  delay?: number;
  firstHeader?: string;
  secondHeader?: string;
  placeholder: string;
  anchor: string;
  image: string;
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
 * Modal Dialog options
 *
 * See the jQuery control for the defaults.
 */
interface SohoModalOptions {
  // The string used as the title for the dialog - not defaulted.
  title?: string;

  // The content, can be 'html' or a selector.
  content?: JQuery;

  // Style
  cssClass?: string;

  // The standard button to create.
  buttons?: SohoModalButton[];

  // Is this dialog searchable?
  searchable?: boolean;

  // When to close?
  trigger?: 'click' | 'immediate' | 'manual';

  /** Is this an alert daialog? */
  isAlert?: boolean;

  /** Auto focus? */
  autoFocus?: boolean;

  /** Identifier for the dialog. */
  id?: string;

  // Extra frame height.
  frameHeight?: number;
}

interface SohoModalButton {
  /** Text for the button. */
  text: string;

  validate?: boolean;

  /** Is this the default button? */
  isDefault?: boolean;

  /** Icon for the button. */
  icon?: string;

  /** Click handler. */
  click?: SohoModalButtonClickFunction;
}

type SohoModalButtonClickFunction = (
  e: any,
  model: ModalStatic) => void;

interface ModalStatic {
  /** Current Settings */
  settings: SohoModalOptions;

  /** Managed element. */
  element: JQuery;

  /** Closes the modal dialog. */
  close(destroy?: boolean): void;

  /** Releases all resources managed by the modal. */
  destroy(): void;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  applicationmenu: ApplicationMenuStatic;
  toast: ToastStatic;
  busyindicator: BusyIndicatorStatic;
  modal: ModalStatic;
  splitter: SplitterStatic;
}

interface JQuery {
  applicationmenu(options?: SohoApplicationMenuOptions): JQuery;
  toast(options?: SohoToastOptions): JQuery;
  busyindicator(options?: SohoBusyIndicatorOptions): JQuery;
  editor(options?: SohoEditorOptions): JQuery;
  mask(options?: SohoMaskOptions): JQuery;
  modal(options: SohoModalOptions): JQuery;
  tabs(): JQuery;
  textarea(options?: SohoTextAreaOptions): JQuery;
  initialize(locale: string): JQuery;
  personalize(options?: SohoPersonalizeOptions): JQuery;
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
