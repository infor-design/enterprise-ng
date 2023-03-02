import { Injectable } from '@angular/core';

@Injectable()
export class SohoNotificationService {
  public static ERROR: SohoNotificationType = 'error';
  public static ALERT: SohoNotificationType = 'alert';
  public static INFO: SohoNotificationType = 'info';
  public static SUCCESS: SohoNotificationType = 'success';

  /**
   * Show a notification using the specified options.
   */
  show(options: SohoNotificationOptions): void {
    jQuery('body').notification(options).data('notification').registerNotification();
  }

  /**
   * Hide a specified notification
   * 
   * @param id id of notification
   */
  close(id: string): void {
    jQuery('body').data('notification')?.close(id);
  }

  /**
   * Hide the latest notification in the list
   */
  closeLatest(): void {
    jQuery('body').data('notification')?.closeLatest();
  }

  /**
   * Hide all the notifications in the list
   */
  closeAll(): void {
    jQuery('body').data('notification')?.closeAll();
  }
}
