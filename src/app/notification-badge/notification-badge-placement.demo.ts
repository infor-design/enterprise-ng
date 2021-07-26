import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SohoNotificationBadgeComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-notification-badge-placement-demo',
  templateUrl: 'notification-badge-placement.demo.html'
})
export class NotificationBadgePlacementDemoComponent implements OnInit {
  @ViewChild(SohoNotificationBadgeComponent) sohoNotificationBadgeComponent?: SohoNotificationBadgeComponent;

  constructor(
    private element: ElementRef,
  ) {

  }

  ngOnInit(): void {
    console.log({ this: this, el: this.element.nativeElement });
  }
}
