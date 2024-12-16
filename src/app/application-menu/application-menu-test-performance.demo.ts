import {
  AfterViewChecked,
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
// @ts-ignore
import { SohoToolbarFlexComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-menu-test-performance-demo',
    templateUrl: 'application-menu-test-performance.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApplicationMenuTestPerfDemoComponent implements AfterViewChecked {

  @ViewChild(SohoToolbarFlexComponent) sohoFlexToolbar?: SohoToolbarFlexComponent;

  public checkBox1Value = false;
  public updateToolbar = false;

  constructor() {}

  ngAfterViewChecked() {
    if (this.updateToolbar) {
      (this.sohoFlexToolbar as any).updated();
      this.updateToolbar = false;
    }
  }

  public checkChanged() {
    this.updateToolbar = this.checkBox1Value;
  }
}
