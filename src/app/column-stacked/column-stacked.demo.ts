import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {SohoColumnComponent} from '../../soho/column';

@Component({
  selector: 'soho-column-demo',
  templateUrl: './column-stacked.demo.html',
})
export class ColumnStackedDemoComponent implements OnInit {

  @ViewChild(SohoColumnComponent) sohoColumnComponent: SohoColumnComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  private selection: SohoColumnSelected  = {fieldName: 'name', fieldValue: 'Mar'};
  // private selection: SohoColumnSelected  = {index: 8};

  public columnStackedData = [{
    data: [{
      name: 'Jan', value: 12,
    }, {
      name: 'Feb', value: 11
    }, {
      name: 'Mar', value: 14
    }, {
      name: 'Apr', value: 10
    }, {
      name: 'May', value: 14
    }, {
      name: 'Jun', value: 8
    }, {
      name: 'Jul', value: 7
    }, {
      name: 'Aug', value: 10
    }, {
      name: 'Sep', value: 9
    }, {
      name: 'Oct', value: 8
    }, {
      name: 'Nov', value: 10
    }, {
      name: 'Dec', value: 6
    }],
    name: 'Component A'
  }, {
    data: [{
      name: 'Jan', value: 22
    }, {
      name: 'Feb', value: 21
    }, {
      name: 'Mar', value: 24
    }, {
      name: 'Apr', value: 20
    }, {
      name: 'May', value: 24
    }, {
      name: 'Jun', value: 28
    }, {
      name: 'Jul', value: 27
    }, {
      name: 'Aug', value: 20
    }, {
      name: 'Sep', value: 29
    }, {
      name: 'Oct', value: 28
    }, {
      name: 'Nov', value: 20
    }, {
      name: 'Dec', value: 26
    }],
    name: 'Component B'
  }, {
    data: [{
      name: 'Jan', value: 32
    }, {
      name: 'Feb', value: 31
    }, {
      name: 'Mar', value: 34
    }, {
      name: 'Apr', value: 30
    }, {
      name: 'May', value: 34
    }, {
      name: 'Jun', value: 38
    }, {
      name: 'Jul', value: 37
    }, {
      name: 'Aug', value: 30
    }, {
      name: 'Sep', value: 39
    }, {
      name: 'Oct', value: 38
    }, {
      name: 'Nov', value: 30
    }, {
      name: 'Dec', value: 36
    }],
    name: 'Component C'
  }];

  public columnType = 'column-stacked';

  constructor() {}
  ngOnInit() {}

  setChartSelection() {
    const SohoColumnSelected: SohoColumnSelected = this.selection;
    this.sohoColumnComponent.setSelected(SohoColumnSelected);
  }

  toggleChartSelection () {
    const SohoColumnSelected: SohoColumnSelected = this.selection;
    this.sohoColumnComponent.toggleSelected(SohoColumnSelected);
  }
}
