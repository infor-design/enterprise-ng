import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoRadarComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-bullet-demo',
  templateUrl: './bullet.demo.html',
})
export class BulletDemoComponent implements OnInit {

  public bulletData1 = [{
    data: [
      {'title': 'Revenue',
      'subtitle': 'US$, in thousands',
      'ranges': [150, 225, 300, 400, 600],
      'measures': [220, 270],
      'markers': [250],
      url: 'http://someplace.com',
        tooltip: ['<b>Poor</b> 150', '<b>Ok</b> 225', '<b>Good</b> 300', '<b>Excellent</b> 400', '<b>Revenue</b> 600']
      }
    ],
    barColors: ['#C0EDE3', '#8ED1C6', '#69ADA3', '#448D83', '#206B62'],
    lineColors: ['#000000', '#000000', '#000000'],
    markerColors: ['#000000']
  }];

  public bulletData2 = [{
    data: [
      {'title': 'Profit',
      'subtitle': '%',
      'ranges': [20, 25, 30],
      'measures': [17, 21],
      'markers': [26]
      }
    ],
    barColors: ['#ADD8EB', '#69B5DD', '#368AC0'],
    lineColors: ['#000000', '#000000', '#000000'],
    markerColors: ['#000000']
  }];

  constructor() {}
  ngOnInit() {}

  onRendered(event: Event) {
    console.log('Soho Radar: onRender', event);
  }

}
