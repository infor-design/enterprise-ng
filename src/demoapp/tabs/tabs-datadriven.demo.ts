
import {
  Component,
  OnInit
} from '@angular/core';

import { TABS_COMPONENTS, TabsEvent } from '../.';

@Component({
  moduleId: module.id,
  selector: 'tabs-datadriven-demo',
  templateUrl: './tabs-datadriven.demo.html',
  directives: [ TABS_COMPONENTS ]
})
export class TabsDataDrivenDemoComponent implements OnInit {

  protected tabs: Array<{id: string, title: string, content: string}> = [
    { id: 'one',   title: 'One',   content: 'Tab One Content' },
    { id: 'two',   title: 'Two',   content: 'Tab Two Content' },
    { id: 'three', title: 'Three', content: 'Tab Three Content' },
    { id: 'four',  title: 'Four',  content: 'Tab Four Content' }
  ];

  ngOnInit() {
  }

  onTabActivated(event: TabsEvent) {
    console.log('TabsDataDrivenDemoComponent.onTabActivated');
  }
}
