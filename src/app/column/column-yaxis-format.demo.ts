import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoColumnComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-column-yaxis-demo',
    templateUrl: 'column-yaxis-format.demo.html',
    standalone: false
})
export class ColumnYAxisDemoComponent implements OnInit {

  @ViewChild(SohoColumnComponent, { static: true }) sohoColumnComponent?: SohoColumnComponent;

  public columnData = [{
    data: [{
      name: 'Automotive',
      shortName: 'Auto',
      abbrName: 'A',
      value: 0.7,
      tooltip: 'Custom Tooltip - {{value}}'
    }, {
      name: 'Distribution',
      shortName: 'Dist',
      abbrName: 'D',
      value: 0.10
    }, {
      name: 'Equipment',
      shortName: 'Equip',
      abbrName: 'E',
      value: 1.4
    }, {
      name: 'Fashion',
      shortName: 'Fash',
      abbrName: 'F',
      value: 1.0
    }, {
      name: 'Food',
      shortName: 'Food',
      abbrName: 'F',
      value: 0.14
    }, {
      name: 'Healthcare',
      shortName: 'Health',
      abbrName: 'H',
      value: 4.8
    }, {
      name: 'Other',
      shortName: 'Other',
      abbrName: 'O',
      value: 2.7
    }]
  }];

  public columnType = 'column';

  constructor() { }
  public yAxis?: {};

  ngOnInit() {
    this.yAxis = {
      ticks: {
        number: 5, // Tip: round max data value
        format: 'd'
      }
    };
  }
}
