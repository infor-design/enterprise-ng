import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {SohoLineComponent} from '../../soho/line';

@Component({
  selector: 'soho-line-demo',
  templateUrl: './area.demo.html',
})
export class AreaDemoComponent implements OnInit {

  @ViewChild(SohoLineComponent) sohoLineComponent: SohoLineComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoLineSelected  = {groupIndex: 1};
  // private selection: SohoLineSelected  = {groupName: 'name', groupValue: 'Component A'};
  private selection: SohoLineSelected  = {groupName: 'id', groupValue: '3'};

  public areaData = [{
    data: [
      {name: 'Jan', value: 12, depth: 4},
      {name: 'Feb', value: 11},
      {name: 'Mar', value: 14},
      {name: 'Apr', value: 10},
      {name: 'May', value: 14},
      {name: 'Jun', value: 8}
    ],
    name: 'Component A',
    id: '1'
  }, {
    data: [
      {name: 'Jan', value: 22},
      {name: 'Feb', value: 21},
      {name: 'Mar', value: 24},
      {name: 'Apr', value: 20},
      {name: 'May', value: 24},
      {name: 'Jun', value: 28}
    ],
    name: 'Component B',
    id: '2'
  }, {
    data: [
      {name: 'Jan', value: 32},
      {name: 'Feb', value: 31},
      {name: 'Mar', value: 34},
      {name: 'Apr', value: 30},
      {name: 'May', value: 34},
      {name: 'Jun', value: 38}
    ],
    name: 'Component C',
    id: '3'
  }];

  constructor() {}

  ngOnInit() {}

  setChartSelection() {
    const sohoLineSelected: SohoLineSelected = this.selection;
    this.sohoLineComponent.setSelected(sohoLineSelected);
  }

  toggleChartSelection () {
    const sohoLineSelected: SohoLineSelected = this.selection;
    this.sohoLineComponent.toggleSelected(sohoLineSelected);
  }
}
