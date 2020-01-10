/**
 * Soho Weekview.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Weekview control.
 */

interface SohoWeekviewDayEvents {
  date: Date;
  elem: Node;
  events: SohoWeekviewEvent[];
}

// @ts-ignore
type SohoWeekviewColors = 'ruby' | 'azure' | 'amber' | 'emerald' | 'turquoise' | 'amethyst' | 'slate' | 'graphite';

interface SohoWeekviewTooltipFunction {
  eventData: SohoWeekviewEventData;
}

// @ts-ignore
type SohoWeekviewEventData = (
  month?: number,
  year?: number,
  event?: SohoWeekviewEvent
) => void;

interface SohoWeekviewEventType {
  id: string;
  label: string;
  color: SohoWeekviewColors;
  checked: boolean;
  click: Function;
  translationKey: string;
}

interface SohoWeekviewEvent {
  id?: string;
  title?: string;
  type?: string;
  subject?: string;
  comments?: string;
  color?: SohoWeekviewColors;
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
  eventTypes?: SohoWeekviewEventType[];
  shortSubject?: string;
  status?: string;
  isDays?: true;
}

interface SohoWeekviewDateSelectedEvent {
  close?: boolean;
  day?: number;
  key?: string;
  month?: number;
  node?: Node;
  year?: number;
}

interface SohoWeekviewClickEvent {
  month?: number;
  year?: number;
  event?: SohoWeekviewEvent;
  originalEvent?: JQuery.TriggeredEvent;
}

interface SohoWeekviewRenderWeekEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoWeekviewOptions {
  eventTypes?: SohoWeekviewEventType[];
  events?: SohoWeekviewEvent[];
  locale?: string;
  showAllDay?: boolean;
  showToday?: boolean;
  showViewChanger?: boolean;
  eventTooltip?: string | SohoWeekviewTooltipFunction;
  iconTooltip?: string | SohoWeekviewTooltipFunction;
  onRenderWeek?: Function; // (node: any, response: (SohoWeekviewEvent, SohoWeekviewEventType) => void) => void;
  startDate?: Date;
  endDate?: Date;
  startHour?: number;
  endHour?: number;
  showTimeLine?: boolean;
  firstDayOfWeek?: boolean;
  onChangeToWeekDay?: Function;
  onChangeWeek?: Function;
}

interface SohoWeekview {
  settings: SohoWeekviewOptions;

  /**
   * Get the current selected date on the Weekview.
   * @returns the currently selected date on the control.
   */
  currentDate(): Date;

  /**
   * Get the events and date for the currently selected Weekview day.
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoWeekviewDayEvents;

  /**
   * Remove all events from the Weekview
   */
  clearEvents(): void;

  /** Updates the Weekview with any new settings. */
  updated(settings?: SohoWeekviewOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  weekview(options?: SohoWeekviewOptions): JQuery;
  on(events: 'selected', handler: JQuery.EventHandlerBase<any, SohoWeekviewDateSelectedEvent>): this;
  on(events: 'weekrendered', handler: JQuery.EventHandlerBase<any, SohoWeekviewRenderWeekEvent>): this;
  on(events: 'eventclick', handler: JQuery.EventHandlerBase<any, SohoWeekviewClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'eventdblclick', handler: JQuery.EventHandlerBase<any, SohoWeekviewClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'contextmenu', handler: JQuery.EventHandlerBase<any, SohoWeekviewClickEvent>): this;
}
