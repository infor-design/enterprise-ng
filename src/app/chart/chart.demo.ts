import {
  Component,
  OnInit, HostBinding, ElementRef, ViewChild
} from '@angular/core';
import { ChartDemoService } from './chart-demo.service';
import { SohoChartComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-chart-demo',
  templateUrl: './chart.demo.html',
  providers: [ChartDemoService],
  styles: [`
    .radio-label {
      padding-right:10px;
    }
  `]
})
export class ChartDemoComponent implements OnInit {

  @ViewChild(SohoChartComponent) sohoChartComponent: SohoChartComponent;

  @HostBinding('style.display') get getDisplay() {
  return 'block';
  };
  @HostBinding('style.height') get getHeight() {
    return '100%';
  };

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
  public showLegend = false;
  public barGroupedChart = 'bar-grouped';
  public pieChart = 'pie';
  public columnChart = 'column';
  public barChart = 'bar';
  public lineChart = 'line';
  public donutChart = 'donut';
  public bubbleChart = 'bubble';
  public selectedIndex = 1;

  constructor(public chartDemoService: ChartDemoService, private elementRef: ElementRef) { }
  ngOnInit() { }

  public onChange(event: Event) {
    //  this.sohoChartComponent;
    const chartType: ChartTypes = $(event.currentTarget).filter(':checked').val();
    const chartOptions: SohoChartOptions = {};

    if (chartType === 'pie' || chartType === 'donut') {
      chartOptions.dataset = this.chartDemoService.getPieData();
    } else if (chartType === 'bubble') {
      chartOptions.dataset = this.chartDemoService.getBubbleData();
    } else {
      chartOptions.dataset = this.chartDemoService.getBasicData();
    }
    chartOptions.type = chartType;
    this.sohoChartComponent.chartOptions = chartOptions;
  }

  public onChangeIndex(event: Event) {
    this.selectedIndex = parseInt($(event.currentTarget).filter(':checked').val(), 10);
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
