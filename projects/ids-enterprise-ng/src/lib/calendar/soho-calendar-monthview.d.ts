// /**
//  * Soho Monthview.
//  *
//  * This file contains the Typescript mappings for the public
//  * interface of the Soho calendar control.
//  */
//
// interface SohoMonthViewEvent {
//   startsLocale: string;
//   endsLocale: string;
//   type: string;
//   duration: string;
//   durationUnits?: string;
//   durationHours?: string;
//   status: string;
//   comments: string;
//   icon?: string;
// }
//
// interface SohoMonthViewRenderMonthEvent {
//   node: any;
//   response: any;
// }
//
// interface SohoMonthViewSelectedEvent {
//   node: Node,
//   key: string;
//   day: number;
//   month: number;
//   year: number;
//   close: boolean;
// }
//
// /**
//  * MonthView Options
//  */
// interface SohoMonthViewOptions {
//   month?: number;
//   year?: number;
//   showMonthYearPicker?: boolean;
// }
//
// /**
//  * This interface represents the public API exposed by the
//  * calendar.
//  */
// interface SohoMonthViewStatic {
//   settings: SohoMonthViewOptions;
//   updated(): void;
//   destroy(): void;
//   getDayEvents(date?: string): any;
//   showMonth(month: number, year: number): void;
//   selectDay(date: string | object, closePopup?: boolean): void;
//   selectToday(): void;
// }
//
// /**
//  * JQuery Integration
//  */
// interface JQueryStatic {
//   monthView: SohoMonthViewStatic;
// }
//
// interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
//   monthview(options?: SohoMonthViewOptions): JQuery;
// }
