import { Component } from '@angular/core';
import { TabsEvent } from '../../components/tabs';

/**
 * This example:
 * - Shows how to make a simple tab component with an angular template.
 */
@Component({
  selector: 'tabs-basic-demo',
  templateUrl: './tabs-basic.demo.html',
})
export class TabsBasicDemoComponent {
  onTabActivated(event: TabsEvent) {
    console.log('TabsBasicDemoComponent.onTabActivated');
  }
}
