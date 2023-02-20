/**
 * Soho Tabs Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery tabs control.
 */

interface SohoTabsOptions {
  /**
   * If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel
   */
  addTabButton?: boolean;

  /**
   * if defined as a function, will be used in-place of the default Tab Adding method
   */
  addTabButtonCallback?: Function;

  /**
   * If defined, replaces the default "Menu" text used in the app menu trigger.
   */
  appMenuTriggerText?: string;

  /**
   * If true, causes an app menu trigger's text content to be visually hidden (but still exists for accessiblity purposes)
   */
  appMenuTriggerTextAudible?: boolean;

  /**
   * If defined, will be used by any internal Tabs AJAX calls as the desired request settings.
   */
  ajaxOptions?: any;

  /**
   * If defined as a function, fires this before a tab is activated to allow a possible "veto" of the tab swap (SOHO-5250).
   */
  beforeActivate?: Function;

  /**
   * If set to true, will force an App Menu trigger to be present on Non-Vertical Tabs implementatations.
   */
  appMenuTrigger?: boolean;

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  containerElement?: string | HTMLElement;

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   */
  changeTabOnHashChange?: boolean;

  /**
   * If defined as a function, provides an external method for adjusting the current page hash used by these tabs
   */
  hashChangeCallback?: Function;

  /**
   * If true, when using full URLs in tab HREFs, or when using Ajax calls, tabs will be loaded as needed instead of the markup
   * all being established at once.
   */
  lazyLoad?: boolean;

  /**
   * If true, will display a tooltip or Module Tabs with cut-off text content.
   */
  moduleTabsTooltips?: boolean;

  /**
   * If true, will display a tooltip on Multi Tabs with cut-off text content.
   */
  multiTabsTooltips?: boolean;

  /**
   * If true, will display a tooltip on Multi Tabs with cut-off text content.
   */
  countsPosition?: undefined | 'top' | 'bottom';

  /**
   * If defined, will serve as a way of pulling in external content to fill tabs.
   */
  source?: Function;

  /**
   * If a source method is defined, this flexible object can be passed into the source method, and augmented with
   * parameters specific to the implementation.
   */
  sourceArguments?: Object;

  /**
   * If true, Displays a modifiable count above each tab.
   */
  tabCounts?: boolean;

  /**
   * If Vertical Tabs & true, will automatically switch to Horizontal Tabs on smaller breakpoints.
   */
  verticalResponsive?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;

  /** Sets the tabs to be sortable by drag and drop. **/
  sortable?: boolean;
}

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoTabsStatic {
  /** Options. */
  settings: SohoTabsOptions;

  updated(): void;

  add(tabId: string, options: any, atIndex: number): any;

  remove(tabId: string, disableBeforeClose?: boolean): void;

  hide(tabId: string): SohoTabsStatic;

  show(tabId: string): SohoTabsStatic;

  disableTab(tabId: number | string): SohoTabsStatic;

  enableTab(tabId: number | string): SohoTabsStatic;

  rename(tabId: string, name: string): void;

  refresh(): void;

  getTab(event: SohoTabsEvent, tabId: string): any;

  getActiveTab(): JQuery;

  getVisibleTabs(): Array<JQuery>;

  getOverflowTabs(): Array<JQuery>;

  select(href: string): void;

  disable(): void;

  enable(): void;

  activate(href: string | undefined): void;

  /** Manually refreshes the component, with an optional check to swap the component to/from responsive mode (if applicable). */
  handleResize(doResponsiveCheck?: boolean): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoTabsEvent extends JQuery.TriggeredEvent {
  tab: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  tabs: SohoTabsStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  tabs(options?: SohoTabsOptions): JQuery;
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoTabsEvent>): this;
}
