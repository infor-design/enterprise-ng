/// <reference path='./soho-module-nav-common.d.ts' />
/// <reference path='../accordion/soho-accordion.d.ts' />
/// <reference path='../button/soho-button.d.ts' />
/// <reference path='../dropdown/soho-dropdown.d.ts' />


/** Defines a Module Nav Switcher Role Record
 * (Takes the same arguments as items present in the Soho Dropdown JSON notation)
 */
type SohoModuleNavSwitcherRoleRecord = Record<string, unknown>;

type SohoModuleNavSwitcherIconSetting = string | ((api: SohoModuleNavSwitcherStatic) => string) | undefined | false;

/** Defines options present in the Soho Module Nav Switcher */
interface SohoModuleNavSwitcherOptions {
  displayMode?: SohoModuleNavDisplayMode;
  generate?: boolean;
  icon?: SohoModuleNavSwitcherIconSetting;
  moduleButtonText?: string;
  roleDropdownLabel?: string;
  changeIconOnSelect?: boolean;
  noSearch?: boolean;
  roles?: Array<SohoModuleNavSwitcherRoleRecord>;
}

/** Public API for Soho Module Nav Switcher JS component */
interface SohoModuleNavSwitcherStatic {
  /** Module Nav Switcher's current settings */
  settings: SohoModuleNavSwitcherOptions;

  /** Reference to jQuery-wrapped HTML Element representing the Soho Accordion */
  accordionEl?: HTMLElement;

  /** Reference to a Soho Accordion API, if one is available */
  accordionAPI?: SohoAccordionStatic;

  /** Reference to container element */
  containerEl?: HTMLElement;

  /** Reference to the Module Button's Container Element */
  moduleButtonContainerEl?: HTMLElement;

  /** Reference to the Module Button's Icon Element */
  moduleButtonIconEl?: HTMLElement | SVGElement;

  /** Reference to the Module Button element */
  moduleButtonEl?: HTMLElement;

  /** Reference to the Module Button's Soho Button API, if one is available */
  moduleButtonAPI?: SohoButtonStatic;

  /** Reference to the Role Dropdown's container element */
  roleDropdownContainerEl?: HTMLElement;

  /** Reference to the Role Dropdown's element */
  roleDropdownEl?: HTMLElement;

  /** Reference to the Module Button's Soho Button API, if one is available */
  roleDropdownAPI?: SohoDropDownStatic;

  /** Initializes the jQuery component */
  init(): void;

  /** Changes the Module Nav Switcher's Display Mode */
  setDisplayMode(val?: SohoModuleNavDisplayMode): void;

  /** Sets visible */
  setRoles(val?: SohoModuleNavSwitcherRoleRecord[], doUpdate?: boolean): void;

  /** Selects a role in the dropdown based on its value,
   * keeping all Module Nav Switcher elements synced */
  selectRole(val: string): void;

  /** Re-renders jQuery child component APIs */
  renderChildComponents(): void;

  /** Changes the focus of the Module Button */
  toggleModuleButtonFocus(doFocus?: boolean): void;

  /** Tear down the markup for the control */
  teardown(): void;

  /** Updates the Module Nav Switcher with any new settings */
  updated(newSettings?: SohoModuleNavSwitcherOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

/** jQuery interface for Module Nav Switcher */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  modulenavswitcher(options?: SohoModuleNavSwitcherOptions): JQuery;
  on(events: 'updated', handler: JQuery.EventHandlerBase<any, SohoModuleNavSwitcherOptions>): this;
}
