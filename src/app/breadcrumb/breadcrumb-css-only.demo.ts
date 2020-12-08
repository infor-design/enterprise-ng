import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { SohoBreadcrumbComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-breadcrumb-demo',
  templateUrl: 'breadcrumb-css-only.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbCssOnlyDemoComponent {
  @ViewChild(SohoBreadcrumbComponent, { static: true }) sohoBreadcrumbComponent?: SohoBreadcrumbComponent;
}
