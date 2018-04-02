import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoRadarComponent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-column-demo',
  templateUrl: './column.demo.html',
})
export class ColumnDemoComponent implements OnInit {

  public columnData = [{
    data: [{
      name: 'Automotive',
      shortName: 'Auto',
      abbrName: 'A',
      value: 7,
      tooltip: 'Custom Tooltip - {{value}}'
    }, {
      name: 'Distribution',
      shortName: 'Dist',
      abbrName: 'D',
      value: 10
    }, {
      name: 'Equipment',
      shortName: 'Equip',
      abbrName: 'E',
      value: 14
    }, {
      name: 'Fashion',
      shortName: 'Fash',
      abbrName: 'F',
      value: 10
    }, {
      name: 'Food',
      shortName: 'Food',
      abbrName: 'F',
      value: 14
    }, {
      name: 'Healthcare',
      shortName: 'Health',
      abbrName: 'H',
      value: 8
    }, {
      name: 'Other',
      shortName: 'Other',
      abbrName: 'O',
      value: 7
    }]
  }];

  public columnType = 'column';

  constructor() {}
  ngOnInit() {}
}
