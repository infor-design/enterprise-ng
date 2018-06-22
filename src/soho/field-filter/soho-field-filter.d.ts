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

  updated(SohoFieldFilterSettings): void;
}

interface JQuery {
  fieldfilter(settings?: SohoFieldFilterSettings): JQuery;
}

interface SohoFieldFilterOption {
  value: 'end-with' | 'does-not-end-with' |
         'start-with' | 'does-not-start-with' |
         'equals' | 'does-not-equal' |
         'contains' | 'does-not-contain' |
         'calendar' | 'in-range' |
         'is-empty' | 'is-not-empty' |
         'less-equals' | 'less-than' |
         'greater-equals' | 'greater-than' |
         'between' | 'selected-notselected' |
         'selected' | 'not-selected' |
         'sort-a-to-z' | 'sort-z-to-a';
  text: string;
  icon: string;
  selected ?: boolean;
}

interface SohoFieldFilteredEvent extends JQuery.Event {
  filterOption?: SohoFieldFilterOption;
}
