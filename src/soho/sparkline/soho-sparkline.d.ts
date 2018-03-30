/**
 * Soho Sparkline.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Sparkline control.
 */

/**
 * Sparkline Options
 */
interface SohoSparklineOptions {

  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** An array of color sequences in hex format fx #1D5F8A, defaulting to the correct standard colors. */
  colors?: any[];

  /** Shows dots on the data points. */
  isDots?: boolean;

  /** Highlights the top value as peak with a special dot. */
  isPeakDot?: boolean;

  /** Shows a continuous shading to highlight the min and max values. */
  isMinMax?: boolean;

  /** Adds a median range display. */
  isMedianRange?: boolean;
}

/**
 * Sparkline Api.
 */
interface SohoSparkline {

  /** The settings option */
  settings: SohoSparklineOptions;

  /** Updates the sparkline with any new settings and data */
  updated(settings?: SohoSparklineOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  sparkline(options?: SohoSparklineOptions): JQuery;
}
