import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoBreadcrumbComponent } from 'ids-enterprise-ng';

import { STANDARD_DATA } from './breadcrumb-demo-data';

@Component({
    selector: 'app-breadcrumb-demo',
    templateUrl: 'breadcrumb.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BreadcrumbDemoComponent {
  @ViewChild(SohoBreadcrumbComponent, { static: true }) sohoBreadcrumbComponent?: SohoBreadcrumbComponent;

  public breadcrumbs = STANDARD_DATA;
}
