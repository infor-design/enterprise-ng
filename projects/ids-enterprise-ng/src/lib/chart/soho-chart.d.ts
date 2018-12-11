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
  legendFormatter?: string;
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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  chart(options?: SohoChartOptions | SohoBarOptions | SohoRadarOptions | SohoLineOptions | SohoPieOptions |
    SohoBulletOptions | SohoSparklineOptions | SohoColumnOptions | SohoTreemapOptions): JQuery;
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
  target?: number;
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
type ChartTypes =
  /* soho-pie.component     */ 'pie' | 'donut' |
  /* soho-bar.component     */ 'bar' | 'bar-stacked' | 'bar-normalized' | 'bar-grouped' |
  /* soho-column.component  */ 'column-stacked' |'column' | 'column-grouped' | 'column-positive-negative' |
  /* soho-line.component    */ 'bubble' | 'scatter' | 'line' | 'area' |
  /* soho-bullet.component  */ 'bullet' |
  /* soho-radar.component   */ 'radar' |
  /* soho-treemap.component */ 'treemap' |
  /* soho-chart.component   */ 'completion' | 'completion-target' | 'targeted-achievement';

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
  legends?: PosNegLegends;
  colors?: PosNegColors;
}

type SohoDataSet = Array<SohoDataSetItem> | Array<any>;

interface SohoChartLabel {
  name: string;
  value: BubbleCordinateLabels;
}

interface PosNegLegends {
  target: string;
  positive: string;
  negative: string;
}

interface PosNegColors {
  target: string;
  positive: string;
  negative: string;
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
  event: JQuery.TriggeredEvent;
  ui?: any;
  data?: any;
}

interface  ChartSelectionOptions {
  fieldName?: string;
  fieldValue?: any;
  groupName?: string;
  groupValue?: any;
}
