import {
  Component,
  OnInit, HostBinding, ElementRef, ViewChild
} from '@angular/core';
import { ChartDemoService } from './chart-demo.service';
import { SohoChartComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-chart-demo',
  templateUrl: './chart.demo.html',
  providers: [ChartDemoService],
  styles: [`
    .radio-label {
      padding-right:10px;
    }
  `
  ]
})
export class ChartDemoComponent implements OnInit {

  @ViewChild(SohoChartComponent) sohoChartComponent: SohoChartComponent;

  @HostBinding('style.display') get getDisplay() {
    return 'block';
  }

  @HostBinding('style.height') get getHeight() {
    return '100%';
  }

  public lineAxisLabels: AxisLabels =  {
    left: 'Left axis label',
    top: 'Top axis label',
    right: 'Right axis label',
    bottom: 'Bottom axis label',
  };

  public labels: ChartLabel = {
    contentsTop: 'value',
    formatterTop: '$,.2f',
    hideLabels: false,
  };

  public labels2: ChartLabel = {
    contentsTop: 'value',
    formatterTop: '$,.2f',
  };

  public formatterString = '$,.2f';
  public showLegend = true;
  public hideLabel = true;
  public barGroupedChart = 'bar-grouped';
  public pieChart = 'pie';
  public columnChart = 'column';
  public barChart = 'bar';
  public lineChart = 'line';
  public donutChart = 'donut';
  public bubbleChart = 'bubble';
  public selectedIndex = 1;
  private currentChartType: ChartTypes = 'column';
  private animateCharts = true;

  constructor(public chartDemoService: ChartDemoService, private elementRef: ElementRef) { }
  ngOnInit() { }

  public onAnimateCheckboxChange(event: Event) {
    const animateCheckElement = $(event.currentTarget);
    const isCheck = $(event.currentTarget).is(':checked');
    this.animateCharts = isCheck;
    this.buildChartOptions(animateCheckElement);
  }

  public onLegendCheckboxChange(event: Event) {
    const legendCheckElement = $(event.currentTarget);
    const isCheck = $(event.currentTarget).is(':checked');
    this.showLegend = isCheck;
    this.buildChartOptions(legendCheckElement);
  }

  public onShowLabelCheckboxChange(event: Event) {
    const showLabelCheckElement = $(event.currentTarget);
    const isCheck = $(event.currentTarget).is(':checked');
    this.hideLabel = isCheck;
    this.buildChartOptions(showLabelCheckElement);
  }

  public onChange(event: Event) {
    const element = $(event.currentTarget);
    const chartType: ChartTypes = element.filter(':checked').val() as ChartTypes;
    if (chartType === this.currentChartType) {
      // dont do anything if the chart is the same type
      return;
    }
    this.currentChartType = chartType;

    this.buildChartOptions(element);
  }

  private buildChartOptions(element) {
    const chartOptions: SohoChartOptions = {};

    if (this.currentChartType === 'pie' || this.currentChartType === 'donut') {
      chartOptions.dataset = this.chartDemoService.getPieData();
    } else if (this.currentChartType === 'bubble') {
      chartOptions.dataset = this.chartDemoService.getBubbleData();
    } else if (this.currentChartType === 'scatter') {
      chartOptions.dataset = this.chartDemoService.getScatterData();
      this.currentChartType = 'bubble';
    } else if (this.currentChartType === 'bar' || this.currentChartType.indexOf('stacked') >= 0) {
      chartOptions.dataset = this.chartDemoService.getStackedData();
    } else if (this.currentChartType === 'column-positive-negative') {
      chartOptions.dataset = this.chartDemoService.getPosNegData();
    } else {
      chartOptions.dataset = this.chartDemoService.getBasicData();
    }
    chartOptions.type = this.currentChartType;
    chartOptions.animate = this.animateCharts;
    chartOptions.showLegend = this.showLegend;
    if (chartOptions.labels) {
      chartOptions.labels.hideLabels = !this.hideLabel;
    } else {
      chartOptions['labels'] = {hideLabels: !this.hideLabel};
    }
    this.sohoChartComponent.chartOptions = chartOptions;
  }

  public onChangeIndex(event: Event) {
    this.selectedIndex = parseInt($(event.currentTarget).filter(':checked').val() as string, 10);
  }

  onSelected(chartEvent: ChartEvent) {
    this.sohoChartComponent.getSelected();
    console.log(chartEvent.event, chartEvent.ui, chartEvent.data);
  }

  onUnselected(chartEvent: ChartEvent) {
    console.log(chartEvent.event, chartEvent.ui, chartEvent.data);
  }

  onRendered(chartEvent: ChartEvent) {
    console.log(chartEvent.event);
  }

  onContextMenu(chartEvent: ChartEvent) {
    this.sohoChartComponent.getSelected();
    console.log(chartEvent.event, chartEvent.ui, chartEvent.data);
  }
}
