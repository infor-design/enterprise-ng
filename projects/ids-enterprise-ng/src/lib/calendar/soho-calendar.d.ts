/**
 * Soho Calendar.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery calendar control.
 */

interface SohoCalendarEventType {
  id: string;
  label: string;
  color: string;
  checked: boolean;
  click: Function;
}

interface SohoCalendarEvent {
  title: string;
  subject: string,
  isAllDay: boolean;
  comments: string;
}

interface SohoCalendarOptions {
  eventTypes?: SohoCalendarEventType[];
  events?: SohoCalendarEvent[];
  locale?: string,
  month?: number;
  year?: number;
  showViewChanger?: boolean;
  onRenderMonth?: Function;
  onSelected?: Function;
  template?: string;
  upcomingEventDays?: number;
  modalTemplate?: string;
  menuId?: string;
  menuSelected?: string;
  newEventDefaults?: SohoCalendarEvent;
}

interface SohoCalendar {
  settings: SohoCalendarOptions;

  /**
   * Get the current selected date on the calendar.
   * @returns the currently selected date on the control.
   */
  currentDate(): Date;

  /**
   * Get the events and date for the currently selected calendar day.
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoCalendarEvent[];

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   * @param event The event object with common event properties.
   */
  addEvent(event: SohoCalendarEvent): void;

  /**
   * Update an event via the event object and show it if it should be visible in the calendar.
   * It uses the event id to do this.
   * @param event The event object with common event properties.
   */
  updateEvent(event: SohoCalendarEvent): void;

  /**
   * Remove an event from the dataset and page. It uses the id property.
   * @param event The event object with common event properties.
   */
  deleteEvent(event: SohoCalendarEvent): void;

  /**
   * Remove all events from the calendar
   */
  clearEvents(): void;

  /** Updates the calendar with any new settings. */
  updated(): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  calendar(options?: SohoCalendarOptions): JQuery;
}
