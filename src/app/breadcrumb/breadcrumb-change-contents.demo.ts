import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { SohoBreadcrumbComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-breadcrumb-demo',
  templateUrl: 'breadcrumb-change-contents.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbChangeContentsDemoComponent {
  private _i = 1;
  @ViewChild(SohoBreadcrumbComponent, { static: true }) sohoBreadcrumbComponent: SohoBreadcrumbComponent;

  /**
   * Enables template-driven updating of the CSS-only breadcrumb chain.
   */
  public get someData() {
    return this._i;
  }

  /**
   * Targets the API-driven Breadcrumb Component on the page, and updates the contents
   * of the last breadcrumb item in the chain.
   */
  public increment() {
    const targetBreadcrumb = this.sohoBreadcrumbComponent.breadcrumbAPIs[2];

    console.log(`Incrementing ${this._i++}`);
    targetBreadcrumb.settings.content = `${this._i}`;
    targetBreadcrumb.refresh();
  }
}
