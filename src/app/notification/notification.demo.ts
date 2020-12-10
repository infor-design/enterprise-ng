import {
  Component,
  OnInit
} from '@angular/core';

import { SohoNotificationService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-notification-demo',
  templateUrl: 'notification.demo.html',
  styles: [`#show-notification-btn{bottom: 20px; right: 20px; position: fixed;}`]
})
export class NotificationDemoComponent implements OnInit {
  // Inject Notification Servivce as a dependency and get an instance variable
  constructor(private notificationService: SohoNotificationService) { }
  ngOnInit() { }

  showNotification(type: SohoNotificationType = SohoNotificationService.INFO) {
    this.notificationService.show({ parent: '.page-container.scrollable', message: 'This is a Toast message', type });
  }
}
