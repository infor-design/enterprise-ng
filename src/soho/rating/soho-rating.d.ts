/**
 * Soho Rating.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Rating control.
 */

/**
 * Rating Options
 */
interface SohoRatingOptions {
}

/**
 * Rating Api.
 */
interface SohoRating {
  /** The settings option */
  settings: SohoRatingOptions;

  /** Set component to readonly */
  readonly(): void

  /** Set component to enable */
  enable():void

  /** Updates the rating with any new settings and data */
  updated(settings?: SohoRatingOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  rating(options?: SohoRatingOptions): JQuery;
}
