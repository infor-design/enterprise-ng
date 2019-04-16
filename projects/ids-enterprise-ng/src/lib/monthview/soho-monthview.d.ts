/**
 * Soho Monthview.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho calendar control.
 */

interface SohoMonthViewEvent {
  startsLocale: string;
  endsLocale: string;
  type: string;
  duration: string;
  durationUnits?: string;
  durationHours?: string;
  status: string;
  comments: string;
  icon?: string;
}

interface SohoMonthViewRenderMonthEvent {
  node: any;
  response: any;
}

/**
 * MonthView Options
 */
interface SohoMonthViewOptions {
  month?: [];
  year?: [];
  upcomingEventDays?: [];
  showMonthYearPicker?: boolean;
  onSelected?: any;
  onRenderMonth?: any;
}

/**
 * This interface represents the public API exposed by the
 * calendar.
 */
interface SohoMonthViewStatic {
  settings: SohoMonthViewOptions;
  updated(settings: SohoMonthViewOptions): void;
  destroy(): void;
  getDayEvents(date?: string): any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  monthView: SohoMonthViewStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  monthview(options?: SohoMonthViewOptions): JQuery;
}

/**
 * Type safe event.
 */
interface SohoMonthViewEvent extends JQuery.TriggeredEvent {
}
