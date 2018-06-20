/**
 * Soho Column.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Column control.
 */

/**
 * Column Options
 */
interface SohoColumnOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** Set to true if its a stacked column chart. */
  isStacked?: boolean;

  /** If false the legend will not be shown. */
  showLegend?: boolean;

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  animate?: boolean | string;

  /** If true, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;

  /** The d3 axis format. */
  format?: string;

  /** Use d3 format some examples can be found on http://bit.ly/1IKVhHh */
  formatterString?: string;

  /** The number of ticks to show. */
  ticks?: object[];

  /** An empty message will be displayed when there is no chart data. */
  emptyMessage?: object[];

  /** A series of options for the xAxis. */
  xAxis?: object;
}

interface SohoColumnSelectEvent {
  elem: HTMLElement[];
  data: any[];
  index: number;
}

/**
 * Column Api.
 */
interface SohoColumn {
  /** The settings option */
  settings: SohoColumnOptions;

  /** Updates the column with any new settings and data. */
  updated(settings?: SohoColumnOptions): void;

  /** Gets the currently selected element */
  getSelected(settings?: SohoColumnOptions, isToggle?: boolean);

  /** Sets the currently selected element */
  setSelected(selected: SohoColumnSelected);

  /** Toggles the currently selected element */
  toggleSelected(selected: SohoColumnSelected);

  /** Destroys the control on completion. */
  destroy(): void;
}

type SohoColumnSelected = SohoColumnFieldSelected | SohoColumnGroupSelected;

interface SohoColumnFieldSelected {
  fieldName: string;
  fieldValue: any;
}

interface SohoColumnGroupSelected {
  groupName: string;
  groupValue: any;
}

interface JQuery {
  column(options?: SohoColumnOptions): JQuery;
}
