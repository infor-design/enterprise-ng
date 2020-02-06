/**
 * Soho Toolbar Flex Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery toolbar control.
 */

/**
 * Toolbar Flex options.
 */
interface SohoToolbarFlexOptions {
  /**
   * Ajax callback for the more menu
   */
  beforeMoreMenuOpen?: AjaxBeforeMoreMenuOpenFunction;
}

/**
 * This interface represents the pub Api exposed by the
 * Soho tree control.
 */
interface SohoToolbarFlexStatic {
  /** Control options. */
  settings: SohoToolbarFlexOptions;

  /** Updates the control with the new settings. */
  updated(settings?: SohoToolbarFlexOptions): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoToolbarFlexSelectedEvent {
  /** The raw event object passed from jQuery. */
  event: JQuery.TriggeredEvent;

  /** The element that caused the event. */
  item: HTMLButtonElement | HTMLAnchorElement | HTMLInputElement;
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

interface SohoToolbarFlexEvent extends JQuery.TriggeredEvent {}

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
