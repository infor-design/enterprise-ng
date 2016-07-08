
import {Component} from '@angular/core';

import {TabsComponent, TabsEvent} from '../../components';

@Component({
  moduleId: module.id,
  selector : 'tabs-basic-demo',
  directives : [TabsComponent],
  template : ''
})
export class TabsBasicSampleComponent {

    private onTabSelected(event:TabsEvent) {
        console.log("TabsBasicSampleComponent.onTabSelected: " + JSON.stringify(event));
    }
}
