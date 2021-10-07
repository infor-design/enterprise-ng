import { Injectable } from '@angular/core';

@Injectable()
export class SohoNotificationService {
  public static ERROR: SohoNotificationType = 'error';
  public static ALERT: SohoNotificationType = 'alert';
  public static INFO: SohoNotificationType = 'info';
  public static SUCCESS: SohoNotificationType = 'success';

  private notifApis: Array<JQuery.PlainObject> = [];

  /**
   * Show a notification using the specified options.
   */
  show(options: SohoNotificationOptions): void {
    this.notifApis.push(jQuery('body').notification(options).data('notification'));
  }

  /**
   * Hide a specified notification
   * @param id id of notification
   */
  hide(id: string): void {
    // find api in array, if exist then close
    if (this.notifApis.length > 0) {
      const index = this.notifApis.findIndex((notif) => {
        if (Array.isArray(notif.settings.attributes)) {
          return notif.settings.attributes.some((attribute: any) => attribute.name === 'id' && attribute.value === id);
        } else {
          return notif.settings.attributes.name === 'id' && notif.settings.attributes.value === id;
        }
      });

      if (index >= 0) {
        this.notifApis[index].close();
        this.notifApis.splice(index, 1);
      }
    }
  }
}
