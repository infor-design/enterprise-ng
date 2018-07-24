import { Component, HostBinding } from '@angular/core';

/**
 * This example:
 * - Shows how to make a tab component with the tabs on the left side.
 */
@Component({
  selector: 'div[vertical-tabs-demo]', // tslint:disable-line
  templateUrl: './tabs-vertical.demo.html'
})
export class TabsVerticalDemoComponent {

  /**
   * Have to make this 100% height or tab component won't display all the way to
   * the bottom of the screen.
   * @returns the height of the style.height style.
   */
  @HostBinding('style.height') get tabsHeightStyle() { return '100%'; }
  constructor() {
    console.log('ub');
  }
  onTabActivated(event: SohoTabsEvent) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
  }
}
