import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'soho-bar-demo',
  templateUrl: './bar-grouped.demo.html',
})
export class BarGroupedDemoComponent implements OnInit {

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

}
