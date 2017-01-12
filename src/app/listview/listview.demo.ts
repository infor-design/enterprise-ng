import { Component } from '@angular/core';

@Component({
  selector: 'soho-listview-demo',
  templateUrl: './listview.demo.html',
  styles: [`
    .smaller-width {
      width: calc(100% - 39px);
    }
  `]
})
export class ListViewDemoComponent {
  private demoTasks: Object[];
  private counter = 63012;
  private dates = [
    '10/11/2015',
    '10/07/2015',
    '07/11/2015',
    '07/08/2015',
  ];
  private descCounter = 0;

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
  addItems() {
    // Make sure we are passing a new object to the listview as an input
    let temp = this.demoTasks;
    this.demoTasks = this.demoTasks.splice(0);
    this.demoTasks.push({
      task: `0${this.counter++}`,
      date: this.dates[Math.floor(Math.random() * this.dates.length)],
      desc: 'Description number ' + this.descCounter++,
    });
    temp = null;
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
}
