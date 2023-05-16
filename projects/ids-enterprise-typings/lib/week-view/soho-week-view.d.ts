/**
 * Soho Weekview.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Weekview control.
 */

interface SohoWeekViewDayEvents {
  date: Date;
  elem: Node;
  events: SohoWeekViewEvent[];
}

// @ts-ignore
type SohoWeekViewColors = 'ruby' | 'azure' | 'amber' | 'emerald' | 'turquoise' | 'amethyst' | 'slate' | 'graphite';

interface SohoWeekViewTooltipFunction {
  eventData: SohoWeekViewEventData;
}

// @ts-ignore
type SohoWeekViewEventData = (
  month?: number,
  year?: number,
  event?: SohoWeekViewEvent
) => void;

interface SohoWeekViewEventType {
  id: string;
  label: string;
  color: SohoWeekViewColors;
  checked: boolean;
  click?: Function | undefined;
  translationKey: string;
}

interface SohoWeekViewDayMap {
  key?: string;
  elem?: HTMLElement;
  footer?: HTMLElement;
  events?: SohoWeekViewEvent[];
}

interface SohoWeekViewEvent {
  id?: string;
  title?: string;
  type?: string;
  subject?: string;
  comments?: string;
  color?: SohoWeekViewColors;
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
  eventTypes?: SohoWeekViewEventType[];
  shortSubject?: string;
  status?: string;
  isDays?: true;
}

interface SohoWeekViewDateSelectedEvent {
  close?: boolean;
  day?: number;
  key?: string;
  month?: number;
  node?: Node;
  year?: number;
}

interface SohoWeekViewClickEvent {
  month?: number;
  year?: number;
  event?: SohoWeekViewEvent;
  originalEvent?: JQuery.TriggeredEvent;
}

interface SohoWeekViewRenderWeekEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoWeekViewOptions {
  eventTypes?: SohoWeekViewEventType[];
  filteredTypes?: [];
  events?: SohoWeekViewEvent[];
  locale?: string;
  stacked?: boolean;
  showFooter?: boolean;
  responsive?: boolean;
  hideToolbar?: boolean;
  showAllDay?: boolean;
  showToday?: boolean;
  showViewChanger?: boolean;
  eventTooltip?: string | SohoWeekViewTooltipFunction;
  iconTooltip?: string | SohoWeekViewTooltipFunction;
  onRenderWeek?: Function; // (node: any, response: (SohoWeekviewEvent, SohoWeekviewEventType) => void) => void;
  startDate?: Date;
  endDate?: Date;
  startHour?: number;
  endHour?: number;
  showTimeLine?: boolean;
  firstDayOfWeek?: boolean;
  onChangeToWeekDay?: Function;
  onChangeWeek?: Function;
  onChangeView?: Function;
  attributes?: Array<Object> | Object;
}

interface SohoWeekView {
  settings: SohoWeekViewOptions;

  dayMap: SohoWeekViewDayMap[];

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
  getDayEvents(date: Date): SohoWeekViewDayEvents;

  /**
   * Remove all events from the Weekview
   */
  clearEvents(): void;

  /** Updates the Weekview with any new settings. */
  updated(settings?: SohoWeekViewOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  weekview(options?: SohoWeekViewOptions): JQuery;
  on(events: 'selected', handler: JQuery.EventHandlerBase<any, SohoWeekViewDateSelectedEvent>): this;
  on(events: 'weekrendered', handler: JQuery.EventHandlerBase<any, SohoWeekViewRenderWeekEvent>): this;
  on(events: 'eventclick', handler: JQuery.EventHandlerBase<any, SohoWeekViewClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'eventdblclick', handler: JQuery.EventHandlerBase<any, SohoWeekViewClickEvent>): this;
  // tslint:disable-next-line:unified-signatures
  on(events: 'contextmenu', handler: JQuery.EventHandlerBase<any, SohoWeekViewClickEvent>): this;
}
