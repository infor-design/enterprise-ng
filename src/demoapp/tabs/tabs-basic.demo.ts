import {
  Component
} from '@angular/core';

import {
  TabsComponent,
  TabsEvent
} from '../.';

@Component({
  moduleId: module.id,
  selector: 'tabs-basic-demo',
  templateUrl: './tabs-basic.demo.html',
  directives: [TabsComponent]
})
export class TabsBasicDemoComponent {

  onTabActivated(event: TabsEvent) {
    console.log('TabsBasicDemoComponent.onTabActivated');
  }
}
