/**
 * Soho Toolbar Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery toolbar control.
 */

/**
 * Toolbar options.
 */
interface SohoToolbarOptions {
  /**
   * Does the toolbar include the more button?
   */
  hasMoreButton?: boolean;

  /**
   * Total amount of buttons that can be present, not including the More button.
   * Default is 3
   */
  maxVisibleButtons?: number;

  /**
   * Will always attempt to right-align the contents of the toolbar.
   * Default is false.
   */
  rightAligned?: boolean;

  /**
   * If true, uses Javascript to size the Title and Buttonset elements in a way
   * that shows as much of the Title area as possible.
   * Default is false.
   */
  resizeContainers?: boolean;

  /**
   * If "resizeContainers" is true, setting this to true will try to display as many buttons as possible
   * while resizing the toolbar. Setting to false attempts to show the entire title instead.
   * Default is true.
   */
  favorButtonset?: boolean;

  /**
   * Notifies the jQuery component that its Searchfield's lifecycle will be managed by this Angular
   * component wrapper (invoke/destroy/updated), instead of managed by the jQuery component.  This prevents some
   * duplication of resize events, add/remove CSS classes, etc that happen due to a component repaint.
   */
  noSearchfieldReinvoke?: boolean;

  /**
   * Settings that get passed to the Toolbar.
   */
  moreMenuSettings?: SohoPopupMenuOptions;
}

/**
 * This interface represents the pub Api exposed by the
 * Soho tree control.
 */
interface SohoToolbarStatic {
  /** Control options. */
  settings: SohoToolbarOptions;

  /** Updates the control with the new settings. */
  updated(settings?: SohoToolbarOptions): void;

  /** Manually trigger a resize of the Toolbar's container elements. */
  handleResize(): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoToolbarSelectedEvent {
  /** The raw event object passed from jQuery. */
  event: JQuery.Event;

  /** The element that caused the event. */
  item: HTMLButtonElement | HTMLAnchorElement | HTMLInputElement;
}

/*
 * Extend Event/EventTarget to allow lookup of dataset property
 * https://github.com/Microsoft/TypeScript/issues/299#issuecomment-168538829
 */
interface SohoToolbarButtonEvent extends Event {
  currentTarget: SohoToolbarButtonEventTarget;
}

interface SohoToolbarButtonEventTarget extends EventTarget {
  dataset?: HTMLElement;
}

interface SohoToolbarMenuItemEvent extends SohoToolbarButtonEvent {
  data: any;
  event: SohoToolbarButtonEvent;
}

interface SohoToolbarEvent extends JQuery.Event {}

/**
 * Configuration options.
 */
interface SohoToolbarSearchFieldOptions extends SohoAutoCompleteOptions {
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
interface SohoToolbarSearchFieldStatic {
  settings: SohoToolbarSearchFieldOptions;

  updated(): void;

  /** Destructor. */
  destroy(): void;

  /** Clear */
  clear(): void;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  toolbar: SohoToolbarStatic;
  toolbarsearchfield: SohoToolbarSearchFieldStatic;
}

interface JQuery {
  toolbar(options?: SohoToolbarOptions): JQuery;
  toolbarsearchfield(options?: SohoToolbarSearchFieldOptions): JQuery;
}
