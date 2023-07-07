/**
 * Soho Pie.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Pie control.
 */

/**
 * Pie Options
 */
interface SohoPieOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** If true it renders as a donut chart. */
  isDonut?: boolean;

  /** Controls the animation speed. */
  animationSpeed?: number;

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  animate?: any;

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
    * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  redrawOnResize?: boolean;

  /** If false the center label will not be shown. */
  hideCenterLabel?: boolean;

  /** If false connector lines wont be shown. */
  showLines?: boolean;

  /** This defaults to false, when false and under 450px the lines. */
  showLinesMobile?: boolean;

  /** A setting that controls the line values and format. */
  lines?: SohoPieLinesOptions;

  /** If false the legend will not be shown. */
  showLegend?: boolean;

  /** Where to locate the legend. This can be bottom or right at the moment. */
  legendPlacement?: 'bottom' | 'right' | string;

  /** Force Legend popup below regardless of the quantity of labels. */
  forceLegendPopup?: boolean,

  /** A setting that controls the legend values and format. */
  legend?: SohoPieLegendOptions;

  /** If false no tooltips will be shown */
  showTooltips?: boolean;

  /** A setting that controls the tooltip values and format. */
  tooltip?: SohoPieTooltipOptions;

  /** If true center tooltip will be shown */
  showCenterTooltip?: boolean;

  /** If true chart height will fit in parent available height. */
  fitHeight?: boolean;

  /** An empty message will be displayed when there is no chart data. */
  emptyMessage?: SohoEmptyMessageOptions;
}

interface SohoPieLinesOptions {
  /** Value, label, label (value) or percent or custom function **/
  show?: string;

  /** The d3.formatter string. */
  formatter?: string;
}

interface SohoPieLegendOptions {
  /** Value, label, label (value) or percent or custom function **/
  show?: string;

  /** The d3.formatter string. */
  formatter?: string;
}

interface SohoPieTooltipOptions {
  /** Value, label, label (value) or percent or custom function **/
  show?: string;

  /** The d3.formatter string. */
  formatter?: string;
}

interface SohoPieSelectEvent {
  elem: HTMLElement[];
  data: any[];
  index: number;
}

/**
 * Pie Api.
 */
interface SohoPie {
  /** The settings option */
  settings: SohoPieOptions;

  /** Updates the pie with any new settings and data. */
  updated(settings?: SohoPieOptions): void;

  /** Gets the currently selected element */
  getSelected(settings?: SohoPieOptions, isToggle?: boolean): Array<Object> | Object;

  /** Sets the currently selected element */
  setSelected(selected: SohoPieSelected): void;

  /** Toggles the currently selected element */
  toggleSelected(selected: SohoPieSelected): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoPieSelected {
  // Use either index or fieldName and fieldValue
  fieldName?: string;
  fieldValue?: any;
  index?: number;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  pie(options?: SohoPieOptions): JQuery;
}
