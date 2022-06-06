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
  hideDays?: boolean;
  disable?: SohoDatePickerDisable;
  yearsAhead?: number;
  yearsBack?: number;
  range?: SohoMonthViewRange[];
  selectable?: boolean;
  onSelected?: boolean;
  onKeyDown?: boolean;
  showNextPrevious?: boolean;
  onChangeView?: Function;
  attributes?: Array<Object> | Object;
}

interface SohoMonthViewRange {
  useRange: boolean;
  start: string | Date;
  end: string | Date;
  separator: string;
  minDays: number;
  maxDays: number;
  selectForward: boolean;
  selectBackward: boolean;
  includeDisabled: boolean;
}

interface SohoMonthViewLegend {
  name: string;
  color: string;
  dates: string[];
  dayOfWeek: Array<number>;
}

interface SohoMonthViewRenderEvent {
  api: any;
  elem: JQuery;
  month: number;
  year: number;
}

interface SohoMonthView {
  settings: SohoMonthViewOptions;

  /** Set range selection */
  setRangeSelection(): void;

  /** Set disable Date */
  setDisabled(): void;

  /** Loads legend list to the monthview settings. */
  loadLegend(legend: SohoMonthViewLegend[] | undefined): void;

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

interface SohoMonthViewSelectedEvent {
  close?: boolean;
  day?: number;
  key?: string;
  month?: number;
  node?: Node;
  year?: number;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  monthview(options?: SohoMonthViewOptions): JQuery;
  on(events: 'monthrendered', handler: JQuery.EventHandlerBase<any, SohoMonthViewRenderMonthEvent>): this;
  on(events: 'selected', handler: JQuery.EventHandlerBase<any, SohoMonthViewSelectedEvent>): this;
}
