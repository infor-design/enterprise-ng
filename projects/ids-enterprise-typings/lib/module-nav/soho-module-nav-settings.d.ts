/// <reference path='./soho-module-nav-common.d.ts' />
/// <reference path='../accordion/soho-accordion.d.ts' />
/// <reference path='../popupmenu/soho-popupmenu.d.ts' />

/** Defines options present in the Soho Module Nav Settings */
interface SohoModuleNavSettingsOptions {
  displayMode?: SohoModuleNavDisplayMode;
}

/** Public API for Soho Module Nav Settings JS component */
interface SohoModuleNavSettingsStatic {
  /** Module Nav Switcher's current settings */
  settings: SohoModuleNavSettingsOptions;

  /** Reference to jQuery-wrapped HTML Element representing the Soho Accordion */
  accordionEl?: HTMLElement;

  /** Reference to a Soho Accordion API, if one is available */
  accordionAPI?: SohoAccordionStatic;

  /** References to specific sections/elements */
  containerEl?: HTMLElement;

  /** Reference to the element representing the settings button's menu */
  menuEl?: HTMLElement;

  /** Reference to the settings menu's Soho Popupmenu API, if one is available*/
  menuAPI?: SohoPopupMenuStatic;

  /** Initializes the jQuery component */
  init(): void;

  /** Changes the Module Nav Switcher's Display Mode */
  setDisplayMode(val?: SohoModuleNavDisplayMode): void;

  /** Re-renders jQuery child component APIs */
  renderChildComponents(): void;

  /** Tear down the markup for the control */
  teardown(): void;

  /** Updates the Module Nav Settings with any new settings */
  updated(newSettings?: SohoModuleNavSettingsOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

/** jQuery interface for Module Nav Settings */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  modulenavsettings(options?: SohoModuleNavSettingsOptions): JQuery;
  on(events: 'updated', handler: JQuery.EventHandlerBase<any, SohoModuleNavSettingsOptions>): this;
}
