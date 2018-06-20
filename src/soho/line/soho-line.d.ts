/**
 * Soho Line.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Line control.
 */

/**
 * Line Options
 */
interface SohoLineOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** A custom tooltip or tooltip renderer function for the whole chart. */
  tooltip?: string;

  /** Render as an area chart. */
  isArea?: boolean;

  /** Render as a bubble chart. */
  isBubble?: boolean;

  /** If false the label will not be shown. */
  showLegend?: boolean;

  /** A series of options for the xAxis. */
  xAxis?: object;

  /** A series of options for the yAxis. */
  yAxis?: object;

  /** If true no dots are shown. */
  hideDots?: boolean;

  /** Option to a label to one of the four sides. For Example
		* `{left: 'Left axis label', top: 'Top axis label',
		* right: 'Right axis label', bottom: 'Bottom axis label'}` */
  axisLabels?: any;

  /** true|false - will do or not do the animation.
		* 'initial' will do only first time the animation. */
  animate?: boolean;

  /** If true, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;

  /** Option to customize the dot behavior. You can set the dot size (radius),
		* the size on hover and stroke or even add a custom class.
		* Example `dots: { radius: 3, radiusOnHover: 4, strokeWidth: 0, class: 'custom-dots'}` */
  dots?: object;

  /** Use d3 format some examples can be found on http://bit.ly/1IKVhHh */
  formatterString?: string;

  /** An empty message will be displayed when there is no chart data. */
  emptyMessage?: SohoEmptyMessageOptions;
}

interface SohoLineSelectEvent {
  elem: HTMLElement[];
  data: any[];
  index: number;
}

/**
 * Line Api.
 */
interface SohoLine {
  /** The settings option */
  settings: SohoLineOptions;

  /** Updates the line with any new settings and data. */
  updated(settings?: SohoLineOptions): void;

  /** Gets the currently selected element */
  getSelected(settings?: SohoLineOptions, isToggle?: boolean);

  /** Sets the currently selected element */
  setSelected(selected: SohoLineSelected);

  /** Toggles the currently selected element */
  toggleSelected(selected: SohoLineSelected);

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoLineSelected {
  groupIndex: number;
  fieldName: string;
  fieldValue: any;
}

interface JQuery {
  line(options?: SohoLineOptions): JQuery;
}
