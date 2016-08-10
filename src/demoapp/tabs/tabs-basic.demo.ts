import { Component } from '@angular/core';
import { TABS_DIRECTIVES, TabsEvent } from '../';

/**
 * This example:
 * - Shows how to make a simple tab component with an angular template.
 */
@Component({
  moduleId: module.id,
  selector: 'tabs-basic-demo',
  templateUrl: './tabs-basic.demo.html',
  directives: [ TABS_DIRECTIVES ]
})
export class TabsBasicDemoComponent {
  onTabActivated(event: TabsEvent) {
    console.log('TabsBasicDemoComponent.onTabActivated');
  }
}
