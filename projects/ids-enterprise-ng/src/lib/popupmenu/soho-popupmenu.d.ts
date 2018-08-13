/**
 * Soho PopupMenu Menu.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery popupmenu control.
 */

/**
 * Trigger types.
 */
type SohoPopupMenuTrigger = 'click' | 'rightClick' | 'immediate';

/**
 * Soho Popup Menu options.
 */
interface SohoPopupMenuOptions {
  /** id (or jQuery object) of associated drop down list. */
  menu?: string | JQuery;

  /** 'click' | 'rightClick' | 'immediate' */
  trigger?: SohoPopupMenuTrigger; // @todo

  /** Auto Focus */
  autoFocus?: boolean;

  /** Mouse focus. */
  mouseFocus?: boolean;

  /** Attach to body. */
  attachToBody?: boolean;

  /** beforeOpen - ajax callback for open event */
  beforeOpen?: SohoPopupMenuSourceFunction;

  /** Switches aria to use listbox construct instead of menu construct (internal). */
  ariaListbox?: boolean;

  /** Can pass in the event object so you can do a right click with immediate */
  eventObj?: any;

  /** If true you can explicitly set an arrow on the menu. */
  showArrow?: boolean;

  /** If set to false, focus will not be returned to the calling element. It usually should be for accessibility purposes. */
  returnFocus?: boolean;

  /** By default, menus open up underneath their target element.
    Set this to true to use mouse coordinates for positioning a menu inside of its target element. */
  useCoordsForClick?: boolean;

  placementOpts?: SohoPopupmenuPlacementOpts;

  offset?: SohoPopupmenuOffset;
}

/**
 * Interface for the jQuery event emitted
 */
interface SohoPopupMenuEvent {
  e: JQuery.Event;
  /**
   * the relevant element for the given event
   */
  args: JQuery;
}

interface SohoPopupMenuStatic {

  /** Configuration options. */
  settings?: SohoPopupMenuOptions;

  /** Returns the selected html element. */
  getSelected(): any;

  /** Updates the control to reflect the settings. */
  updated(object?: SohoPopupMenuOptions): void;

  /** Tear down the markup for the control */
  teardown(): void;

  /** Closes the popup menu control */

   close(isCancelled?: boolean, noFocus?: boolean): void;

  /** Destroy the markup and any other resources. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  popupmenu: SohoPopupMenuStatic;
}

interface JQuery {
  popupmenu(options?: SohoPopupMenuOptions): JQuery;
}

interface SohoPopupmenuOffset {
  x: number;
  y: number;
}

interface SohoPopupmenuPlacementOpts {
  containerOffsetX: number;
  containerOffsetY: number;
  strategies: Array<string>;
}

/**
 * Function prototype for the source function.
 */
type SohoPopupMenuSourceFunction = (
  response: SohoPopupMenuResponseFunction,
  options: any
) => void;

/**
 * Function prototype for the response function.
 */
type SohoPopupMenuResponseFunction = (
  data: any
) => void;
