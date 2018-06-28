import {
  Component,
  ViewChild
 } from '@angular/core';

 import {
   SohoListViewComponent
 } from 'ids-enterprise-ng';

import { ContentType } from './content-type.model';
import { ContentTypeService } from './content-type.service';

@Component({
  selector: 'soho-listview-demo',
  templateUrl: './listview.demo.html',
  styles: [`
    .smaller-width {
      width: calc(100% - 39px);
    }
  `],
  providers: [ContentTypeService]
})
export class ListViewDemoComponent {

  @ViewChild('singleSelectListView') singleSelectListView: SohoListViewComponent;

  @ViewChild('multipleSelectListView') multipleSelectListView: SohoListViewComponent;

  @ViewChild('mixedSelectionListView') mixedSelectionListView: SohoListViewComponent;

  public errorMessage: any;
  public demoTasks: Object[];
  public loadTasks: Object[];
  private counter = 63012;
  public dates = [
    '10/11/2015',
    '10/07/2015',
    '07/11/2015',
    '07/08/2015',
  ];
  public descCounter = 0;
  public contentTypes: ContentType[];

  constructor(private _contentService: ContentTypeService) {
    this._contentService.getContentTypes()
    .subscribe(contentTypes => {
      this.contentTypes = contentTypes;
      console.log(this.contentTypes);
    },
    error => this.errorMessage = error);

    this.demoTasks = [];
    this.loadTasks = [];
    this.demoTasks.push({task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063002', date: '10/11/2015' , desc: 'Part #4212132 has low inventory level', disabled: true});
    this.demoTasks.push({task: '063003', date: '10/07/2015' , desc: 'Check #112412 parts ordering.', selected: true});
    this.demoTasks.push({task: '063004', date: '10/07/2015' , desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063005', date: '10/11/2015' , desc: 'Call XYZ Inc at 5 PM', selected: true});
    this.demoTasks.push({task: '063006', error: true, date: '10/11/2015' , desc: 'Part #4212132 has low inventory level'});
    this.demoTasks.push({task: '063007', date: '07/11/2015' , desc: 'Special fields test - New item has been created.'});
    this.demoTasks.push({task: '063008', date: '10/11/2015' , desc: 'Part #5212132 has low inventory level'});
    this.demoTasks.push({task: '063009', date: '10/07/2015' , desc: 'Check #212412 parts ordering.', selected: true});
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

  selectItems(listView: SohoListViewComponent) {
    for (let i = 0; i < listView.items.length; i++) {
      setTimeout(() => listView.select(i), i * 1000);
    }
  }

  unselectItems(listView: SohoListViewComponent) {
    listView.unselect(listView.items.map((item) => item.selector));
  }

  removeItems(listView: SohoListViewComponent) {
    listView.remove(listView.items.map((e) => e.index));

    this.demoTasks = [];
  }

  load() {
    setTimeout(() => {
    let temp = this.loadTasks;
    this.loadTasks = [];
    this.loadTasks.push({task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.'});
    this.loadTasks.push({task: '063002', date: '10/11/2015' , desc: 'Part #4212132 has low inventory level', disabled: true});
    this.loadTasks.push({task: '063003', date: '10/07/2015' , desc: 'Check #112412 parts ordering.', selected: true});
    this.loadTasks.push({task: '063004', date: '10/07/2015' , desc: 'Special fields test - New item has been created.'});
    this.loadTasks.push({task: '063005', date: '10/11/2015' , desc: 'Call XYZ Inc at 5 PM', selected: true});
    this.loadTasks.push({task: '063006', error: true, date: '10/11/2015' , desc: 'Part #4212132 has low inventory level'});
    this.loadTasks.push({task: '063007', date: '07/11/2015' , desc: 'Special fields test - New item has been created.'});
    this.loadTasks.push({task: '063008', date: '10/11/2015' , desc: 'Part #5212132 has low inventory level', selected: true});
    this.loadTasks.push({task: '063009', date: '10/07/2015' , desc: 'Check #212412 parts ordering.'});
    this.loadTasks.push({task: '063010', date: '10/11/2015' , desc: 'Special fields test - New item has been created.'});
    this.loadTasks.push({task: '063011', date: '10/11/2015' , desc: 'Call TMZ Inc at 5 PM'});
    this.loadTasks.push({task: '063012', date: '07/08/2015' , desc: 'Part #6212132 has low inventory level'});
    temp = null;
    }, 1000);
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

  onItemActivated(event: any) {
    console.log('Item Activated', event);
  }

  onItemDeactivated(event: any) {
    console.log('Item Deactivated', event);
  }

  activatedItem() {
    console.log('activatedItem', this.mixedSelectionListView.activatedItem());
  }

  activateItem() {
    console.log('activateItem at index 2');
    this.mixedSelectionListView.activateItem(2);
  }

  deactivateItem() {
    console.log('deactivateItem');

    const activatedItem = this.mixedSelectionListView.activatedItem();
    if (activatedItem && activatedItem.index > -1) {
      this.mixedSelectionListView.deactivateItem(activatedItem.index);
    } else {
      console.log('cannot deactivate, must activate an item first.');
    }
  }
}
