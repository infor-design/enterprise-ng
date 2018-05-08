import { AfterViewChecked, Component, NgZone } from '@angular/core';

/**
 * This example:
 * - Shows how to make a simple tab component with an angular template.
 */
@Component({
  selector: 'test-tabs-basic', // tslint:disable-line
  templateUrl: './test-tabs-basic.demo.html',
})
export class TestTabsBasicComponent implements AfterViewChecked {
  private viewCheckCount = 0;
  public tabActivatedCount = 0;

  ngAfterViewChecked() {
    console.log('TestTabsBasicComponent.ngAfterViewChecked called ' + (++this.viewCheckCount) + ' times');
  }

  onTabActivated(event) {
    // NgZone.assertInAngularZone();
    this.tabActivatedCount++;
    console.log('TabsBasicDemoComponent.onTabActivated');
  }

  onAfterActivated(event) {
    // NgZone.assertInAngularZone();
    console.log('TabsBasicDemoComponent.onAfterActivated');
  }
}
