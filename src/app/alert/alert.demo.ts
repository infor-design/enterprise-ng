import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-alert-demo',
  templateUrl: './alert.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDemoComponent {
  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {
    sohoHeaderRef.instance.pageTitle = 'Alert Icons';
  }
}
