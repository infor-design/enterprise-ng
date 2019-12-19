/**
 * Soho Week View.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho jQuery week view control.
 */

interface SohoWeekViewEvents {
  startDate: Date;
  endDate: Date;
  elem: Node;
  events: SohoWeekViewEvent[];
}

type SohoWeekViewColors = 'ruby' | 'azure' | 'amber' | 'emerald' | 'turquoise' | 'amethyst' | 'slate' | 'graphite';

interface SohoWeekViewTooltipFunction {
  eventData: SohoWeekViewEventData;
}

type SohoWeekViewEventData = (
  event?: SohoWeekViewEvent
) => void;

interface SohoWeekViewEventType {
  id: string;
  label: string;
  color: SohoWeekViewColors;
  checked: boolean;
  click: Function;
}

interface SohoWeekViewEvent {
  id?: string;
  type?: string;
  subject?: string;
  color?: SohoWeekViewColors;
  icon?: 'icon-error-solid' | 'icon-success-solid' | 'icon-alert-solid' | 'icon-info-solid' | string;

  starts?: string;
  startsHour?: string;
  startsLocale?: string;
  startKey?: string;

  ends?: string;
  endsHour?: string;
  endKey?: string;

  isAllDay?: boolean;
  eventTypes?: SohoWeekViewEventType[];
  shortSubject?: string;
  status?: string;

}

interface SohoWeekViewRenderEvent {
  elem: JQuery;
  endDate: number
  isDayView: boolean;
  startDate: number;
}

interface SohoWeekViewEventClickEvent {
  event?: SohoWeekViewEvent;
}

interface SohoWeekViewRenderMonthEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoWeekViewOptions {
  eventTypes?: SohoWeekViewEventType[];
  filteredTypes?: SohoWeekViewEvent[];
  events?: SohoWeekViewEvent[];
  locale?: string;
  firstDayOfWeek?: number;
  showViewChanger?: boolean;
  showToday?: boolean;
  startDate?: Date;
  endDate?: Date;
  showAllDay?: boolean;
  showTimeLine?: boolean;
  startHour?: number;
  endHour?: number;
  eventTooltip?: string | SohoWeekViewTooltipFunction;
  iconTooltip?: string | SohoWeekViewTooltipFunction;
  onRenderMonth?: Function;
}

interface SohoWeekView {
  settings: SohoWeekViewOptions;

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   * @param event The event object with common event properties.
   */
  addEvent(event: SohoWeekViewEvent): void;

  /**
   * Remove an event from the dataset and page. It uses the id property.
   * @param event The event object with common event properties.
   */
  deleteEvent(event: SohoWeekViewEvent): void;

  /**
   * Remove all events from the calendar
   */
  clearEvents(): void;

  /**
   * Updates the calendar with any new settings.
   */
  updated(settings?: SohoWeekViewOptions): void;

  /**
   * Update an event via the event object and show it if it should be visible in the calendar.
   * It uses the event id to do this.
   * @param event The event object with common event properties.
   */
  updateEvent(event: SohoWeekViewEvent): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  weekview(options?: SohoWeekViewOptions): JQuery;
  on(events: 'weekrendered', handler: JQuery.EventHandlerBase<any, SohoWeekViewRenderEvent>): this;
  on(event: 'eventclick', handler: JQuery.EventHandlerBase<any, SohoWeekViewEventClickEvent>): this;
  on(event: 'eventdblclick', handler: JQuery.EventHandlerBase<any, SohoWeekViewEventClickEvent>): this;
}
