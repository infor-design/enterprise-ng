
interface SohoChartOptions {
  dataset?: SohoDataSet;
  type?: ChartTypes;
  axisLabels?: AxisLabels;
  showLegend?: boolean;
  formatterString?: string;
  chartLabel?: ChartLabel;
  labels?: ChartLabel;
  redrawOnResize?: boolean;
  animate?: boolean;
}

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoChartStatic {
  /** Options. */
  settings: SohoChartOptions;
  getSelected: Function;
  setSelected: Function;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  chart: SohoChartStatic;
}

interface JQuery {
  chart(options?: SohoChartOptions): JQuery;
}

interface SohoChartData {
  name: string | SohoChartDataName;
  value?: number | BubbleCordinates;
  info?: SohoChartDataInfo;
  completed?: SohoChartDataCompleted;
  remaining?: SohoChartDataRemaining;
  total?: SohoChartDataTotal;
  percentText?: SohoChartPercentText;
  url?: string;
  color?: string;
  tooltip?: string;
  shortName?: string;
  selected?: boolean;
  abbrName?: string;
  ref?: any;
}

interface SohoChartDataName {
  text?: string;
}

interface SohoChartDataInfo {
  value?: number | string;
  text?: string;
  color?: string;
}

interface SohoChartDataCompleted {
  value?: number | string;
  text?: string;
  color?: string;
  format?: string;
}

interface SohoChartDataRemaining {
  value?: number | string;
  text?: string;
  color?: string;
  format?: string;
  textOnly?: boolean;
}

interface SohoChartDataTotal {
  value?: number | string;
  text?: string;
  format?: string;
  difference?: boolean;
  textOnly?: boolean;
}

interface SohoChartPercentText {
  value?: number | string;
  text?: string;
  show?: boolean;
  color1?: string;
  color2?: string;
}
type ChartTypes = 'pie' | 'bar' | 'bar-stacked' | 'bar-normalized' | 'bar-grouped' | 'bubble' |
  'column-stacked' |'column' | 'column-grouped' | 'column-positive-negative' | 'donut' | 'line' |
  'area' | 'bullet' | 'completion' | 'completion-target' | 'targeted-achievement';

type SohoChartDataArray = Array<SohoChartData>;

interface SohoDataSetItem {
  data: SohoChartDataArray;
  name?: string;
  color?: string;
  labels?: SohoChartLabel;
  valueFormatterString?: BubbleCordinateLabels;
  centerLabel?: string;
  selected?: boolean;
  ref?: any;
}

type SohoDataSet = Array<SohoDataSetItem>;

interface SohoChartLabel {
  name: string;
  value: BubbleCordinateLabels;
}

interface BubbleCordinates {
  x: number;
  y: number;
  z: number;
}

interface BubbleCordinateLabels {
  x?: string;
  y?: string;
  z?: string;
}

interface AxisLabels {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
}

interface ChartLabel {
  contentsTop?: string;
  formatterTop?: string;
  hideLabels?: boolean;
}

interface ChartEvent {
  event: JQueryEventObject;
  ui?: any;
  data?: any;
}

interface  ChartSelectionOptions {
  fieldName?: string;
  fieldValue?: any;
  groupName?: string;
  groupValue?: any;
}
