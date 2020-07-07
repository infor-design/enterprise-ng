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
type SohoBreadcrumbRef = SohoBreadcrumbItemStatic | HTMLAnchorElement | Number;

/**
 * Breadcrumb Item Options
 */
interface SohoBreadcrumbItemOptions {
  /** Optional existing element.  Settings can be scraped from this element */
  element?: HTMLLIElement;

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
  callback(api: SohoBreadcrumbItemStatic, e?: any, ...args: []): boolean;
}

/**
 * Breadcrumb List Options
 */
interface SohoBreadcrumbOptions {

  /* Rendering Style */
  style: SohoBreadcrumbOptionsStyle;

  /* Object-based breadcrumb items */
  breadcrumbs?: SohoBreadcrumbItemOptions[];
}

/**
 * IDS Enterprise Breadcrumb Item API
 */
interface SohoBreadcrumbItemStatic {
  settings?: SohoBreadcrumbItemOptions;

  element: HTMLLIElement;

  /**
   If a callback setting is provided, this method can be called
   to programmatically trigger the callback.
   */
  callback(e?: SohoBreadcrumbEvent, ...args: any[]): boolean;
}

/**
 * IDS Enterprise Breadcrumb API
 */
interface SohoBreadcrumbStatic {
  /** internal settings */
  settings?: SohoBreadcrumbOptions;

  /** Associated HTML Element */
  element: HTMLElement;

  /** Internal list of invoked IDS Breadcrumb Item APIs */
  breadcrumbs: SohoBreadcrumbItemStatic[];

  /** Destroys any resources held by the breadcrumb list*/
  destroy(doRemove?: boolean): void;

  disable(): void;

  enable(): void;

  add(settings?: SohoBreadcrumbItemOptions, doRender?: boolean): void;

  remove(item: SohoBreadcrumbRef, doRender?: boolean): void;

  /** Sets a breadcrumb in the row as the "current" one (bold styling) */
  makeCurrent(item: SohoBreadcrumbRef): void;

  /** Returns an object containing anchor, index, and API of a specified breadcrumb item */
  getBreadcrumbItemAPI(item: SohoBreadcrumbRef): Object;

  /** */
  updated(settings?: SohoBreadcrumbOptions): void;
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
