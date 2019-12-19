/// <reference path="soho-week-view.d.ts" />

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'div[soho-week-view]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWeekViewComponent implements AfterViewChecked, AfterViewInit, OnDestroy {

  @HostBinding('class.week-view') isWeekView = true;

  @Input() set weekViewOptions(weekViewOptions: SohoWeekViewOptions) {
    this._weekviewOptions = weekViewOptions;

    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get weekViewOptions(): SohoWeekViewOptions {
    if (this.weekView) {
      return this.weekView.settings;
    }

    return this._weekviewOptions;
  }

  @Input() set eventTypes(eventTypes: SohoWeekViewEventType[]) {
    this._weekviewOptions.eventTypes = eventTypes;
    if (this.weekView) {
      this.weekView.settings.eventTypes = eventTypes;
      this.markForRefresh();
    }
  }
  get eventTypes(): SohoWeekViewEventType[] {
    if (this.weekView) {
      return this.weekView.settings.eventTypes;
    }

    return this._weekviewOptions.eventTypes;
  }

  @Input() set events(events: SohoWeekViewEvent[]) {
    this._weekviewOptions.events = events;
    if (this.weekView) {
      this.weekView.settings.events = events;
      this.markForRefresh();
    }
  }
  get events(): SohoWeekViewEvent[] {
    if (this.weekView) {
      return this.weekView.settings.events;
    }

    return this._weekviewOptions.events;
  }

  @Input() set locale(locale: string) {
    this._weekviewOptions.locale = locale;
    if (this.weekView) {
      this.weekView.settings.locale = locale;
      this.markForRefresh();
    }
  }
  get locale(): string {
    if (this.weekView) {
      return this.weekView.settings.locale;
    }

    return this._weekviewOptions.locale;
  }

  @Input() set firstDayOfWeek(firstDayOfWeek: number) {
    this._weekviewOptions.firstDayOfWeek = firstDayOfWeek;
    if (this.weekView) {
      this.weekView.settings.firstDayOfWeek = firstDayOfWeek;
      this.markForRefresh();
    }
  }
  get firstDayOfWeek(): number {
    if (this.weekView) {
      return this.weekView.settings.firstDayOfWeek;
    }

    return this._weekviewOptions.firstDayOfWeek;
  }

  @Input() set showViewChanger(showViewChanger: boolean) {
    this._weekviewOptions.showViewChanger = showViewChanger;
    if (this.weekView) {
      this.weekView.settings.showViewChanger = showViewChanger;
      this.markForRefresh();
    }
  }
  get showViewChanger(): boolean {
    if (this.weekView) {
      return this.weekView.settings.showViewChanger;
    }

    return this._weekviewOptions.showViewChanger;
  }

  @Input() set showToday(showToday: boolean) {
    this._weekviewOptions.showToday = showToday;
    if (this.weekView) {
      this.weekView.settings.showToday = showToday;
      this.markForRefresh();
    }
  }
  get showToday(): boolean {
    if (this.weekView) {
      return this.weekView.settings.showToday;
    }

    return this._weekviewOptions.showToday;
  }

  @Input() set startDate(startDate: Date) {
    this._weekviewOptions.startDate = startDate;
    if (this.weekView) {
      this.weekView.settings.startDate = startDate;
      this.markForRefresh();
    }
  }
  get startDate(): Date {
    if (this.weekView) {
      return this.weekView.settings.startDate;
    }

    return this._weekviewOptions.startDate;
  }

  @Input() set endDate(endDate: Date) {
    this._weekviewOptions.endDate = endDate;
    if (this.weekView) {
      this.weekView.settings.endDate = endDate;
      this.markForRefresh();
    }
  }
  get endDate(): Date {
    if (this.weekView) {
      return this.weekView.settings.endDate;
    }

    return this._weekviewOptions.endDate;
  }

  @Input() set showAllDay(showAllDay: boolean) {
    this._weekviewOptions.showAllDay = showAllDay;
    if (this.weekView) {
      this.weekView.settings.showAllDay = showAllDay;
      this.markForRefresh();
    }
  }
  get showAllDay(): boolean {
    if (this.weekView) {
      return this.weekView.settings.showAllDay;
    }

    return this._weekviewOptions.showAllDay;
  }

  @Input() set showTimeLine(showTimeLine: boolean) {
    this._weekviewOptions.showTimeLine = showTimeLine;
    if (this.weekView) {
      this.weekView.settings.showTimeLine = showTimeLine;
      this.markForRefresh();
    }
  }
  get showTimeLine(): boolean {
    if (this.weekView) {
      return this.weekView.settings.showTimeLine;
    }

    return this._weekviewOptions.showTimeLine;
  }

  @Input() set startHour(startHour: number) {
    this._weekviewOptions.startHour = startHour;
    if (this.weekView) {
      this.weekView.settings.startHour = startHour;
      this.markForRefresh();
    }
  }
  get startHour(): number {
    if (this.weekView) {
      return this.weekView.settings.startHour;
    }

    return this._weekviewOptions.startHour;
  }

  @Input() set endHour(endHour: number) {
    this._weekviewOptions.endHour = endHour;
    if (this.weekView) {
      this.weekView.settings.endHour = endHour;
      this.markForRefresh();
    }
  }
  get endHour(): number {
    if (this.weekView) {
      return this.weekView.settings.endHour;
    }

    return this._weekviewOptions.endHour;
  }

  @Input() set eventTooltip(eventTooltip: string | SohoWeekViewTooltipFunction) {
    this._weekviewOptions.eventTooltip = eventTooltip;
    if (this.weekView) {
      this.weekView.settings.eventTooltip = eventTooltip;
      this.markForRefresh();
    }
  }
  get eventTooltip(): string | SohoWeekViewTooltipFunction {
    if (this.weekView) {
      this.weekView.settings.eventTooltip;
    }

    return this._weekviewOptions.eventTooltip;
  }

  @Input() set iconTooltip(iconTooltip: string | SohoWeekViewTooltipFunction) {
    this._weekviewOptions.iconTooltip = iconTooltip;
    if (this.weekView) {
      this.weekView.settings.iconTooltip = iconTooltip;
      this.markForRefresh();
    }
  }
  get iconTooltip(): string | SohoWeekViewTooltipFunction {
    if (this.weekView) {
      return this.weekView.settings.iconTooltip;
    }

    return this._weekviewOptions.iconTooltip;
  }

  @Input() set onRenderMonth(onRenderMonth: Function) {
    this._weekviewOptions.onRenderMonth = onRenderMonth;
    if (this.weekView) {
      this.weekView.settings.onRenderMonth = onRenderMonth;
      this.markForRefresh();
    }
  }
  get onRenderMonth(): Function {
    if (this.weekView) {
      return this.weekView.settings.onRenderMonth;
    }

    return this._weekviewOptions.onRenderMonth;
  }


  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  @Output() weekRendered = new EventEmitter<SohoWeekViewRenderEvent>();
  @Output() eventClick = new EventEmitter<SohoWeekViewEventClickEvent>();
  @Output() eventDblClick = new EventEmitter<SohoWeekViewEventClickEvent>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private weekView: SohoWeekView;
  private _weekviewOptions: SohoWeekViewOptions = {};
  private updateRequired: boolean;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.jQueryElement
        .on('weekrendered', (e: any, args: SohoWeekViewRenderEvent) => this.onWeekRenderedEvent(args))
        .on('eventclick', (e: any, args: SohoWeekViewEventClickEvent) => this.onEventClick(args))
        .on('eventdblclick', (e: any, args: SohoWeekViewEventClickEvent) => this.onEventDblClick(args));
    });

    // Initialize the Soho control.
    this.jQueryElement.weekview(this._weekviewOptions);

    this.weekView = this.jQueryElement.data('week-view');
  }

  ngAfterViewChecked(): void {
    if (!this.weekView || !this.jQueryElement) {
      return;
    }

    if (this.updateRequired) {
      this.updated();
      this.updateRequired = false;
    }
  }

  onWeekRenderedEvent(event: SohoWeekViewRenderEvent) {
    this.ngZone.run(() => this.weekRendered.emit(event));
  }

  onEventClick(event: SohoWeekViewEventClickEvent) {
    this.ngZone.run(() => this.eventClick.emit(event));
  }

  onEventDblClick(event: SohoWeekViewEventClickEvent) {
    this.ngZone.run(() => this.eventDblClick.emit(event));
  }

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   * @param event The event object with common event properties.
   */
  addEvent(event: SohoWeekViewEvent): void {
    this.ngZone.runOutsideAngular(() => this.weekView.addEvent(event));
  }

  /**
   * Remove an event from the dataset and page. It uses the id property.
   * @param event The event object with common event properties.
   */
  deleteEvent(event: SohoWeekViewEvent): void {
    this.ngZone.runOutsideAngular(() => this.weekView.deleteEvent(event));
  }

  /**
   * Update an event via the event object and show it if it should be visible in the calendar.
   * It uses the event id to do this.
   * @param event The event object with common event properties.
   */
  updateEvent(event: SohoWeekViewEvent): void {
    this.ngZone.runOutsideAngular(() => this.weekView.updateEvent(event));
  }

  /**
   * Remove all events from the calendar.
   */
  clearEvents(): void {
    this.ngZone.runOutsideAngular(() => this.weekView.clearEvents());
  }

  /**
   * Handle updated settings and values.
   */
  updated(settings?: SohoWeekViewOptions): void {
    this.ngZone.runOutsideAngular(() => this.weekView.updated(settings));
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh(): void {
    this.updateRequired = true;

    this.ref.markForCheck();
  }

  /**
   * Destructor.
   */
  ngOnDestroy(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.weekView) {
        this.weekView.destroy();
        this.weekView = null;
      }
    });
  }
}
