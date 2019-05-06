import {
  Component,
  OnInit
} from '@angular/core';

import { SohoNotificationService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-notification-demo',
  templateUrl: './notification.demo.html'
})
export class NotificationDemoComponent implements OnInit {
  // Inject Notification Servivce as a dependency and get an instance variable
  constructor(private notificationService: SohoNotificationService) { }
  ngOnInit() { }

  showToast(type: SohoNotificationType = SohoNotificationService.ALERT) {
    this.notificationService({title: 'Sample Message', message: 'This is a Toast message', type: type});
  }
}
