import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'div[soho-chart]', // tslint:disable-line
  template: ''
})

export class SohoChartComponent implements AfterViewInit, OnDestroy {

  @Input() set chartOptions(chartOptions: SohoChartOptions) {
    this._chartOptions = chartOptions;
    if (this.jQueryElement) {
      this.chart.settings = chartOptions;
      this.updated();
    }
  }

  @Input() set dataSet(dataset: SohoDataSet) {
    this._chartOptions.dataset = dataset;
    if (this.jQueryElement) {
      this.chart.settings.dataset = dataset;
      this.updated();
    }
  }

  @Input() set type(type: ChartTypes) {
    this._chartOptions.type = type;
    if (this.jQueryElement) {
      this.chart.settings.type = type;
      this.updated();
    }
  }

  @Input() set axisLabels(axisLabels: AxisLabels) {
    this._chartOptions.axisLabels = axisLabels;
    if (this.jQueryElement) {
      this.chart.settings.axisLabels = axisLabels;
      this.updated();
    }
  }

  @Input() set showLegend(showLegend: boolean) {
    this._chartOptions.showLegend = showLegend;
    if (this.jQueryElement) {
      this.chart.settings.showLegend = showLegend;
      this.updated();
    }
  }

  @Input() set formatterString(formatterString: string) {
    this._chartOptions.formatterString = formatterString;
    if (this.jQueryElement) {
      this.chart.settings.formatterString = formatterString;
      this.updated();
    }
  }

  @Input() set chartLabel(chartLabel: ChartLabel) {
    this._chartOptions.chartLabel = chartLabel;
    if (this.jQueryElement) {
      this.chart.settings.chartLabel = chartLabel;
      this.updated();
    }
  }

  @Input() set chartredrawOnResizeLabel(redrawOnResize: boolean) {
    this._chartOptions.redrawOnResize = redrawOnResize;
    if (this.jQueryElement) {
      this.chart.settings.redrawOnResize = redrawOnResize;
      this.updated();
    }
  }

  // An internal chartOptions object that gets updated by using
  // the component's Inputs()
  private _chartOptions: SohoChartOptions = {};

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the soho tabs control api.
  private chart: SohoChartStatic;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    this.jQueryElement.chart(this._chartOptions);
  }

  ngOnDestroy() {
  }

  updated() {
    // logic here if we have a way to update charts
  }
}
