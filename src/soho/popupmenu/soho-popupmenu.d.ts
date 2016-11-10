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
  beforeOpen?: any;

  /** Switches aria to use listbox construct instead of menu construct (internal). */
  // ariaListbox?: boolean;

  /**
   * By default, menus open up underneath their target element.  Set this to true to
   * use mouse coordinates for positioning a menu inside of its target element.
   */
  useCoordsForClick?: boolean;

  /** Can pass in the event object so you can do a right click with immediate */
  eventObj?: any;
}

/**
 * Interface for the jQuery event emitted
 *
 * @deprecated
 */
interface SohoPopupMenuEvent extends JQueryEventObject {
}

/**
 * Interface for the jQuery event emitted
 */
interface SohoContextMenuEvent extends SohoPopupMenuEvent {
}

interface SohoPopupMenuStatic {

  /** Configuration options. */
  settings?: SohoPopupMenuOptions;

  /** Returns the selecyed html element. */
  getSelected(): any;

  /** Updates the control to reflect the settings. */
  updated(): void;

  /** Tear down. */
  teardown(): void;

  /** Destroy the markup and any other resources.  */
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
