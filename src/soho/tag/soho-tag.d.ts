/**
 * Infor Design Enterprise (fna sohoxi) 'Tags'.
 *
 * This file contains the Typescript mappings for the public
 * interface of the jQuery Tags control.
 */

/**
 * Rating Options
 */
interface SohoTagOptions {
}

/**
 * Rating Api.
 */
interface SohoTag {
  /** The settings option */
  settings: SohoTagOptions;

  /** Updates the rating with any new settings and data */
  updated(settings?: SohoTagOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoTagBeforeRemoveEvent extends JQuery.Event {}

interface SohoTagAfterRemoveEvent extends JQuery.Event {}

interface JQuery {
  tag(options?: SohoTagOptions): JQuery;
}
