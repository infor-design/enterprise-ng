/**
 * Soho Bar.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Bar control.
 */

/**
 * Bar Options
 */
interface SohoBarOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** Default is a single or stacked chart. */
  isStacked?: boolean;

  /** If true its a 100% bar chart. */
  isNormalized?: boolean;

  /** If true its a grouped bar chart. */
  isGrouped?: boolean;

  /** If false the legend will not be shown. */
  showLegend?: boolean;

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  animate?: boolean | string;

  /** If true, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;

  /** Use d3 format some examples can be found on http://bit.ly/1IKVhHh */
  formatterString?: string;

  /** The d3 axis format. */
  format?: string;

  /** A tooltip for the whole chart. */
  tooltip?: string;

  /** If true log scale is enabled. */
  useLogScale?: boolean;

  /** Settings for the chart ticks. Can set ticks: {format: d3Format, number: n} */
  ticks?: object[];

  /** Show the in the axis lines or not. */
  showLines?: boolean;

  /** How far out than the outer circle should the labels be placed, this
    * may be useful to adjust for some labels. */
  labelFactor?: number;

  /** The number of pixels after which a label needs to be given a new line.
    * You may want to change this based on label data. */
  wrapWidth?: number;

  /** An empty message will be displayed when there is no chart data. */
  emptyMessage?: object[];
}

interface SohoBarSelectEvent {
  elem: HTMLElement[];
  data: any[];
  index: number;
}

/**
 * Bar Api.
 */
interface SohoBar {
  /** The settings option */
  settings: SohoBarOptions;

  /** Updates the bar with any new settings and data. */
  updated(settings?: SohoBarOptions): void;

  /** Gets the currently selected element */
  getSelected(settings?: SohoBarOptions, isToggle?: boolean);

  /** Sets the currently selected element */
  setSelected(selected: SohoBarSelected);

  /** Toggles the currently selected element */
  toggleSelected(selected: SohoBarSelected);

  /** Destroys the control on completion. */
  destroy(): void;
}

type SohoBarSelected = SohoBarFieldSelected | SohoBarGroupSelected;

interface SohoBarFieldSelected {
  fieldName: string;
  fieldValue: any;
}

interface SohoBarGroupSelected {
  groupName: string;
  groupValue: any;
}

interface JQuery {
  bar(options?: SohoBarOptions): JQuery;
}
