
interface SohoChartOptions {
  dataset?: SohoDataSet;
  type?: ChartTypes;
  axisLabels?: AxisLabels;
  showLegend?: boolean;
  formatterString?: string;
  chartLabel?: ChartLabel;
  labels?: ChartLabel;
  redrawOnResize?: boolean;
}

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoChartStatic {
  /** Options. */
  settings: SohoChartOptions;
}

interface SohoChartData {
  name: string;
  value: number | BubbleCordinates;
  url?: string;
  color?: string;
  tooltip?: string;
  shortName?: string;
  selected?: boolean;
  abbrName?: string;
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
