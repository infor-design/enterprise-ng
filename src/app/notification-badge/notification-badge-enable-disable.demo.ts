import {
    Component, ViewChild,
  } from '@angular/core';
import { SohoNotificationBadgeComponent } from 'ids-enterprise-ng';
  
  @Component({
    selector: 'app-notification-badge-enable-disable-demo',
    templateUrl: 'notification-badge-enable-disable.demo.html',
    styles: [`
    .container-spacer {flex-grow: 1}
    `]
  })
  export class NotificationBadgeEnableDisableDemoComponent {
    @ViewChild(SohoNotificationBadgeComponent) notificationBadge?: SohoNotificationBadgeComponent;

    enable(): void {
      this.notificationBadge?.enable;
    }

    disable(): void {
      this.notificationBadge?.disable;
    }
  }
  