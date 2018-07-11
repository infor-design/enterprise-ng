import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {SohoLineComponent} from '../../soho/line';

@Component({
  selector: 'soho-line-demo',
  templateUrl: './bubble.demo.html',
})
export class BubbleDemoComponent implements OnInit {

  @ViewChild(SohoLineComponent) sohoLineComponent: SohoLineComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  private selection: SohoLineSelected  = {groupIndex: 0};
  // private selection: SohoLineSelected  = {groupName: 'name', groupValue: 'Series 02'};

  public bubbleData = [{
    data: [{
      name: 'January',
      value: {x: 5, y: 3, z: 3}
    }, {
      name: 'February',
      value: {x: 37, y: 5, z: 9}
    }, {
      name: 'March',
      value: {x: 10, y: 5.3, z: 4}
    }, {
      name: 'April',
      value: {x: 80, y: 6, z: 10}
    }, {
      name: 'May',
      value: {x: 21, y: 4.8, z: 4
      }
    }, {
      name: 'June',
      value: {x: 72, y: 5.2, z: 4}
    }, {
      name: 'July',
      value: {x: 26, y: 8, z: 6}
    }, {
      name: 'August',
      value: {x: 71, y: 3.9, z: 8}
    }, {
      name: 'September',
      value: {x: 85, y: 8, z: 2}
    }, {
      name: 'October',
      value: {x: 52, y: 3, z: 2}
    }, {
      name: 'November',
      value: {x: 44, y: 5.9, z: 3}
    }, {
      name: 'December',
      value: {x: 110, y: 7, z: 4}
    }],
    name: 'Series 01',
    labels: {
      name: 'Month',
      value: {x: 'Revenue', y: 'Sold', z: 'Market Share'}
    },
    valueFormatterString: {
      z: '0.0%'
    }
  }, {
    data: [{
      name: 'January',
      value: {x: 9, y: 3.2, z: 3}
    }, {
      name: 'February',
      value: {x: 12, y: 6.3, z: 10}
    }, {
      name: 'March',
      value: {x: 65, y: 4, z: 10}
    }, {
      name: 'April',
      value: {x: 27, y: 7, z: 2}
    }, {
      name: 'May',
      value: {x: 29, y: 8.5, z: 4}
    }, {
      name: 'June',
      value: {x: 81, y: 3.9, z: 8}
    }, {
      name: 'July',
      value: {x: 33, y: 4.1, z: 7}
    }, {
      name: 'August',
      value: {x: 75, y: 4, z: 3}
    }, {
      name: 'September',
      value: {x: 39, y: 7, z: 4}
    }, {
      name: 'October',
      value: {x: 80, y: 2, z: 3}
    }, {
      name: 'November',
      value: {x: 48, y: 6.2, z: 2}
    }, {
      name: 'December',
      value: {x: 99, y: 4, z: 2}
    }],
    name: 'Series 02'
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
