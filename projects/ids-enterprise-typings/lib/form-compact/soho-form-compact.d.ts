/**
 * Ids Compact Form.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Ids jQuery Compact Form control.
 */

/**
 * Compact Form Options
 */
interface SohoFormCompactOptions {
}

/**
 * Compact Form Api.
 */
interface SohoFormCompact {
  /** The settings option */
  settings: SohoFormCompactOptions;

  /** Updates the Compact Form with any new settings and data. */
  updated(settings?: SohoFormCompactOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  formcompact(options?: SohoFormCompactOptions): JQuery;
}
