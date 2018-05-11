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
  templateUrl: './column-grouped-xaxis-twoline.demo.html',
})
export class ColumnGroupedXaxisTwolineDemoComponent implements OnInit {

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
    name: 'Year:2018 Component-A'
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
    name: 'Year:2018 Component-B'
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
    name: 'Year:2018 Component-C'
  }];

  public columnType = 'column-grouped';

  constructor() {}
  public xAxis: {};
  ngOnInit() {
    this.xAxis = {
      formatText: function (d) {
        const text = d.split(' ');
        let markup = '';
        text.map(function (mapText, i) {
          markup += '<tspan x="0" dy="' + ((i + 1) * .50) + 'em">' + mapText.replace(':', ' ').replace('-', ' ') + '</tspan>';
        });
        return markup;
      }
    };
  }
}
