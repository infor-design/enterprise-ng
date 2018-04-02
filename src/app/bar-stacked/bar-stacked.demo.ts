import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'soho-bar-demo',
  templateUrl: './bar-stacked.demo.html',
})
export class BarStackedDemoComponent implements OnInit {

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

}
