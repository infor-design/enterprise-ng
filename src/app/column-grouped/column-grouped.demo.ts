import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoRadarComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-column-demo',
  templateUrl: './column-grouped.demo.html',
})
export class ColumnGroupedDemoComponent implements OnInit {

  public columnGroupedData = [{
    data: [{
      name: 'Jan', value: 12
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
    }],
    name: 'Component C'
  }];

  public columnType = 'column-grouped';

  constructor() {}
  ngOnInit() {}
}
