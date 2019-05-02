/**
 * Soho Notification.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho jQuery notification control.
 */

 /**
  * Notification Options
  */

interface SohoNotificationOptions {

  /** The title string in the notification. */
  message: string;

  /** The type string icon displayed in the notification. */
  type: string;

  /** The parent string selector where the notification prepends. */
  parent: string;

  /** The link string url for the hyperlink. */
  link: string;

  /** The text to show in the hyperlink. Leave empty for no link. */
  linkText: string;

}

/**
 * JQuery Integration
 */

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  notification(options?: SohoNotificationOptions): JQuery;
}
