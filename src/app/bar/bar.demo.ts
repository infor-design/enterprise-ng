import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'soho-bar-demo',
  templateUrl: './bar.demo.html',
})
export class BarDemoComponent implements OnInit {

  public barData = [{
    data: [{
      name: 'Category A',
      value: 373,
      url: 'test'
      }, {
        name: 'Category B',
        value: 372
      }, {
        name: 'Category C',
        value: 236.35
    }],
    name: ''
  }];

  public barType = 'bar';
  constructor() {}

  ngOnInit() {}

}
