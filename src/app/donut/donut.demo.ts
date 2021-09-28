import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-pie-demo',
  templateUrl: 'donut.demo.html',
})
export class DonutDemoComponent implements OnInit {

  @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  private selection: SohoPieSelected = { fieldName: 'name', fieldValue: 'Component A' };
  // private selection: SohoPieSelected  = {index: 1};

  public donutData = [{
    data: [{
      name: 'Component A',
      value: 16
    }, {
      name: 'Component B',
      value: 12
    }, {
      name: 'Component C',
      value: 14
    }],
    centerLabel: 'Donut Chart',
    centerTooltip: 'Total Value: 41'
  }];

  constructor() { }

  ngOnInit() { }

  onRendered(event: Event) {
    console.log('Soho Donut: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Donut: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Donut: Deselected', event);
  }

  onDblclick(args: any) {
    // Use only when `dblclick` is firing on our component
    if (!args.target) {
      console.log('Soho Donut: double clicked', args);
    }
  }

  setChartSelection() {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent?.setSelected(sohoPieSelected);
  }

  toggleChartSelection() {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent?.toggleSelected(sohoPieSelected);
  }
}
