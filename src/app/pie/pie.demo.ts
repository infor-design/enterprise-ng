import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-pie-demo',
  templateUrl: 'pie.demo.html',
})
export class PieDemoComponent implements OnInit {

  @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoPieSelected  = {fieldName: 'name', fieldValue: 'Item D'};
  private selection: SohoPieSelected  = {index: 1};

  public pieData = [{
    data: [{
      name: 'Item A',
      value: 10.1,
      id: 'ca',
      tooltip: 'Item A <b>{{percent}}</b>'
    }, {
      name: 'Item B',
      value: 12.2,
      id: 'cb',
      tooltip: 'Item B <b>{{percent}}</b>'
    }, {
      name: 'Item C',
      value: 14.35,
      tooltip: 'Item C <b>{{percent}}</b>'
    }, {
      name: 'Item D',
      value: 15.6,
      tooltip: 'Item D <b>{{percent}}</b>'
    }, {
      name: 'Item E',
      value: 21.6,
      tooltip: 'Item E <b>{{percent}}</b>'
    }, {
      name: 'Item F',
      value: 41.6,
      tooltip: 'Item F <b>{{percent}}</b>'
    }]
  }];

  constructor() {}

  ngOnInit() {}

  onRendered(event: Event) {
    console.log('Soho Pie: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Pie: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Pie: Deselected', event);
  }

  onDblclick (args: any) {
    // Use only when `dblclick` is firing on our component
    if (!args.target) {
     console.log('Soho Pie: double clicked', args);
    }
  }

  setChartSelection() {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent?.setSelected(sohoPieSelected);
  }

  toggleChartSelection () {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent?.toggleSelected(sohoPieSelected);
  }
}
