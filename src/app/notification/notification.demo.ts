import {
  Component,
  OnInit
} from '@angular/core';

import { SohoNotificationService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-notification-demo',
  templateUrl: 'notification.demo.html',
  styleUrls: ['notification.demo.css']
})
export class NotificationDemoComponent implements OnInit {
  private counter = 0;
  // Inject Notification Servivce as a dependency and get an instance variable
  constructor(private notificationService: SohoNotificationService) { }
  ngOnInit() { }

  showNotification(type: SohoNotificationType = SohoNotificationService.INFO) {
    this.notificationService.show({ id: `notif-${this.counter++}`, parent: '.page-container.scrollable', message: `${this.counter}) This is a Toast message`, type });
  }

  hideNotification() {
    if (this.counter > 0) {
      this.notificationService.hide(`notif-${--this.counter}`);
    }
  }
}
