import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';


export const donutData = [
  {
    data: [{
      name: 'Component A',
      value: 18
    }, {
      name: 'Component B',
      value: 44
    }, {
      name: 'Component C',
      value: 32
    }, {
      name: 'Component D',
      value: 6
    }],
    centerLabel: 'Donut Chart'
  }
];
@Component({
  selector: 'app-pie-bordered-demo',
  templateUrl: 'pie-bordered.demo.html',
})
export class PieBorderedDemoComponent implements OnInit {

  @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoPieSelected  = {fieldName: 'name', fieldValue: 'Item D'};
  private selection: SohoPieSelected = { index: 1 };

  public pieData: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.pieData = donutData;
    }, 3000);
  }

  onRendered(event: Event) {
    console.log('Soho Pie: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Pie: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Pie: Deselected', event);
  }

  onDblclick(args: any) {
    // Use only when `dblclick` is firing on our component
    if (!args.target) {
      console.log('Soho Pie: double clicked', args);
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
