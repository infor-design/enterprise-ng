/**
 * Soho Monthview.
 * 
 * This file contains the TypeScript mapping for the public
 * interface of the Soho JQuery monthview control.
 */

type SohoMonthViewColors = 'ruby' | 'azure' | 'amber' | 'emerald' | 'turquoise' | 'amethyst' | 'slate' | 'graphite';

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
  inPageExpanded?: string;
  firstDayOfWeek?: number;
  showToday?: boolean;
  isMonthPicker?: boolean;
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