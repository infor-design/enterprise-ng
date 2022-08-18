/**
 * Soho Calendar.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery calendar control.
 */

interface SohoCalendarMonthViewEvent {
  startsLocale: string;
  endsLocale: string;
  type: string;
  duration: string;
  durationUnits?: string;
  durationHours?: string;
  status: string;
  comments: string;
  icon?: string;
  color?: string;
  borderColor?: string;
}

/**
 * returned by the getDayEvents() function
 */
interface SohoCalendarDayEvents {
  date: Date;
  elem: Node;
  events: SohoCalendarEvent[];
}

type SohoCalendarColors = 'ruby' | 'azure' | 'amber' | 'emerald' | 'turquoise' | 'amethyst' | 'slate' | 'graphite';

interface SohoCalendarTooltipFunction {
  eventData: SohoCalendarEventData;
}

type SohoCalendarEventData = (
  month?: number,
  year?: number,
  event?: SohoCalendarEvent
) => void;

interface SohoCalendarEventType {
  id: string;
  label: string;
  color: SohoCalendarColors;
  checked: boolean;
  click: Function;
  translationKey: string;
}

interface SohoCalendarEvent {
  id?: string;
  title?: string;
  type?: string;
  subject?: string;
  comments?: string;
  color?: SohoCalendarColors;
  icon?: 'icon-error-solid' | 'icon-success-solid' | 'icon-alert-solid' | 'icon-info-solid' | string;

  duration?: string;
  durationUnits?: string;
  durationHours?: string;
  daysUntil?: number;

  starts?: string;
  startsLocale?: string;
  startKey?: string;

  ends?: string;
  endsLocale?: string;
  endKey?: string;

  isAllDay?: boolean;
  location?: string;
  eventTypes?: SohoCalendarEventType[];
  shortSubject?: string;
  status?: string;
  isDays?: true;
}

interface SohoCalendarDateSelectedEvent {
  close?: boolean;
  day?: number;
  key?: string;
  month?: number;
  node?: Node;
  year?: number;
}

interface SohoCalendarEventClickEvent {
  month?: number;
  year?: number;
  event?: SohoCalendarEvent;
  originalEvent?: JQuery.TriggeredEvent;
}

interface SohoCalendarRenderMonthEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoCalendarWeekOptions {
  firstDayOfWeek?: string;
  startHour?: number;
  endHour?: number;
  showAllDay?: boolean;
  showTimeLine?: boolean;
}

interface SohoCalendarOptions {
  eventTypes?: SohoCalendarEventType[];
  events?: SohoCalendarEvent[];
  locale?: string;
  language?: string;
  year?: number;
  month?: number;
  day?: number;
  upcomingEventDays?: number;
  showViewChanger?: boolean;
  onRenderMonth?: Function; // (node: any, response: (SohoCalendarEvent, SohoCalendarEventType) => void) => void;
  onSelected?: Function; // (node: TNode, args: SohoCalendarDaySelectedEvent) => void;
  onChangeView?: Function;
  template?: string;
  mobileTemplate?: string;
  modalTemplate?: string;
  menuId?: string;
  menuSelected?: Function;
  newEventDefaults?: SohoCalendarEvent;
  eventTooltip?: string | SohoCalendarTooltipFunction;
  iconTooltip?: string | SohoCalendarTooltipFunction;
  showToday?: boolean;
  weekOptions?: SohoCalendarWeekOptions;
  disable?: SohoDatePickerDisable;
  showEventLegend?: boolean,
  dayLegend?: Array<SohoDatePickerLegend>;
  attributes?: Array<Object> | Object;
  displayRange?: Object;
  firstDayOfWeek?: number;
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
  getDayEvents(date: Date): SohoCalendarDayEvents;

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
   * Show a modal used to add/edit events. This uses the modalTemplate setting for the modal contents.
   * @param event The event object with common event properties for defaulting fields in the template.
   * @param done The callback for when the modal closes.
   */
  showEventModal(event: SohoCalendarEvent[], done: Function): void;

  /**
   * @returns whether or not this Modal is currently being displayed
   */
  modalVisible(): boolean;

  /**
   * Remove all events from the calendar
   */
  clearEvents(): void;

  /** Updates the calendar with any new settings. */
  updated(settings?: SohoCalendarOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  calendar(options?: SohoCalendarOptions): JQuery;
  on(events: 'selected', handler: JQuery.EventHandlerBase<any, SohoCalendarDateSelectedEvent>): this;
  on(events: 'monthrendered', handler: JQuery.EventHandlerBase<any, SohoCalendarRenderMonthEvent>): this;
  on(events: 'eventclick', handler: JQuery.EventHandlerBase<any, SohoCalendarEventClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'eventdblclick', handler: JQuery.EventHandlerBase<any, SohoCalendarEventClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'contextmenu', handler: JQuery.EventHandlerBase<any, SohoCalendarEventClickEvent>): this;
}
