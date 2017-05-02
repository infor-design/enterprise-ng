import {
  Component,
  OnInit, HostBinding
} from '@angular/core';
import { ChartDemoService } from './chart-demo.service';

@Component({
  selector: 'soho-chart-demo',
  templateUrl: './chart.demo.html',
  providers: [ChartDemoService],
})
export class ChartDemoComponent implements OnInit {

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

  constructor(public chartDemoService: ChartDemoService) { }
  ngOnInit() { }
}
