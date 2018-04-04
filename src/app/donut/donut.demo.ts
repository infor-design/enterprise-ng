import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'soho-pie-demo',
  templateUrl: './donut.demo.html',
})
export class DonutDemoComponent implements OnInit {

  public donutData = [{
    data: [{
      name: 'Component A',
      value: 16
    }, {
      name: 'Component B',
      value: 12
    }, {
      name: 'Component C',
      value: 14
    }],
    centerLabel: 'Donut Chart'
  }];

  constructor() {}

  ngOnInit() {}

  onRendered(event: Event) {
    console.log('Soho Radar: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Radar: Selected', event);
  }

  onDeSelected(event: Event) {
    console.log('Soho Radar: Deselected', event);
  }
}
