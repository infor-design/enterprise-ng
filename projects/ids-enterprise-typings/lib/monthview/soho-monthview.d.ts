/**
 * Soho Monthview.
 * 
 * This file contains the TypeScript mapping for the public
 * interface of the Soho JQuery monthview control.
 */

interface SohoMonthViewOptions {
  locale?: string;
  language?: string;
  month?: number;
  year?: number;
  day?: number;
  activeDate?: number;
  activeDateIslamic?: number;
  isPopup?: boolean;
  inPage?: boolean;
  inPageTitleAsButton?: boolean;
  inPageToggleable?: boolean;
  inPageExpanded?: boolean;
  firstDayOfWeek?: number;
  showToday?: boolean;
  isMonthPicker?: boolean;
  showMonthYearPicker?: boolean;
  showLegend?: boolean;
  legend?: SohoMonthViewLegend[];
}

interface SohoMonthViewLegend {
  name: string;
  color: string;
  date: string[];
}

interface SohoMonthViewRenderEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoMonthView {
  settings: SohoMonthViewOptions;

  appendMonthYearPicker(month: SohoMonthViewOptions, year: SohoMonthViewOptions): void;

  firstDayOfMonth(year: SohoMonthViewOptions, month: SohoMonthViewOptions): number;

  setRangeSelection(): void;

  setDisabled(): void;

  /** Tear down the markup for the control */
  teardown(): void;

  /** Updates the monthview with any new settings */
  updated(): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoMonthViewRenderMonthEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  monthview(options?: SohoMonthViewOptions): JQuery;
  on(events: 'monthrendered', handler: JQuery.EventHandlerBase<any, SohoMonthViewRenderMonthEvent>): this;
}
