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
  private current = 0;
  // Inject Notification Servivce as a dependency and get an instance variable
  constructor(private notificationService: SohoNotificationService) { }
  ngOnInit() { }

  showNotification(type: SohoNotificationType = SohoNotificationService.INFO) {
    this.notificationService.show({ id: `notif-${this.counter++}`, parent: '.page-container.scrollable', message: `${this.counter}) This is a Toast message`, type });
  }

  hideFirstNotification() {
    if (this.counter > 0) {
      this.notificationService.hide(`notif-${this.current++}`);
      this.counter--;

      if (this.counter === 0) {
        this.current = 0;
      }
    }
  }

  hideLatestNotification() {
    if (this.counter > 0) {
      this.notificationService.hideLatest();
      this.counter--;

      if (this.counter === 0) {
        this.current = 0;
      }
    }
  }

  hideAllNotification() {
    if (this.counter > 0) {
      this.notificationService.hideAll();
      this.counter = 0;
      this.current = 0;
    }
  }
}
