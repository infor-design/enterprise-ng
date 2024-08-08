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
    this.notificationService.show({ id: `notif-${this.counter++}`, closeCallback: this.callbackFunc, message: `${this.counter}) This is a Notification Message`, type });
  }

  closeFirstNotification() {
    this.notificationService.close(`notif-${this.counter > 0 ? this.current++ : ''}`);

    if (this.counter > 0) {
      this.counter--;

      if (this.counter === 0) {
        this.current = 0;
      }
    }
  }

  callbackFunc(): void {
    console.log('Notification closed');
  }

  closeLatestNotification() {
    this.notificationService.closeLatest();

    if (this.counter > 0) {
      this.counter--;

      if (this.counter === 0) {
        this.current = 0;
      }
    }
  }

  closeAllNotification() {
    this.notificationService.closeAll();

    if (this.counter > 0) {
      this.counter = 0;
      this.current = 0;
    }
  }
}
