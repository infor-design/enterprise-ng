import { Component } from '@angular/core';

@Component({
  selector:    'soho-homepage-demo',
  templateUrl: './homepage.demo.html',
})
export class HomePageDemoComponent {

  public demoTasks: Object[];

  public pieData = [{
    data: [{
      name: 'Component A',
      value: 7.6
    }, {
      name: 'Component B',
      value: 6.25
    }, {
      name: 'Component C',
      value: 4.35
    }, {
      name: 'Component D',
      value: 5.6
    }, {
      name: 'Component E',
      value: 11.6
    }, {
      name: 'Component F',
      value: 12.6
    }]
}];

  public barData = [
    {
      data: [
        {
          name:  '2008',
          value: 123
        }, {
          name:  '2009',
          value: 234
        }, {
          name:  '2010',
          value: 345
        }
      ],
      name: 'Series 1'
    }, {
      data: [
        {
          name:  '2008',
          value: 235
        }, {
          name:  '2009',
          value: 267
        }, {
          name:  '2010',
          value: 573
        }
      ],
      name: 'Series 2'
    }
  ];

  constructor() {
    this.demoTasks = [];
    this.demoTasks.push({task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063002', date: '10/11/2015' , desc: 'Part #4212132 has low inventory level', disabled: true});
    this.demoTasks.push({task: '063003', date: '10/07/2015' , desc: 'Check #112412 parts ordering.'});
    this.demoTasks.push({task: '063004', date: '10/07/2015' , desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063005', date: '10/11/2015' , desc: 'Call XYZ Inc at 5 PM'});
    this.demoTasks.push({task: '063006', error: true, date: '10/11/2015' , desc: 'Part #4212132 has low inventory level'});
    this.demoTasks.push({task: '063007', date: '07/11/2015' , desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063008', date: '10/11/2015' , desc: 'Part #5212132 has low inventory level'});
    this.demoTasks.push({task: '063009', date: '10/07/2015' , desc: 'Check #212412 parts ordering.'});
    this.demoTasks.push({task: '063010', date: '10/11/2015' , desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063011', date: '10/11/2015' , desc: 'Call TMZ Inc at 5 PM'});
    this.demoTasks.push({task: '063012', date: '07/08/2015' , desc: 'Part #6212132 has low inventory level'});
  }

  getBarChartData() {
    return this.barData;
  }

  getPieChartData() {
    return this.pieData;
  }

  onRendered(event: any) {
    console.log('Rendered listview: ' + event);
  }
  onSelected(event: any) {
    console.log('Selected item: ' + event);
  }
  onSorted(event: any) {
    console.log('Sorted: ' + event);
  }
  onBeforeOpen(event: any) {
  }
  onClose(event: any) {
  }
  onOpen(event: any) {

  }
}
