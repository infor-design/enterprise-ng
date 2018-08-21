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
  addTabButton: boolean;

  /**
   * if defined as a function, will be used in-place of the default Tab Adding method
   */
  addTabButtonCallback: Function;

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  containerElement: string | HTMLElement;

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   */
  changeTabOnHashChange: boolean;

  /**
   * If defined as a function, provides an external method for adjusting the current page hash used by these tabs
   */
  hashChangeCallback: Function;

  /**
   * If true, Displays a modifiable count above each tab.
   */
  tabCounts: boolean;

  /**
   * If Vertical Tabs & true, will automatically switch to Horizontal Tabs on smaller breakpoints.
   */
  verticalResponsive: boolean;
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

  disableTab(tabId: number): SohoTabsStatic;

  enableTab(tabId: number): SohoTabsStatic;

  rename(tabId: string, name: string): void;

  getTab(event: SohoTabsEvent, tabId: string): any;

  getActiveTab(): JQuery;

  getVisibleTabs(): Array<JQuery>;

  getOverflowTabs(): Array<JQuery>;

  select(href: string): void;

  disable(): void;

  enable(): void;

  handleResize(): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoTabsEvent extends JQuery.Event {
  tab: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  tabs: SohoTabsStatic;
}

interface JQuery<TElement extends Node = HTMLElement> {
  tabs(options?: SohoTabsOptions): JQuery;
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoTabsEvent>): this;
}
