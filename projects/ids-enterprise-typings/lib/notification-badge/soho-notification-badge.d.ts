/**
 * Soho Notification Badge.
 * This file contains the TypeScript mappings for the public
 * interface of the Soho jQuery notification badge component.
 */

/**
 * Options for the color of dot
 */
type SohoNotificationBadgeColor = 'alert' | 'warning' | 'yield' | 'complete' | 'progress' | 'caution' | string;

/**
 * Options for the position of dot
 */
type SohoNotificationBadgePosition = 'upper-left' | 'upper-right' | 'lower-left' | 'lower-right' | string;

/**
 * Notification Options
 */
interface SohoNotificationBadgeOptions {
  /** The placement of notification badge. */
  position?: SohoNotificationBadgePosition;

  /** The color of the notification badge. */
  color?: SohoNotificationBadgeColor;

  /** Add extra attributes like id's to the component */
  attributes?: Array<Object> | Object;
}

interface SohoNotificationBadge {
  settings: SohoNotificationBadgeOptions;

  /**
   * Show the NotificationBadge
   */
  show(): void;

  /**
  * Hide the NotificationBadge
  */
  hide(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  notificationbadge(options?: SohoNotificationBadgeOptions): JQuery;
}
