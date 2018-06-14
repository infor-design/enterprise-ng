/**
 * Soho Field Filter.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Field Filter control.
 *
 */

interface SohoFieldFilterSettings {
  /** data to display in the field filter drop down*/
  dataset?: Array<SohoFieldFilterOption>;

  /** Gets passed to this control's dropdown*/
  dropdownOpts?: SohoDropDownOptions;

  /** An Html String with the mustache template for the view. */
  template?: string;
}

interface SohoFieldFilterStatic {
  /** Access to the control's settings block. */
  settings: SohoFieldFilterSettings;

  /** Destructor. */
  destroy(): void;
}

interface JQuery {
  fieldfilter(settings?: SohoFieldFilterSettings): JQuery;
}

interface SohoFieldFilterOption {
  value: string;
  text: string;
  icon: string;
}

interface SohoFieldFilteredEvent extends JQuery.Event {
  filterOption?: SohoFieldFilterOption;
}
