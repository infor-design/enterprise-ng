
import {
  Component,
  OnInit
} from '@angular/core';

import {
  TabsComponent,
  TabsEvent
} from '../.';

@Component({
  moduleId: module.id,
  selector: 'tabs-datadriven-demo',
  templateUrl: './tabs-datadriven.demo.html',
  directives: [TabsComponent]
})
export class TabsDataDrivenDemoComponent implements OnInit {

  private tabs: Array<any> = [];

  ngOnInit() {
    this.tabs.push({id: 'one',   title: 'One',   content: 'Tab One Content'});
    this.tabs.push({id: 'two',   title: 'Two',   content: 'Tab Two Content'});
    this.tabs.push({id: 'three', title: 'Three', content: 'Tab Three Content'});
    this.tabs.push({id: 'four',  title: 'Four',  content: 'Tab Four Content'});
  }

  onTabActivated(event: TabsEvent) {
    console.log('TabsDataDrivenDemoComponent.onTabActivated');
  }
}
