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
 * Calendar Week View Element
 *******************************************************************/
// @ts-ignore
@Component({
  selector: 'div[soho-calendar-week-view]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCalendarWeekViewComponent {
  @HostBinding('class.calendar-weekview') isCalendarWeekView = true;
}

/********************************************************************
 * Calendar Month View Element
 *******************************************************************/
// @ts-ignore
@Component({
  selector: 'div[soho-calendar-monthview]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCalendarMonthViewComponent {
  @HostBinding('class.calendar-monthview') isCalendarMonthView = true;
}

/********************************************************************
 * Main Calendar component
 *******************************************************************/
@Component({
  selector: '[soho-calendar]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCalendarComponent implements AfterViewChecked, AfterViewInit, OnDestroy {

  @HostBinding('class.calendar') isCalendar = true;

  @Input() set calendarOptions(calendarOptions: SohoCalendarOptions | undefined) {
    this._calendarOptions = calendarOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }
  get calendarOptions(): SohoCalendarOptions | undefined {
    if (this.calendar) {
      return this.calendar.settings;
    }

    return this._calendarOptions;
  }

  @Input() set calendarWeekOptions(calendarWeekOptions: SohoCalendarWeekOptions | undefined) {
    this._calendarWeekOptions = calendarWeekOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }
  get calendarWeekOptions(): SohoCalendarWeekOptions | undefined {
    if (this.calendar) {
      return this.calendar.settings.weekOptions;
    }

    return this._calendarWeekOptions;
  }

  @Input() set disable(disable: SohoDatePickerDisable) {
    (this._calendarOptions as any).disable = disable;

    if (this.calendar) {
      this.calendar.settings.disable = disable;
      this.markForRefresh();
    }
  }
  get disable(): SohoDatePickerDisable {
    if (this.calendar) {
      return (this.calendar as any).settings.disable;
    }

    return this.disable;
  }

  @Input() set dayLegend(dayLegend: Array<SohoDatePickerLegend>) {
    (this._calendarOptions as any).dayLegend = dayLegend;

    if (this.calendar) {
      this.calendar.settings.dayLegend = dayLegend;
      this.markForRefresh();
    }
  }
  get dayLegend(): Array<SohoDatePickerLegend> {
    if (this.calendar) {
      return (this.calendar as any).settings.dayLegend;
    }

    return this.dayLegend;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    (this._calendarOptions as any).attributes = attributes;

    if (this.calendar) {
      this.calendar.settings.attributes = attributes;
      this.markForRefresh();
    }
  }
  get attributes(): Array<Object> | Object | undefined {
    if (this.calendar) {
      return this.calendar.settings.attributes;
    }

    return this.attributes;
  }

  /**
   * An array of objects with data for the event types.
   */
  @Input() set eventTypes(eventTypes: SohoCalendarEventType[] | undefined) {
    (this._calendarOptions as any).eventTypes = eventTypes;
    if (this.calendar) {
      this.calendar.settings.eventTypes = eventTypes;
      this.markForRefresh();
    }
  }
  get eventTypes(): SohoCalendarEventType[] | undefined {
    if (this.calendar) {
      return this.calendar.settings.eventTypes;
    }

    return (this._calendarOptions as any).eventTypes;
  }

  /**
   * An array of objects with data for the events.
   */
  @Input() set events(events: SohoCalendarEvent[]) {
    (this._calendarOptions as any).events = events;
    if (this.calendar) {
      this.calendar.settings.events = events;
      this.markForRefresh();
    }
  }
  get events(): SohoCalendarEvent[] {
    if (this.calendar) {
      return (this.calendar as any).settings.events;
    }

    return (this._calendarOptions as any).events;
  }

  /**
   * The name of the locale to use for this instance. If not set the current locale will be used.
   */
  @Input() set locale(locale: string) {
    (this._calendarOptions as any).locale = locale;
    if (this.calendar) {
      this.calendar.settings.locale = locale;
      this.markForRefresh();
    }
  }
  get locale(): string {
    if (this.calendar) {
      return (this.calendar as any).settings.locale;
    }

    return (this._calendarOptions as any).locale;
  }

  /**
   * Initial month to show.
   */
  @Input() set month(month: number | undefined) {
    (this._calendarOptions as any).month = month;
    if (this.calendar) {
      this.calendar.settings.month = month;
      this.markForRefresh();
    }
  }
  get month(): number | undefined {
    if (this.calendar) {
      return this.calendar.settings.month;
    }

    return (this._calendarOptions as any).month;
  }

  /**
   * Initial year to show.
   */
  @Input() set year(year: number | undefined) {
    (this._calendarOptions as any).year = year;
    if (this.calendar) {
      this.calendar.settings.year = year;
      this.markForRefresh();
    }
  }
  get year(): number | undefined {
    if (this.calendar) {
      return this.calendar.settings.year;
    }

    return (this._calendarOptions as any).year;
  }

  /**
   * If false the dropdown to change views will not be shown.
   */
  @Input() set showViewChanger(showViewChanger: boolean | undefined) {
    (this._calendarOptions as any).showViewChanger = showViewChanger;
    if (this.calendar) {
      this.calendar.settings.showViewChanger = showViewChanger;
      this.markForRefresh();
    }
  }
  get showViewChanger(): boolean | undefined {
    if (this.calendar) {
      return this.calendar.settings.showViewChanger;
    }

    return (this._calendarOptions as any).showViewChanger;
  }

  /**
   * If false the legend will not show below.
   */
  @Input() set showEventLegend(showEventLegend: boolean | undefined) {
    (this._calendarOptions as any).showEventLegend = showEventLegend;
    if (this.calendar) {
      this.calendar.settings.showEventLegend = showEventLegend;
      this.markForRefresh();
    }
  }
  get showEventLegend(): boolean | undefined {
    if (this.calendar) {
      return this.calendar.settings.showEventLegend;
    }

    return (this._calendarOptions as any).showEventLegend;
  }

  /**
   * If false the mouseover text or day event will not be shown.
   */
  @Input() set eventTooltip(eventTooltip: string | SohoCalendarTooltipFunction) {
    (this._calendarOptions as any).eventTooltip = eventTooltip;
    if (this.calendar) {
      this.calendar.settings.eventTooltip = eventTooltip;
      this.markForRefresh();
    }
  }
  get eventTooltip(): string | SohoCalendarTooltipFunction {
    if (this.calendar) {
      return (this.calendar.settings as any).eventTooltip;
    }

    return (this._calendarOptions as any).eventTooltip;
  }

  /**
   * If false the mouseover text for event icon will not be shown.
   */
  @Input() set iconTooltip(iconTooltip: string | SohoCalendarTooltipFunction) {
    (this._calendarOptions as any).iconTooltip = iconTooltip;
    if (this.calendar) {
      (this.calendar.settings as any).iconTooltip = iconTooltip;
      this.markForRefresh();
    }
  }
  get iconTooltip(): string | SohoCalendarTooltipFunction {
    if (this.calendar) {
      return (this.calendar.settings as any).iconTooltip;
    }

    return (this._calendarOptions as any).iconTooltip;
  }

  /**
   * Fires when a month is rendered, allowing you to pass back events or event types to show.
   */
  @Input() set renderMonthCallback(renderMonthCallback: Function) {
    (this._calendarOptions as any).onRenderMonth = renderMonthCallback;
    if (this.calendar) {
      this.calendar.settings.onRenderMonth = renderMonthCallback;
      this.markForRefresh();
    }
  }
  get renderMonthCallback(): Function {
    if (this.calendar) {
      return (this.calendar.settings as any).onRenderMonth;
    }

    return (this._calendarOptions as any).onRenderMonth;
  }

  /**
   * Fires when a month day is clicked. Allowing you to do something.
   */
  @Input() set selectedCallback(selectedCallback: Function | undefined) {
    (this._calendarOptions as any).onSelected = selectedCallback;
    if (this.calendar) {
      this.calendar.settings.onSelected = selectedCallback;
      this.markForRefresh();
    }
  }
  get selectedCallback(): Function | undefined {
    if (this.calendar) {
      return this.calendar.settings.onSelected;
    }

    return (this._calendarOptions as any).onSelected;
  }

  /**
   * The ID of the template used for the events.
   */
  @Input() set template(template: string | undefined) {
    (this._calendarOptions as any).template = template;
    if (this.calendar) {
      this.calendar.settings.template = template;
      this.markForRefresh();
    }
  }
  get template(): string | undefined {
    if (this.calendar) {
      return this.calendar.settings.template;
    }

    return (this._calendarOptions as any).template;
  }

  /**
   * How many days in advance should we show in the upcoming events pane.
   */
  @Input() set upcomingEventDays(upcomingEventDays: number | undefined) {
    (this._calendarOptions as any).upcomingEventDays = upcomingEventDays;
    if (this.calendar) {
      this.calendar.settings.upcomingEventDays = upcomingEventDays;
      this.markForRefresh();
    }
  }
  get upcomingEventDays(): number | undefined {
    if (this.calendar) {
      return this.calendar.settings.upcomingEventDays;
    }

    return (this._calendarOptions as any).upcomingEventDays;
  }

  /**
   * The ID of the template used for the modal dialog on events.
   */
  @Input() set modalTemplate(modalTemplate: string | undefined) {
    (this._calendarOptions as any).modalTemplate = modalTemplate;
    if (this.calendar) {
      this.calendar.settings.modalTemplate = modalTemplate;
      this.markForRefresh();
    }
  }
  get modalTemplate(): string | undefined {
    if (this.calendar) {
      return this.calendar.settings.modalTemplate;
    }

    return (this._calendarOptions as any).modalTemplate;
  }

  /**
   * ID of the menu to use for an event right click context menu
   */
  @Input() set menuId(menuId: string | undefined) {
    (this._calendarOptions as any).menuId = menuId;
    if (this.calendar) {
      this.calendar.settings.menuId = menuId;
      this.markForRefresh();
    }
  }
  get menuId(): string | undefined {
    if (this.calendar) {
      return this.calendar.settings.menuId;
    }

    return (this._calendarOptions as any).menuId;
  }

  /**
   * Callback for the  right click context menu
   */
  @Input() set menuSelected(menuSelected: Function | undefined) {
    (this._calendarOptions as any).menuSelected = menuSelected;
    if (this.calendar) {
      this.calendar.settings.menuSelected = menuSelected;
      this.markForRefresh();
    }
  }
  get menuSelected(): Function | undefined {
    if (this.calendar) {
      return this.calendar.settings.menuSelected;
    }

    return (this._calendarOptions as any).menuSelected;
  }

  /**
   * Initial event properties for the new events dialog.
   */
  @Input() set newEventDefaults(newEventDefaults: SohoCalendarEvent | undefined) {
    (this._calendarOptions as any).newEventDefaults = newEventDefaults;
    if (this.calendar) {
      this.calendar.settings.newEventDefaults = newEventDefaults;
      this.markForRefresh();
    }
  }
  get newEventDefaults(): SohoCalendarEvent | undefined {
    if (this.calendar) {
      return this.calendar.settings.newEventDefaults;
    }

    return (this._calendarOptions as any).newEventDefaults;
  }

  /**
   * Call back for when the view changer is changed
   */
  @Input() set changeViewCallback(changeViewCallback: Function | undefined) {
    (this._calendarOptions as any).onChangeView = changeViewCallback;
    if (this.calendar) {
      this.calendar.settings.onChangeView = changeViewCallback;
      this.markForRefresh();
    }
  }
  get changeViewCallback(): Function | undefined {
    if (this.calendar) {
      return this.calendar.settings.onChangeView;
    }

    return (this._calendarOptions as any).onChangeView;
  }

  /**
   * Deterimines if the today button should be shown.
   */
  @Input() set showToday(showToday: boolean | undefined) {
    (this._calendarOptions as any).showToday = showToday;
    if (this.calendar) {
      this.calendar.settings.showToday = showToday;
      this.markForRefresh();
    }
  }
  get showToday(): boolean | undefined {
    if (this.calendar) {
      return this.calendar.settings.showToday;
    }

    return (this._calendarOptions as any).showToday;
  }

  /**
   * Configure date range for calendar
   */
  @Input() set displayRange(displayRange: Object | undefined) {
    (this._calendarOptions as any).displayRange = displayRange;
    if (this.calendar) {
      this.calendar.settings.displayRange = displayRange;
      this.markForRefresh();
    }
  }
  get displayRange(): Object | undefined {
    if (this.calendar) {
      return this.calendar.settings.displayRange;
    }

    return (this._calendarOptions as any).displayRange;
  }

  /**
   * Configure day of week setting
   */
  @Input() set firstDayOfWeek(day: number) {
    (this._calendarOptions as any).firstDayOfWeek = day;

    if (this.calendar) {
      this.calendar.settings.firstDayOfWeek = day;
      this.markForRefresh();
    }
  }
  get firstDayOfWeek(): number {
    if (this.calendar) {
      return (this.calendar as any).settings.firstDayOfWeek;
    }

    return this.firstDayOfWeek;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  @Output() selected = new EventEmitter<SohoCalendarDateSelectedEvent>();
  @Output() monthRendered = new EventEmitter<SohoCalendarRenderMonthEvent>();
  @Output() eventClick = new EventEmitter<SohoCalendarEventClickEvent>();
  @Output() eventDblClick = new EventEmitter<SohoCalendarEventClickEvent>();
  @Output() eventContextMenu = new EventEmitter<SohoCalendarEventClickEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private calendar?: SohoCalendar | null;
  private _calendarOptions?: SohoCalendarOptions = {};
  private _calendarWeekOptions?: SohoCalendarWeekOptions = {};
  private updateRequired?: boolean;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Add listeners to emit events
      this.jQueryElement
        .on('selected', (_e: any, event: SohoCalendarDateSelectedEvent) => this.onSelectedEvent(event))
        .on('monthrendered', (_e: any, args: SohoCalendarRenderMonthEvent) => this.onMonthRenderedEvent(args))
        .on('eventclick', (_e: any, args: SohoCalendarEventClickEvent) => this.onEventClick(args))
        .on('eventdblclick', (_e: any, args: SohoCalendarEventClickEvent) => this.onEventDblClick(args))
        .on('contextmenu', (_e: any, args: SohoCalendarEventClickEvent) => this.onEventContextMenu(args));

      // Initialise the Soho control.
      this.jQueryElement.calendar(this._calendarOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is defined
      // by the plug-in, but in this case is 'calendar'.
      this.calendar = this.jQueryElement.data('calendar');
    });
  }

  ngAfterViewChecked() {
    if (!this.calendar || !this.jQueryElement) {
      return;
    }

    if (this.updateRequired) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.updated();
      this.updateRequired = false;
    }
  }

  onSelectedEvent(event: SohoCalendarDateSelectedEvent) {
    this.ngZone.run(() => this.selected.emit(event));
  }

  onMonthRenderedEvent(event: SohoCalendarRenderMonthEvent) {
    this.ngZone.run(() => this.monthRendered.emit(event));
  }

  onEventClick(event: SohoCalendarEventClickEvent) {
    this.ngZone.run(() => this.eventClick.emit(event));
  }

  onEventDblClick(event: SohoCalendarEventClickEvent) {
    this.ngZone.run(() => this.eventDblClick.emit(event));
  }

  onEventContextMenu(event: SohoCalendarEventClickEvent) {
    this.ngZone.run(() => this.eventContextMenu.emit(event));
  }

  /**
   * Get the current selected date on the calendar.
   *
   * @returns the currently selected date on the control.
   */
  currentDate(): Date {
    return this.ngZone.runOutsideAngular(() => (this.calendar as any).currentDate());
  }

  /**
   * Get the events and date for the currently selected calendar day.
   *
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoCalendarDayEvents {
    return this.ngZone.runOutsideAngular(() => (this.calendar as any).getDayEvents(date));
  }

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   *
   * @param event The event object with common event properties.
   */
  addEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).addEvent(event));
  }

  /**
   * Update an event via the event object and show it if it should be visible in the calendar.
   * It uses the event id to do this.
   *
   * @param event The event object with common event properties.
   */
  updateEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).updateEvent(event));
  }

  /**
   * Remove an event from the dataset and page. It uses the id property.
   *
   * @param event The event object with common event properties.
   */
  deleteEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).deleteEvent(event));
  }

  /**
   * Show a modal used to add/edit events. This uses the modalTemplate setting for the modal contents.
   *
   * @param event The event object with common event properties for defaulting fields in the template.
   * @param done The callback for when the modal closes.
   */
  showEventModal(event: SohoCalendarEvent[], done: Function): void {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).showEventModal(event, done));
  }

  /**
   * @returns whether or not this Modal is currently being displayed
   */
  modalVisible(): boolean {
    return this.ngZone.runOutsideAngular(() => (this.calendar as any).modalVisible());
  }

  /**
   * Remove all events from the calendar
   */
  clearEvents() {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).clearEvents());
  }

  /**
   * Handle updated settings and values.
   */
  updated(settings?: SohoCalendarOptions) {
    this.ngZone.runOutsideAngular(() => (this.calendar as any).updated(settings));
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
        this.jQueryElement = undefined;
      }
      if (this.calendar) {
        this.calendar.destroy();
        this.calendar = null;
      }
    });
  }
}
