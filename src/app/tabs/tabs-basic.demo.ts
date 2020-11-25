import { Component } from '@angular/core';

/**
 * This example:
 * - Shows how to make a simple tab component with an angular template.
 */
@Component({
  selector: 'app-tabs-basic-demo',
  templateUrl: 'tabs-basic.demo.html',
})
export class TabsBasicDemoComponent {
  onTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
  }
}
