/// <reference path="soho-weekview.d.ts" />

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

/********************************************************************
 * Weekview component
 *******************************************************************/
@Component({
  selector: 'div[soho-weekview]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWeekviewComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @HostBinding('class.week-view') isWeekView = true;

  @Input() set weekViewOptions(weekViewOptions: SohoWeekviewOptions) {
    this._weekviewOptions = weekViewOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }

  get weekViewOptions(): SohoWeekviewOptions {
    if (this.weekView) {
      return this.weekView.settings;
    }

    return this._weekviewOptions;
  }

  /**
   * An array of objects with data for the event types.
   */
  @Input() set eventTypes(eventTypes: SohoWeekviewEventType[]) {
    this._weekviewOptions.eventTypes = eventTypes;
    if (this.weekView) {
      this.weekView.settings.eventTypes = eventTypes;
      this.markForRefresh();
    }
  }

  get eventTypes(): SohoWeekviewEventType[] {
    if (this.weekView) {
      return this.weekView.settings.eventTypes;
    }

    return this._weekviewOptions.eventTypes;
  }

  /**
   * An array of objects with data for the events.
   */
  @Input() set events(events: SohoWeekviewEvent[]) {
    this._weekviewOptions.events = events;
    if (this.weekView) {
      this.weekView.settings.events = events;
      this.markForRefresh();
    }
  }

  get events(): SohoWeekviewEvent[] {
    if (this.weekView) {
      return this.weekView.settings.events;
    }

    return this._weekviewOptions.events;
  }

  /**
   * The name of the locale to use for this instance. If not set the current locale will be used.
   */
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

  /**
   * Start of the week to show.
   */
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

  /**
   * End of the week to show
   */
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

  /**
   * Start of the hour to show.
   */
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

  /**
   * End of the hour to show
   */
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

  /**
   * Determines if the today button should be shown.
   */
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

  /**
   * Determines if the all day events row should be shown.
   */
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

  /**
   *  If false the dropdown to change views will not be shown.
   */
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

  /**
   * Shows a bar across the current time.
   */
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

  /**
   * Set first day of the week. '1' would be Monday.
   */
  @Input() set firstDayOfWeek(firstDayOfWeek: boolean) {
    this._weekviewOptions.firstDayOfWeek = firstDayOfWeek;
    if (this.weekView) {
      this.weekView.settings.firstDayOfWeek = firstDayOfWeek;
      this.markForRefresh();
    }
  }

  get firstDayOfWeek(): boolean {
    if (this.weekView) {
      return this.weekView.settings.firstDayOfWeek;
    }

    return this._weekviewOptions.firstDayOfWeek;
  }

  /**
   * If false the mouseover text or day event will not be shown.
   */
  @Input() set eventTooltip(eventTooltip: string | SohoCalendarTooltipFunction) {
    this._weekviewOptions.eventTooltip = eventTooltip;
    if (this.weekView) {
      this.weekView.settings.eventTooltip = eventTooltip;
      this.markForRefresh();
    }
  }

  get eventTooltip(): string | SohoCalendarTooltipFunction {
    if (this.weekView) {
      return this.weekView.settings.eventTooltip;
    }

    return this._weekviewOptions.eventTooltip;
  }

  /**
   * If false the mouseover text for event icon will not be shown.
   */
  @Input() set iconTooltip(iconTooltip: string | SohoCalendarTooltipFunction) {
    this._weekviewOptions.iconTooltip = iconTooltip;
    if (this.weekView) {
      this.weekView.settings.iconTooltip = iconTooltip;
      this.markForRefresh();
    }
  }

  get iconTooltip(): string | SohoCalendarTooltipFunction {
    if (this.weekView) {
      return this.weekView.settings.iconTooltip;
    }

    return this._weekviewOptions.iconTooltip;
  }

  /**
   * Fires when a week view is rendered, allowing you to pass back events or event types to show.
   */
  @Input() set onRenderWeek(onRenderWeek: Function) {
    this._weekviewOptions.onRenderWeek = onRenderWeek;
    if (this.weekView) {
      this.weekView.settings.onRenderWeek = onRenderWeek;
      this.markForRefresh();
    }
  }

  get onRenderWeek(): Function {
    if (this.weekView) {
      return this.weekView.settings.onRenderWeek;
    }

    return this._weekviewOptions.onRenderWeek;
  }

  /**
   * Call back for when the view changer is changed.
   */
  @Input() set onChangeToWeekDay(onChangeToWeekDay: Function) {
    this._weekviewOptions.onChangeToWeekDay = onChangeToWeekDay;
    if (this.weekView) {
      this.weekView.settings.onChangeToWeekDay = onChangeToWeekDay;
      this.markForRefresh();
    }
  }

  get onChangeToWeekDay(): Function {
    if (this.weekView) {
      return this.weekView.settings.onChangeToWeekDay;
    }

    return this._weekviewOptions.onChangeToWeekDay;
  }

  /**
   * Call back for when the week is changed.
   */
  @Input() set onChangeWeek(onChangeWeek: Function) {
    this._weekviewOptions.onChangeWeek = onChangeWeek;
    if (this.weekView) {
      this.weekView.settings.onChangeWeek = onChangeWeek;
      this.markForRefresh();
    }
  }

  get onChangeWeek(): Function {
    if (this.weekView) {
      return this.weekView.settings.onChangeWeek;
    }

    return this._weekviewOptions.onChangeWeek;
  }

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef
  ) {
  }

  @HostBinding('class.calendar-weekview') isCalendarWeekView = true;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  @Output() selected = new EventEmitter<SohoWeekviewDateSelectedEvent>();
  @Output() weekRendered = new EventEmitter<SohoWeekviewRenderWeekEvent>();
  @Output() eventClick = new EventEmitter<SohoWeekviewClickEvent>();
  @Output() eventDblClick = new EventEmitter<SohoWeekviewClickEvent>();
  @Output() eventContextMenu = new EventEmitter<SohoWeekviewClickEvent>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private weekView: SohoWeekview;
  private _weekviewOptions: SohoWeekviewOptions = {};
  private updateRequired: boolean;

  @Input() weekviewOptions(weekviewOptions: SohoWeekviewOptions) {
    this._weekviewOptions = weekviewOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Add listeners to emit events
      this.jQueryElement
        .on('weekrendered', (e: any, args: SohoWeekviewRenderWeekEvent) => this.onWeekRenderedEvent(args))
        .on('eventclick', (e: any, args: SohoWeekviewClickEvent) => this.onEventClick(args))
        .on('eventdblclick', (e: any, args: SohoWeekviewClickEvent) => this.onEventDblClick(args))
        .on('contextmenu', (e: any, args: SohoWeekviewClickEvent) => this.onEventContextMenu(args));

      // Initialise the Soho control.
      this.jQueryElement.weekview(this._weekviewOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is defined
      // by the plug-in, but in this case is 'weekview'.
      this.weekView = this.jQueryElement.data('weekview');
    });
  }

  ngAfterViewChecked() {
    if (!this.weekView || !this.jQueryElement) {
      return;
    }

    if (this.updateRequired) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.updated();
      this.updateRequired = false;
    }
  }

  onWeekRenderedEvent(event: SohoWeekviewRenderWeekEvent) {
    this.ngZone.run(() => this.weekRendered.emit(event));
  }

  onEventClick(event: SohoWeekviewClickEvent) {
    this.ngZone.run(() => this.eventClick.emit(event));
  }

  onEventDblClick(event: SohoWeekviewClickEvent) {
    this.ngZone.run(() => this.eventDblClick.emit(event));
  }

  onEventContextMenu(event: SohoWeekviewClickEvent) {
    this.ngZone.run(() => this.eventContextMenu.emit(event));
  }

  /**
   * Get the current selected date on the weekView calendar.
   * @returns the currently selected date on the control.
   */
  currentDate(): Date {
    return this.ngZone.runOutsideAngular(() => this.weekView.currentDate());
  }

  /**
   * Get the events and date for the currently selected weekView calendar day.
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoWeekviewDayEvents {
    return this.ngZone.runOutsideAngular(() => this.weekView.getDayEvents(date));
  }

  /**
   * Handle updated settings and values.
   */
  updated(settings?: SohoWeekviewOptions) {
    this.ngZone.runOutsideAngular(() => this.weekView.updated(settings));
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.updateRequired = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatically the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
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
