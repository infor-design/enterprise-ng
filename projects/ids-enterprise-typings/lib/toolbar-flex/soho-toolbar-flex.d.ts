/**
 * Soho Toolbar Flex Component.
 *
 * This file contains the Typescript mappings for the component's public interface.
 */

/**
 * Elements within a Toolbar Section can be these types
 */
type SohoToolbarFlexElementRef = HTMLButtonElement | HTMLAnchorElement | HTMLInputElement;

/**
 * Either an IDS Toolbar Flex Item Ref, or an Element Ref
 */
type SohoToolbarFlexItemOrElementRef = SohoToolbarFlexItemStatic | SohoToolbarFlexElementRef;

/**
 * Possible "Item" types (mostly corresponding to other IDS Component types)
 */
type SohoToolbarFlexItemType = 'button' |
  'menubutton' | 'actionbutton' | 'colorpicker' | 'hyperlink' | 'checkbox' |
  'radio' | 'searchfield' | 'toolbarsearchfield';

/**
 * Possible Component APIs that can be attached to Toolbar Flex Items (correspond to other IDS Component Interfaces)
 */
type SohoToolbarFlexItemComponentAPI = SohoPopupMenuStatic | SohoColorPickerStatic | SohoToolbarFlexSearchFieldStatic;

/**
 * Possible Component Options types
 */
type SohoToolbarFlexItemComponentOptions = SohoPopupMenuOptions | SohoColorPickerOptions | SohoToolbarFlexSearchFieldOptions;

/**
 * Toolbar Flex Item Options
 */
interface SohoToolbarFlexItemOptions {
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  componentSettings?: SohoToolbarFlexItemComponentOptions;
  allowTabs?: boolean;
}

/**
 * IDS Toolbar Flex Item API
 */
interface SohoToolbarFlexItemStatic {
  /** Identifies a corresponding element/component type of the Toolbar Flex Item */
  type: SohoToolbarFlexItemType;

  /** Provides a reference to this item's corresponding IDS Component API, if one exists. */
  componentAPI?: SohoToolbarFlexItemComponentAPI;

  /** Provides a reference to this item's parent IDS Toolbar Flex Component API */
  toolbarAPI?: SohoToolbarFlexStatic;

  /** Reference to this Toolbar Item's parent `.flex-toolbar` component element */
  toolbar: HTMLElement;

  /** Reference to this Toolbar Item's parent `.toolbar-section` container element */
  section: HTMLElement;

  /** If true, this Item is disabled */
  disabled?: boolean;

  /** If true, it's possible for this Item to become focused. */
  focusable?: boolean;

  /** If true, this item is the currently focused Toolbar Flex item */
  focused?: boolean;

  /** returns `true` if this component type is able to be configured as `readonly` */
  hasReadOnly?: boolean;

  /** (For Action Button types only) if true, this More Actions button contains
  overflowed items and will visually display the More Actions button. */
  hasNoOverflowedItems?: boolean;

  /** If true, this Item will not be visible in the main toolbar area,
  and will be spilled into the "More Actions" menu if one is available. */
  overflow?: boolean;

  /** (For input types only) If true, this item is configured to be `readonly` */
  readOnly?: boolean;

  /** If true, this item is the currently "selected" or "active" toolbar item */
  selected?: boolean;

  /** If true, this item is not hidden (by CSS class, not by overflow) */
  visible?: boolean;

  /** Programatically triggers a `selected` event on this Toolbar Flex Item for
  allowed component types (anything except colorpicker and searchfield) */
  triggerSelectedEvent(): void;

  /** Causes the Toolbar Flex Item to become visible. */
  show(): void;

  /** Causes the Toolbar Flex Item to become hidden. */
  hide(): void;

  /** Converts the current state of the toolbar item into a plain object that can
  be passed to other toolbars/component types, or used for testing. */
  toData(): any;

  /** (For action/menu button types) Renders the contents of this item's menu into a
  Popupmenu-compatible plain settings object. */
  toPopupmenuData(): any;

  /** Causes the Toolbar Flex Item to update/refresh with new settings. */
  updated(settings?: SohoToolbarFlexItemOptions): void;

  /** Tears down all event handlers and extra HTML markup. */
  teardown(): void;

  /** Completely destroys the Toolbar Flex Item component instance. */
  destroy(): void;

  /** Selected anchor in the selected event */
  selectedAnchor: JQuery;
}

/**
 * Toolbar Flex options.
 */
interface SohoToolbarFlexOptions {
  /** Allows for keyboard navigation of the Flex Toolbar using Tab/Shift+Tab */
  allowTabs?: boolean;

  /** Ajax callback for the more menu */
  beforeMoreMenuOpen?: AjaxBeforeMoreMenuOpenFunction;

  /** Shortcut settings object for passing Popupmenu settings to a Toolbar Flex More Actions Item */
  moreMenuSettings?: SohoPopupMenuOptions;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * IDS Soho Toolbar Flex API
 */
interface SohoToolbarFlexStatic {
  /** Control options. */
  settings: SohoToolbarFlexOptions;

  /** If Applicable, references to buttonset APIs on this toolbar */
  buttonsetAPIs?: Array<SohoButtonsetStatic>;

  /** If Applicable, references to buttonset section elements on this toolbar */
  buttonsets?: Array<HTMLElement>;

  /** If applicable, returns a link to the Searchfield Component's API */
  searchfieldAPI?: SohoToolbarFlexSearchFieldStatic;

  /** If true, the entire Toolbar Flex is disabled */
  disabled?: boolean;

  /** If an item is currently focused, this property will reference it and can programmatially change it */
  focusedItem?: SohoToolbarFlexItemStatic;

  /** If true, this toolbar contains items that are currently focusable.  If false, none of the items are focusable. */
  hasFocusableItems?: boolean;

  /** Contains a list of currently-invoked Toolbar Flex Items */
  readonly overflowedItems?: Array<SohoToolbarFlexItemStatic>;

  /** Returns a list of HTMLElements representing Toolbar Flex Items inside this Toolbar */
  getElements(): Array<HTMLElement>;

  /** Takes an IDS Toolbar Flex Item, or an HTMLElement with one attached, and returns the Item API
  (mostly used internally by the IDS Component) */
  getItemFromElement(element?: SohoToolbarFlexItemOrElementRef): SohoToolbarFlexItemStatic;

  /** Detects whether or not a Toolbar Flex Item is currently in "overflow" (hidden within the More Actions menu) */
  isItemOverflowed(element?: SohoToolbarFlexItemOrElementRef): boolean;

  /** Programatically navigates the Toolbar Flex. `direction` can be a positive (move right) or negative (move left) number,
  or 0 to remain in the current spot. */
  navigate(direction: Number, currentIndex?: Number, doSetFocus?: boolean): void;

  /** Renders the current state of the component */
  render(): void;

  /** Selects a Toolbar Flex Item by its Item API or HTMLElement */
  select(element?: SohoToolbarFlexItemOrElementRef): void;

  /** Converts the state of all current toolbar items into a JSON-like plain object */
  toData(): any;

  /** Converts the state of all current Toolbar items, except for Searchfields and More Actions
  menus, to a Popupmenu-friendly, JSON-like plain object */
  toPopupmenuData(): any;

  /** Updates the control with the new settings. */
  updated(settings?: SohoToolbarFlexOptions): void;

  /** Destructor */
  destroy(): void;
}

interface SohoToolbarFlexSelectedEvent {
  /** The raw event object passed from jQuery. */
  event: JQuery.TriggeredEvent;

  /** The element that caused the event. */
  item: SohoToolbarFlexItemStatic;
}

/*
 * Extend Event/EventTarget to allow lookup of dataset property
 * https://github.com/Microsoft/TypeScript/issues/299#issuecomment-168538829
 */
interface SohoToolbarFlexButtonEvent extends Event {
  currentTarget: SohoToolbarFlexButtonEventTarget;
}

interface SohoToolbarFlexButtonEventTarget extends EventTarget {
  dataset?: HTMLElement;
}

interface SohoToolbarFlexMenuItemEvent extends SohoToolbarFlexButtonEvent {
  data: any;
  event: SohoToolbarFlexButtonEvent;
}

interface SohoToolbarFlexEvent extends JQuery.TriggeredEvent { }

/**
 * Configuration options.
 */
interface SohoToolbarFlexSearchFieldOptions extends SohoSearchFieldOptions {
  /** Has an X to clear? */
  clearable?: boolean;

  /** Whether the search field can be collapsed to just a search icon or not */
  collapsible?: boolean;

  /** Whether the search field, on mobile, can be collapsed to just a search icon or not */
  collapsibleOnMobile?: boolean;
}

/**
 * Soho control seachfield api.
 */
interface SohoToolbarFlexSearchFieldStatic {
  settings: SohoToolbarSearchFieldOptions;

  updated(settings?: SohoToolbarFlexSearchFieldOptions): void;

  /** Destructor. */
  destroy(): void;

  /** Clear */
  clear(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  toolbarflex: SohoToolbarFlexStatic;
  toolbarflexsearchfield: SohoToolbarFlexSearchFieldStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  toolbarflex(options?: SohoToolbarFlexOptions): JQuery;
  toolbarflexsearchfield(options?: SohoToolbarFlexSearchFieldOptions): JQuery;
}

type AjaxBeforeMoreMenuOpenResponseFunction = (arg1: string) => void;
type AjaxBeforeMoreMenuOpenFunction = (
  response: AjaxBeforeMoreMenuOpenResponseFunction,
  options: any
) => void;
