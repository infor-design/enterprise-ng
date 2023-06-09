import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-cards-workspace-widgets-demo',
  templateUrl: 'cards-workspace-widgets.demo.html',
})
export class CardsWorkspaceWidgetsComponent {
  public demoTasks: Object[];

  constructor() {
    this.demoTasks = [];
    this.demoTasks.push({ task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.' });
    this.demoTasks.push({ task: '063002', date: '10/11/2015', desc: 'Part #4212132 has low inventory level', disabled: true });
    this.demoTasks.push({ task: '063003', date: '10/07/2015', desc: 'Check #112412 parts ordering.' });
    this.demoTasks.push({ task: '063004', date: '10/07/2015', desc: 'Special fields test - New item has been created.' });
    this.demoTasks.push({ task: '063005', date: '10/11/2015', desc: 'Call XYZ Inc at 5 PM' });
    this.demoTasks.push({ task: '063006', error: true, date: '10/11/2015', desc: 'Part #4212132 has low inventory level' });
    this.demoTasks.push({ task: '063007', date: '07/11/2015', desc: 'Special fields test - New item has been created.' });
    this.demoTasks.push({ task: '063008', date: '10/11/2015', desc: 'Part #5212132 has low inventory level' });
    this.demoTasks.push({ task: '063009', date: '10/07/2015', desc: 'Check #212412 parts ordering.' });
    this.demoTasks.push({ task: '063010', date: '10/11/2015', desc: 'Special fields test - New item has been created.' });
    this.demoTasks.push({ task: '063011', date: '10/11/2015', desc: 'Call TMZ Inc at 5 PM' });
    this.demoTasks.push({ task: '063012', date: '07/08/2015', desc: 'Part #6212132 has low inventory level' });
  }

}
