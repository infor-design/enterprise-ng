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

  @Input() set calendarOptions(calendarOptions: SohoCalendarOptions) {
    this._calendarOptions = calendarOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }
  get calendarOptions(): SohoCalendarOptions {
    if (this.calendar) {
      return this.calendar.settings;
    }

    return this._calendarOptions;
  }

  @Input() set calendarWeekOptions(calendarWeekOptions: SohoCalendarWeekOptions) {
    this._calendarWeekOptions = calendarWeekOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }
  get calendarWeekOptions(): SohoCalendarWeekOptions {
    if (this.calendar) {
      return this.calendar.settings.weekOptions;
    }

    return this._calendarWeekOptions;
  }

  @Input() set disable(disable: SohoDatePickerDisable) {
    this.calendar.settings.disable = disable;

    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get disable(): SohoDatePickerDisable {
    if (this.calendar) {
      return this.calendar.settings.disable;
    }

    return this.disable;
  }

  @Input() set dayLegend(dayLegend: SohoDatePickerLegend) {
    this.calendar.settings.dayLegend = dayLegend;

    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get dayLegend(): SohoDatePickerLegend {
    if (this.calendar) {
      return this.calendar.settings.dayLegend;
    }

    return this.dayLegend;
  }

  @Input() set attributes(attributes: Array<Object> | Object) {
    this.calendar.settings.attributes = attributes;

    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get attributes(): Array<Object> | Object {
    if (this.calendar) {
      return this.calendar.settings.attributes;
    }

    return this.attributes;
  }

  /**
   * An array of objects with data for the event types.
   */
  @Input() set eventTypes(eventTypes: SohoCalendarEventType[]) {
    this._calendarOptions.eventTypes = eventTypes;
    if (this.calendar) {
      this.calendar.settings.eventTypes = eventTypes;
      this.markForRefresh();
    }
  }
  get eventTypes(): SohoCalendarEventType[] {
    if (this.calendar) {
      return this.calendar.settings.eventTypes;
    }

    return this._calendarOptions.eventTypes;
  }

  /**
   * An array of objects with data for the events.
   */
  @Input() set events(events: SohoCalendarEvent[]) {
    this._calendarOptions.events = events;
    if (this.calendar) {
      this.calendar.settings.events = events;
      this.markForRefresh();
    }
  }
  get events(): SohoCalendarEvent[] {
    if (this.calendar) {
      return this.calendar.settings.events;
    }

    return this._calendarOptions.events;
  }

  /**
   * The name of the locale to use for this instance. If not set the current locale will be used.
   */
  @Input() set locale(locale: string) {
    this._calendarOptions.locale = locale;
    if (this.calendar) {
      this.calendar.settings.locale = locale;
      this.markForRefresh();
    }
  }
  get locale(): string {
    if (this.calendar) {
      return this.calendar.settings.locale;
    }

    return this._calendarOptions.locale;
  }

  /**
   * Initial month to show.
   */
  @Input() set month(month: number) {
    this._calendarOptions.month = month;
    if (this.calendar) {
      this.calendar.settings.month = month;
      this.markForRefresh();
    }
  }
  get month(): number {
    if (this.calendar) {
      return this.calendar.settings.month;
    }

    return this._calendarOptions.month;
  }

  /**
   * Initial year to show.
   */
  @Input() set year(year: number) {
    this._calendarOptions.year = year;
    if (this.calendar) {
      this.calendar.settings.year = year;
      this.markForRefresh();
    }
  }
  get year(): number {
    if (this.calendar) {
      return this.calendar.settings.year;
    }

    return this._calendarOptions.year;
  }

  /**
   * If false the dropdown to change views will not be shown.
   */
  @Input() set showViewChanger(showViewChanger: boolean) {
    this._calendarOptions.showViewChanger = showViewChanger;
    if (this.calendar) {
      this.calendar.settings.showViewChanger = showViewChanger;
      this.markForRefresh();
    }
  }
  get showViewChanger(): boolean {
    if (this.calendar) {
      return this.calendar.settings.showViewChanger;
    }

    return this._calendarOptions.showViewChanger;
  }

  /**
   * If false the mouseover text or day event will not be shown.
   */
  @Input() set eventTooltip(eventTooltip: string | SohoCalendarTooltipFunction) {
    this._calendarOptions.eventTooltip = eventTooltip;
    if (this.calendar) {
      this.calendar.settings.eventTooltip = eventTooltip;
      this.markForRefresh();
    }
  }
  get eventTooltip(): string | SohoCalendarTooltipFunction {
    if (this.calendar) {
      return this.calendar.settings.eventTooltip;
    }

    return this._calendarOptions.eventTooltip;
  }

  /**
   * If false the mouseover text for event icon will not be shown.
   */
  @Input() set iconTooltip(iconTooltip: string | SohoCalendarTooltipFunction) {
    this._calendarOptions.iconTooltip = iconTooltip;
    if (this.calendar) {
      this.calendar.settings.iconTooltip = iconTooltip;
      this.markForRefresh();
    }
  }
  get iconTooltip(): string | SohoCalendarTooltipFunction {
    if (this.calendar) {
      return this.calendar.settings.iconTooltip;
    }

    return this._calendarOptions.iconTooltip;
  }

  /**
   * Fires when a month is rendered, allowing you to pass back events or event types to show.
   */
  @Input() set renderMonthCallback(renderMonthCallback: Function) {
    this._calendarOptions.onRenderMonth = renderMonthCallback;
    if (this.calendar) {
      this.calendar.settings.onRenderMonth = renderMonthCallback;
      this.markForRefresh();
    }
  }
  get renderMonthCallback(): Function {
    if (this.calendar) {
      return this.calendar.settings.onRenderMonth;
    }

    return this._calendarOptions.onRenderMonth;
  }

  /**
   * Fires when a month day is clicked. Allowing you to do something.
   */
  @Input() set selectedCallback(selectedCallback: Function) {
    this._calendarOptions.onSelected = selectedCallback;
    if (this.calendar) {
      this.calendar.settings.onSelected = selectedCallback;
      this.markForRefresh();
    }
  }
  get selectedCallback(): Function {
    if (this.calendar) {
      return this.calendar.settings.onSelected;
    }

    return this._calendarOptions.onSelected;
  }

  /**
   * The ID of the template used for the events.
   */
  @Input() set template(template: string) {
    this._calendarOptions.template = template;
    if (this.calendar) {
      this.calendar.settings.template = template;
      this.markForRefresh();
    }
  }
  get template(): string {
    if (this.calendar) {
      return this.calendar.settings.template;
    }

    return this._calendarOptions.template;
  }

  /**
   * How many days in advance should we show in the upcoming events pane.
   */
  @Input() set upcomingEventDays(upcomingEventDays: number) {
    this._calendarOptions.upcomingEventDays = upcomingEventDays;
    if (this.calendar) {
      this.calendar.settings.upcomingEventDays = upcomingEventDays;
      this.markForRefresh();
    }
  }
  get upcomingEventDays(): number {
    if (this.calendar) {
      return this.calendar.settings.upcomingEventDays;
    }

    return this._calendarOptions.upcomingEventDays;
  }

  /**
   * The ID of the template used for the modal dialog on events.
   */
  @Input() set modalTemplate(modalTemplate: string) {
    this._calendarOptions.modalTemplate = modalTemplate;
    if (this.calendar) {
      this.calendar.settings.modalTemplate = modalTemplate;
      this.markForRefresh();
    }
  }
  get modalTemplate(): string {
    if (this.calendar) {
      return this.calendar.settings.modalTemplate;
    }

    return this._calendarOptions.modalTemplate;
  }

  /**
   * ID of the menu to use for an event right click context menu
   */
  @Input() set menuId(menuId: string) {
    this._calendarOptions.menuId = menuId;
    if (this.calendar) {
      this.calendar.settings.menuId = menuId;
      this.markForRefresh();
    }
  }
  get menuId(): string {
    if (this.calendar) {
      return this.calendar.settings.menuId;
    }

    return this._calendarOptions.menuId;
  }

  /**
   * Callback for the  right click context menu
   */
  @Input() set menuSelected(menuSelected: string) {
    this._calendarOptions.menuSelected = menuSelected;
    if (this.calendar) {
      this.calendar.settings.menuSelected = menuSelected;
      this.markForRefresh();
    }
  }
  get menuSelected(): string {
    if (this.calendar) {
      return this.calendar.settings.menuSelected;
    }

    return this._calendarOptions.menuSelected;
  }

  /**
   * Initial event properties for the new events dialog.
   */
  @Input() set newEventDefaults(newEventDefaults: SohoCalendarEvent) {
    this._calendarOptions.newEventDefaults = newEventDefaults;
    if (this.calendar) {
      this.calendar.settings.newEventDefaults = newEventDefaults;
      this.markForRefresh();
    }
  }
  get newEventDefaults(): SohoCalendarEvent {
    if (this.calendar) {
      return this.calendar.settings.newEventDefaults;
    }

    return this._calendarOptions.newEventDefaults;
  }

  /**
   * Call back for when the view changer is changed
   */
  @Input() set changeViewCallback(changeViewCallback: Function) {
    this._calendarOptions.onChangeView = changeViewCallback;
    if (this.calendar) {
      this.calendar.settings.onChangeView = changeViewCallback;
      this.markForRefresh();
    }
  }
  get changeViewCallback(): Function {
    if (this.calendar) {
      return this.calendar.settings.onChangeView;
    }

    return this._calendarOptions.onChangeView;
  }

  /**
   * Deterimines if the today button should be shown.
   */
  @Input() set showToday(showToday: boolean) {
    this._calendarOptions.showToday = showToday;
    if (this.calendar) {
      this.calendar.settings.showToday = showToday;
      this.markForRefresh();
    }
  }
  get showToday(): boolean {
    if (this.calendar) {
      return this.calendar.settings.showToday;
    }

    return this._calendarOptions.showToday;
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
  private jQueryElement: JQuery;
  private calendar: SohoCalendar;
  private _calendarOptions: SohoCalendarOptions = {};
  private _calendarWeekOptions: SohoCalendarWeekOptions = {};
  private updateRequired: boolean;

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
        .on('selected', (e: any, event: SohoCalendarDateSelectedEvent) => this.onSelectedEvent(event))
        .on('monthrendered', (e: any, args: SohoCalendarRenderMonthEvent) => this.onMonthRenderedEvent(args))
        .on('eventclick', (e: any, args: SohoCalendarEventClickEvent) => this.onEventClick(args))
        .on('eventdblclick', (e: any, args: SohoCalendarEventClickEvent) => this.onEventDblClick(args))
        .on('contextmenu', (e: any, args: SohoCalendarEventClickEvent) => this.onEventContextMenu(args));

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
    return this.ngZone.runOutsideAngular(() => this.calendar.currentDate());
  }

  /**
   * Get the events and date for the currently selected calendar day.
   *
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoCalendarDayEvents {
    return this.ngZone.runOutsideAngular(() => this.calendar.getDayEvents(date));
  }

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   *
   * @param event The event object with common event properties.
   */
  addEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => this.calendar.addEvent(event));
  }

  /**
   * Update an event via the event object and show it if it should be visible in the calendar.
   * It uses the event id to do this.
   *
   * @param event The event object with common event properties.
   */
  updateEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => this.calendar.updateEvent(event));
  }

  /**
   * Remove an event from the dataset and page. It uses the id property.
   *
   * @param event The event object with common event properties.
   */
  deleteEvent(event: SohoCalendarEvent): void {
    this.ngZone.runOutsideAngular(() => this.calendar.deleteEvent(event));
  }

  /**
   * Show a modal used to add/edit events. This uses the modalTemplate setting for the modal contents.
   *
   * @param event The event object with common event properties for defaulting fields in the template.
   * @param done The callback for when the modal closes.
   */
  showEventModal(event: SohoCalendarEvent[], done: Function): void {
    this.ngZone.runOutsideAngular(() => this.calendar.showEventModal(event, done));
  }

  /**
   * @returns whether or not this Modal is currently being displayed
   */
  modalVisible(): boolean {
    return this.ngZone.runOutsideAngular(() => this.calendar.modalVisible());
  }

  /**
   * Remove all events from the calendar
   */
  clearEvents() {
    this.ngZone.runOutsideAngular(() => this.calendar.clearEvents());
  }

  /**
   * Handle updated settings and values.
   */
  updated(settings?: SohoCalendarOptions) {
    this.ngZone.runOutsideAngular(() => this.calendar.updated(settings));
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
      if (this.calendar) {
        this.calendar.destroy();
        this.calendar = null;
      }
    });
  }
}
