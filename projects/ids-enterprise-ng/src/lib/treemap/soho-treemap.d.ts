/**
 * Soho Tree Map.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Tree Map control.
 */

/**
 * Tree Map Options
 */
interface SohoTreemapOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object;

  /** If false, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;

  /** The margins of the SVG, which you may want to adjust depending on text location. */
  margin?: Object[];

  /** An array of colors used in sequence from front to end of the array. */
  colors?: any;

  /** If false then the percentage wont be shown in the blocks. */
  showLabel?: boolean;

  /** The d3 formatter function for the value label. */
  labelFormatter?: string;

  /** If true then the first name will be used for the title area. */
  showTitle?: boolean;

  /** An empty message will be displayed when there is no chart data. */
  emptyMessage?: Object[];
}

/**
 * Tree Map Api.
 */
interface SohoTreemap{
  /** The settings option */
  settings: SohoTreemapOptions;

  /** Updates the tree map with any new settings and data. */
  updated(settings?: SohoTreemapOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  treemap(options?: SohoTreemapOptions): JQuery;
}
