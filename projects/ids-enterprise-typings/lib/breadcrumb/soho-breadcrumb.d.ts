/**
 * Soho Breadcrumb Typings
 *
 * The Breadcrumb component is a navigational component that provides
 * quick access to a nested page structure's top-level elements.
 */

/**
 * Rendering styles for the Breadcrumb list.
 * "Alternate" is a different, inverted color scheme.
 */
type SohoBreadcrumbOptionsStyle = 'default' | 'alternate';

/**
 * Interacting with some Breadcrumb list methods can be done directly
 * with a mixed argument, which can be an IDS Breadcrumb Item API,
 * a breadcrumb item's anchor, or a number representing the current index of a breadcrumb item within the list.
 */
type SohoBreadcrumbRef = SohoBreadcrumbItemStatic | HTMLLIElement | HTMLAnchorElement | Number;

/**
 * Function prototype for the IDS Breadcrumb Item's optional `callback` property.
 */
type SohoBreadcrumbItemCallbackFunction = (
  e?: any,
  ...args: any[]
) => boolean;

/**
 * IDS Breadcrumb Item Options
 */
interface SohoBreadcrumbItemOptions extends Object {

  /** Breadcrumb Text/HTML Contents */
  content: string;

  /** "Current" styling toggle */
  current?: boolean;

  /** Disable/Enable toggle */
  disabled?: boolean;

  /** Populates the anchor tag's `href` attribute with this value */
  href?: string | undefined;

  /** Gives the anchor tag an `id` attribute containing this value */
  id?: string | undefined;

  /** If defined, this callback is activated when a breadcrumb item is clicked */
  callback?: SohoBreadcrumbItemCallbackFunction;
}

/**
 * IDS Breadcrumb List Options
 */
interface SohoBreadcrumbOptions extends Object {
  /* Rendering Style */
  style: SohoBreadcrumbOptionsStyle;

  settings?: SohoBreadcrumbItemOptions;

  /* Object-based breadcrumb items */
  breadcrumbs?: SohoBreadcrumbItemOptions[];

  /* Add truncatling behavior when a lot of items */
  truncate?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * IDS Enterprise Breadcrumb Item API
 */
interface SohoBreadcrumbItemStatic {
  /** Internal Settings */
  settings?: SohoBreadcrumbItemOptions;

  /** The HTML List Item element that represents this breadcrumb item */
  element: HTMLLIElement;

  /** Returns `true` if the breadcrumb item is disabled */
  disabled?: boolean;

  /** Returns `true` if the breadcrumb item is marked as "current" */
  current?: boolean;

  /**
   If a callback setting is provided to this breadcrumb item, this method
   can be called to programmatically trigger the callback.
   */
  callback(e?: SohoBreadcrumbEvent, ...args: any[]): boolean;

  /** Disables this breadcrumb item */
  disable(): void;

  /** Enables this breadcrumb item */
  enable(): void;

  /** Refreshes the current state of this breadcrumb item */
  refresh(): void;

  /** Destroys this breadcrumb item */
  destroy(doRemove?: boolean): void;
}

/**
 * IDS Enterprise Breadcrumb API
 */
interface SohoBreadcrumbStatic {
  /** internal settings */
  settings?: SohoBreadcrumbOptions;

  /** Internal list of invoked IDS Breadcrumb Item APIs */
  breadcrumbs: SohoBreadcrumbItemStatic[];

  /** Returns `true` if the breadcrumb list is disabled */
  disabled?: boolean;

  /** Destroys any resources held by the breadcrumb list*/
  destroy(doRemove?: boolean): void;

  /** Disables the entire breadcrumb list */
  disable(): void;

  /** Enables the entire breadcrumb list */
  enable(): void;

  /** Adds a single breadcrumb item to the list */
  add(settings?: SohoBreadcrumbItemOptions, doRender?: boolean): void;

  /** Removes an existing breadcrumb item from the list */
  remove(item: SohoBreadcrumbRef, doRender?: boolean): void;

  /** Removes all breadcrumb items from the list */
  removeAll(doRender?: boolean): void;

  /** Sets a breadcrumb in the row as the "current" one (bold styling) */
  makeCurrent(item: SohoBreadcrumbRef): void;

  /** Returns an object containing anchor, index, and API of a specified breadcrumb item */
  getBreadcrumbItemAPI(item: SohoBreadcrumbRef): SohoBreadcrumbTargetObject;

  /** Updates the breadcrumb list with new settings */
  updated(settings?: SohoBreadcrumbOptions): void;
}

/**
 * IDS Enterprise Breadcrumb Target Object
 * Some internal methods in the IDS Enterprise API return this Object, which
 * contains references to the Breadcrumb Item's list item, API, and index within the
 * Breadcrumb list.
 */
interface SohoBreadcrumbTargetObject {
  li?: HTMLLIElement;
  api?: SohoBreadcrumbItemStatic;
  index?: Number;
}

/**
 * jQuery integration
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  breadcrumb(options?: SohoBreadcrumbOptions): JQuery;
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoBreadcrumbEvent>): this;
}

interface SohoBreadcrumbEvent extends JQuery.TriggeredEvent {
  anchor: HTMLAnchorElement;
}
