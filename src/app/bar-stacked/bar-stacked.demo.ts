import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {SohoBarComponent} from '../../soho/bar';

@Component({
  selector: 'soho-bar-demo',
  templateUrl: './bar-stacked.demo.html',
})
export class BarStackedDemoComponent implements OnInit {

  @ViewChild(SohoBarComponent) sohoBarComponent: SohoBarComponent;

  private selection: SohoBarSelected  = {fieldName: 'name', fieldValue: '2009'};
  public barStackedData = [{
    data: [{
      name: '2008',
      value: 123
    }, {
      name: '2009',
      value: 234
    }, {
      name: '2010',
      value: 345,
    }],
    name: 'Series 1'
  }, {
    data: [{
      name: '2008',
      value: 235
    }, {
      name: '2009',
      value: 267
    }, {
      name: '2010',
      value: 573
    }],
    name: 'Series 2'
  }];

  public barType = 'bar-stacked';

  constructor() {}

  ngOnInit() {}

  setChartSelection() {
    const SohoBarSelected: SohoBarSelected = this.selection;
    this.sohoBarComponent.setSelected(SohoBarSelected);
  }

  toggleChartSelection () {
    const SohoBarSelected: SohoBarSelected = this.selection;
    this.sohoBarComponent.toggleSelected(SohoBarSelected);
  }
}
