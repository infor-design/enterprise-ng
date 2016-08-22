
export interface ToolbarOptions {
  toolbarButtons: Array<SohoToolbarButtonOptions>;
}

/**
 * This is an interface mapping for programatically constructing a Toolbar.
 * This is useful when there is no template that can be used, for example
 * in the case of a header toolbar. Since the header toolbar is not in scope of
 * the component using it then we need another way of building and receiving
 * events from a toolbar.
 */
export interface SohoToolbarButtonOptions {
  // Unique identifier for this button in the toolbar.
  id?: string;
  // The text for the button.
  text?: string;
  // The icon for the button.
  icon?: string;
  // Is the button disabled
  disabled?: boolean;
  // Is the button hidden
  hidden?: boolean;
  // The href to run when clicked.
  href?: string;
  // Data to keep associated with this button.
  data: any;
  // Whether this button has a dropdown menu with menu items.
  menu?: Array<SohoToolbarButtonOptions>;
}

/**
 * Interface for the jQuery event emitted
 */
export interface ToolbarEvent {
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
