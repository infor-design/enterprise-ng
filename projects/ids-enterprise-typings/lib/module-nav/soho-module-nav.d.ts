/// <reference path='./soho-module-nav-common.d.ts' />
/// <reference path='../accordion/soho-accordion.d.ts' />

interface SohoModuleNavDisplayModeChangeEvent {
  e: JQuery.TriggeredEvent,
  val: SohoModuleNavDisplayMode
}

/** Defines options present in the Soho Module Nav */
interface SohoModuleNavOptions {
  accordionSettings?: SohoAccordionOptions;
  displayMode?: SohoModuleNavDisplayMode;
  enableOutsideClick?: boolean;
  filterable?: boolean;
  initChildren?: boolean;
  pinSections?: boolean;
  showDetailView?: boolean;
}

/** Public API for Soho Module Nav JS component */
interface SohoModuleNavStatic {
  /** Module Nav's current settings */
  settings: SohoModuleNavOptions;

  /** Reference to element representing accordion, if one is available */
  accordionEl?: HTMLElement;

  /** Reference to a Soho Accordion API, if one is available */
  accordionAPI?: SohoAccordionStatic;

  /** Reference to element representing searchfield, if one is available */
  searchEl?: HTMLElement;

  /** Reference to a Soho SearchField API, if one is available */
  searchAPI?: SohoSearchFieldStatic;

  /** Reference to element representing settings button, if one is available */
  settingsEl?: HTMLElement;

  /** Reference to a Soho Module Nav Settings API, if one is available */
  settingAPI?: SohoModuleNavSettingsStatic;

  /** Reference to a Soho Module Nav Switcher container element, if one is available */
  switcherEl?: HTMLElement;

  /** Reference to a Soho Module Nav Settings API, if one is available */
  switcherAPI?: SohoModuleNavSwitcherStatic;

  /** Misc. references to specific sections/elements */
  containerEl?: HTMLElement;
  detailViewEl?: HTMLElement;
  itemMenuEl?: HTMLElement;
  footerEl?: HTMLElement;

  /** Initializes the jQuery component */
  init(): void;

  /** Changes the Module Nav's Display Mode */
  setDisplayMode(val?: SohoModuleNavDisplayMode): void;

  /** Enables (true)/Disables (false) optional pinning of header/footer Module Nav regions */
  setPinSections(val?: boolean): void;

  /** Updates accordion section scroll state based on size changes */
  setScrollable(): void;

  /** Enables (true)/Disables (false) visibility of detail view pane used for sub modules */
  setShowDetailView(val: boolean): void;

  /** Tear down the markup for the control */
  teardown(): void;

  /** Updates the Module Nav with any new settings */
  updated(newSettings?: SohoModuleNavOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

/** jQuery interface for Module Nav */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  modulenav(options?: SohoModuleNavOptions): JQuery;
  on(events: 'updated', handler: JQuery.EventHandlerBase<any, SohoModuleNavOptions>): this;
}
