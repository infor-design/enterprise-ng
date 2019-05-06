/// <reference path="./soho-notification.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class SohoNotificationService {
  public static ERROR: SohoNotificationType =  'error';
  public static ALERT: SohoNotificationType = 'alert';
  public static INFO: SohoNotificationType =  'info';
  public static SUCCESS: SohoNotificationType = 'success';

  /**
   * Show a notification using the specified options.
   */
  show(options: SohoNotificationOptions): void {
    jQuery('body').notification(options);
  }
}
