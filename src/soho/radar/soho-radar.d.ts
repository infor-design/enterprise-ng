/**
 * Soho Radar.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Radar control.
 */

/**
 * Radar Options
 */
interface SohoRadarOptions {

  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** If false, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;

  /** Makes it possible to adjust the top margins */
  margin?: object;

  /** How many levels or inner circles should there be drawn. */
  levels?: number;

  /** What is the value that the biggest circle will represent */
  maxValue?: number;

  /** How far out than the outer circle should the labels be placed,
    * this may be useful to adjust for some charts. */
  labelFactor?: number;

  /**  The number of pixels after which a label needs to be
  * given a new line. You may want to change this based on label data. */
  wrapWidth?: number;

  /**  The opacity value of the blobs. */
  opacityArea?: number;

  /**  The size of the colored circles of each blog. Set to zero to remove dots. */
  dotRadius?: number;

  /**  The opacity of the circles of each blob 0 or .1 are good values. */
  opacityCircles?: number;

  /** The width of the stroke around each blob. */
  strokeWidth?: number;

  /** If true the area and stroke will follow a round path (cardinal-closed). */
  roundStrokes?: boolean;

  /** If false the axis lines will not be shown in the diagonals. */
  showCrosslines?: boolean;

  /** If false the axis labels will not be shown. */
  showAxisLabels?: boolean;

  /** An array of colors to use for each blob */
  colors?: any[];

  /** If false no tooltips will be shown. */
  showTooltips?: boolean;

  /** A setting that controls the tooltip values and format. */
  tooltip?: SohoRadarTooltipOptions;

  /** d3 formatter to use on the axis labels */
  axisFormatter?: string;

  /**  If false the legend will not be shown. */
  showLegend?: boolean;

  /** Where to locate the legend. This can be bottom or right at the moment. */
  legendPlacement?: string;

  /**  An empty message will be displayed when there is no chart data. */
  emptyMessage?: SohoEmptyMessageOptions;

}

interface SohoRadarTooltipOptions {
  /** Value, label, label (value) or percent or custom function **/
  show?: string;

  /** The d3.formatter string. */
  formatter?: string;
}

interface SohoRadarSelectEvent {
  elem: HTMLElement[];
  data: any[];
  index: number;
}

/**
 * Radar Api.
 */
interface SohoRadar {

  /** The settings option */
  settings: SohoRadarOptions;

  /** Updates the radar with any new settings and data */
  updated(settings?: SohoRadarOptions): void;

  /** Gets the currently selected element */
  getSelected(o?: SohoRadarOptions, isToggle?: boolean);

  /** Sets the currently selected element */
  setSelected(selected: SohoRadarSelected);

  /** Toggles the currently selected element */
  toggleSelected(selected: SohoRadarSelected);

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoRadarSelected {
  fieldName: string;
  fieldValue: any;
}

interface JQuery {
  radar(options?: SohoRadarOptions): JQuery;
}
