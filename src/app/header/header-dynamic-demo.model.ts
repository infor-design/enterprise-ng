
export interface HeaderDynamicToolbarOptions {
  toolbarButtons: Array<HeaderDynamicButtonOptions>;
}

export interface ToolbarSearchField {
  id: string;
  label: string;
  value: string;
  collapsible: boolean;
}

/**
 * This is an interface mapping for programatically constructing a Toolbar.
 * This is useful when there is no template that can be used, for example
 * in the case of a header toolbar. Since the header toolbar is not in scope of
 * the component using it then we need another way of building and receiving
 * events from a toolbar.
 */
export interface HeaderDynamicButtonOptions {
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
  menu?: Array<HeaderDynamicButtonOptions>;
}

export interface HeaderDynamicTabsetOptions {
  tabs: Array<HeaderDynamicTabOptions>;
  containerElementSelector?: string;
}

/**
 * This is an interface mapping for programatically constructing a Toolbar.
 * This is useful when there is no template that can be used, for example
 * in the case of a header toolbar. Since the header toolbar is not in scope of
 * the component using it then we need another way of building and receiving
 * events from a toolbar.
 */
export interface HeaderDynamicTabOptions {
  // Unique identifier for this button in the toolbar.
  id?: string;
  // The text for the button.
  title?: string;
  // The icon for the button.
  content?: string;
  // Is the button disabled
  disabled?: boolean;
  // Is the button hidden
  hidden?: boolean;
}
