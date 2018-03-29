import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'soho-pie-demo',
  templateUrl: './pie.demo.html',
})
export class PieDemoComponent implements OnInit {

  public pieData = [{
    data: [{
        name: 'Item A',
        value: 10.1,
        id: 'ca',
        tooltip: 'Item A <b>{{percent}}</b>'
    }, {
        name: 'Item B',
        value: 12.2,
        id: 'cb',
        tooltip: 'Item B <b>{{percent}}</b>'
    }, {
        name: 'Item C',
        value: 14.35,
        tooltip: 'Item C <b>{{percent}}</b>'
    }, {
        name: 'Item D',
        value: 15.6,
        tooltip: 'Item D <b>{{percent}}</b>'
    }, {
        name: 'Item E',
        value: 21.6,
        tooltip: 'Item E <b>{{percent}}</b>'
    }, {
        name: 'Item F',
        value: 41.6,
        tooltip: 'Item F <b>{{percent}}</b>'
    }]
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
