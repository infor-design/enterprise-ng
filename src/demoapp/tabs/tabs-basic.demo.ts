import { Component } from '@angular/core';
import { TABS_COMPONENTS, TabsEvent } from '../';

@Component({
  moduleId: module.id,
  selector: 'tabs-basic-demo',
  templateUrl: './tabs-basic.demo.html',
  directives: [ TABS_COMPONENTS ]
})
export class TabsBasicDemoComponent {

  onTabActivated(event: TabsEvent) {
    console.log('TabsBasicDemoComponent.onTabActivated');
  }
}
