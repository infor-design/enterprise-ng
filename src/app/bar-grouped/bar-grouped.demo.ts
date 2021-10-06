import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoBarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-bar-demo',
  templateUrl: 'bar-grouped.demo.html',
})
export class BarGroupedDemoComponent implements OnInit {

  @ViewChild(SohoBarComponent, { static: true }) sohoBarComponent?: SohoBarComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoBarSelected  = {groupName: 'name', groupValue: 'Component B'};
  private selection: SohoBarSelected  = {groupIndex: 2};

  public barGroupedData = [{
    data: [{
      name: 'Jan', value: 12,
    }, {
      name: 'Feb', value: 11
    }, {
      name: 'Mar', value: 14
    }, {
      name: 'Apr', value: 10
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
    }],
    name: 'Component C'
  }];

  public barType = 'bar-grouped';

  constructor() {}

  ngOnInit() {}

  setChartSelection() {
    const SohoBarSelected: SohoBarSelected = this.selection;
    this.sohoBarComponent?.setSelected(SohoBarSelected);
  }

  toggleChartSelection () {
    const SohoBarSelected: SohoBarSelected = this.selection;
    this.sohoBarComponent?.toggleSelected(SohoBarSelected);
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
