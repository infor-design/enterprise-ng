import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoColumnComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-column-demo',
  templateUrl: 'column.demo.html',
})
export class ColumnDemoComponent implements OnInit {

  @ViewChild(SohoColumnComponent, { static: true }) sohoColumnComponent?: SohoColumnComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  private selection: SohoColumnSelected  = {fieldName: 'name', fieldValue: 'Equipment'};
  // private selection: SohoColumnSelected  = {index: 6};

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

  constructor() {}
  ngOnInit() {}

  setChartSelection() {
    const SohoColumnSelected: SohoColumnSelected = this.selection;
    this.sohoColumnComponent?.setSelected(SohoColumnSelected);
  }

  toggleChartSelection () {
    const SohoColumnSelected: SohoColumnSelected = this.selection;
    this.sohoColumnComponent?.toggleSelected(SohoColumnSelected);
  }

  onSelected (args: any) {
    console.log('selected', args);
  }

  onDblclick (args: any) {
    // Use only when `dblclick` is firing on our component
    if (!args.target) {
     console.log('double clicked', args);
    }
  }
}
