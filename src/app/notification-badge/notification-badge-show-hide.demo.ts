import {
  Component, OnInit, ViewChild,
} from '@angular/core';
import { SohoNotificationBadgeComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-notification-badge-show-hide-demo',
  templateUrl: 'notification-badge-show-hide.demo.html',
  styles: [`
  .container-spacer {flex-grow: 1}
  `]
})
export class NotificationBadgeShowHideDemoComponent implements OnInit {
  @ViewChild(SohoNotificationBadgeComponent) notificationBadge?: SohoNotificationBadgeComponent;
  public disabledButton = false;

  show(): void {
    this.disabledButton = false;
    this.notificationBadge?.show();
  }

  hide(): void {
    this.disabledButton = true;
    this.notificationBadge?.hide();
  }

  ngOnInit() { }
}
