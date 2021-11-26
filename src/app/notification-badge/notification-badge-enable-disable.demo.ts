import {
    Component, OnInit, ViewChild,
  } from '@angular/core';
import { SohoNotificationBadgeComponent } from 'ids-enterprise-ng';
  
  @Component({
    selector: 'app-notification-badge-enable-disable-demo',
    templateUrl: 'notification-badge-enable-disable.demo.html',
    styles: [`
    .container-spacer {flex-grow: 1}
    `]
  })
  export class NotificationBadgeEnableDisableDemoComponent implements OnInit {
    @ViewChild(SohoNotificationBadgeComponent) notificationBadge?: SohoNotificationBadgeComponent;
    public disabledButton = true;

    enable(): void {
      this.disabledButton = false;
      this.notificationBadge?.enable();
    }

    disable(): void {
      this.disabledButton = true;
      this.notificationBadge?.disable();
    }

    ngOnInit() {}
  }
