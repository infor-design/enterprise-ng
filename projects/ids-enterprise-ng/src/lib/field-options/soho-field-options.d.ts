/**
 * Soho Field Options.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Field Options control.
 *
 * Which has no options at this time.
 */

interface SohoFieldOptionsSettings {

}

interface SohoFieldOptionsStatic {
  /** Access to the control's options block. */
  settings: SohoFieldOptionsSettings;

  /** Destructor. */
  destroy(): void;
}

interface JQuery {
  fieldoptions(options?: SohoFieldOptionsSettings): JQuery;
}
