/**
 * Soho Notification.
 * This file contains the TypeScript mappings for the public
 * interface of the Soho jQuery notification component.
 */

/**
 * The possible options available to control the position of the popup.
 */
type SohoNotificationType = 'error' | 'alert' | 'info' | 'success';

/**
* Notification Options
*/
interface SohoNotificationOptions {
  /** ID of notification */
  id?: string;

  /** The title string in the notification. */
  message: string;

  /** The type string icon displayed in the notification. */
  type: SohoNotificationType;

  /** The parent string selector where the notification prepends. */
  parent?: string;

  /** The link string url for the hyperlink. */
  link?: string;

  /** The text to show in the hyperlink. Leave empty for no link. */
  linkText?: string;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoNotificationStatic {
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  notification: SohoNotificationStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  notification(options?: SohoNotificationOptions): JQuery;
}
