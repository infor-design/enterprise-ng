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
  selector: 'div[soho-week-view]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWeekViewComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @HostBinding('class.week-view') isWeekView = true;

  @Input() set weekViewOptions(weekViewOptions: SohoWeekViewOptions) {
    this._weekViewOptions = weekViewOptions;

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh();
    }
  }

  get weekViewOptions(): SohoWeekViewOptions {
    if (this.weekView) {
      return this.weekView.settings;
    }

    return this._weekViewOptions;
  }

  /**
   * Setting to toggle stacked week view layout
   */
  @Input() set stacked(isStacked: boolean | undefined) {
    this._weekViewOptions.stacked = isStacked;
    if (this.weekView) {
      this.weekView.settings.stacked = isStacked;
      this.markForRefresh();
    }
  }

  get stacked(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.stacked
    }

    return this._weekViewOptions.stacked;
  }

  /**
   * Setting to toggle footer when in stacked week view mode
   */
  @Input() set showFooter(val: boolean | undefined) {
    this._weekViewOptions.showFooter = val;
    if (this.weekView) {
      this.weekView.settings.showFooter = val;
      this.markForRefresh();
    }
  }

  get showFooter(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.showFooter
    }

    return this._weekViewOptions.showFooter;
  }

  /**
   * Setting to switch to one day view in phone-tablet sizes (stacked mode only)
   */
  @Input() set responsive(val: boolean | undefined) {
    this._weekViewOptions.responsive = val;
    if (this.weekView) {
      this.weekView.settings.responsive = val;
      this.markForRefresh();
    }
  }

  get responsive(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.responsive
    }

    return this._weekViewOptions.responsive;
  }

  /**
   * Setting to hide week view calendar toolbar
   */
  @Input() set hideToolbar(val: boolean | undefined) {
    this._weekViewOptions.hideToolbar = val;
    if (this.weekView) {
      this.weekView.settings.hideToolbar = val;
      this.markForRefresh();
    }
  }

  get hideToolbar(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.hideToolbar
    }

    return this._weekViewOptions.hideToolbar;
  }

  /**
   * An array of objects with data for the event types.
   */
  @Input() set eventTypes(eventTypes: SohoWeekViewEventType[] | undefined) {
    this._weekViewOptions.eventTypes = eventTypes;
    if (this.weekView) {
      this.weekView.settings.eventTypes = eventTypes;
      this.markForRefresh();
    }
  }

  get eventTypes(): SohoWeekViewEventType[] | undefined {
    if (this.weekView) {
      return this.weekView.settings.eventTypes;
    }

    return this._weekViewOptions.eventTypes;
  }

  /**
   * An array of objects with data for the filtered event types.
   */
  @Input() set filteredTypes(filteredTypes: [] | undefined) {
    this._weekViewOptions.filteredTypes = filteredTypes;
    if (this.weekView) {
      this.weekView.settings.filteredTypes = filteredTypes;
      this.markForRefresh();
    }
  }

  get filteredTypes(): [] | undefined {
    if (this.weekView) {
      return this.weekView.settings.filteredTypes;
    }

    return this._weekViewOptions.filteredTypes;
  }

  /**
   * An array of objects with data for the events.
   */
  @Input() set events(events: SohoWeekViewEvent[] | undefined) {
    this._weekViewOptions.events = events;
    if (this.weekView) {
      this.weekView.settings.events = events;
      this.markForRefresh();
    }
  }

  get events(): SohoWeekViewEvent[] | undefined {
    if (this.weekView) {
      return this.weekView.settings.events;
    }

    return this._weekViewOptions.events;
  }

  /**
   * The name of the locale to use for this instance. If not set the current locale will be used.
   */
  @Input() set locale(locale: string | undefined) {
    this._weekViewOptions.locale = locale;
    if (this.weekView) {
      this.weekView.settings.locale = locale;
      this.markForRefresh();
    }
  }

  get locale(): string | undefined {
    if (this.weekView) {
      return this.weekView.settings.locale;
    }

    return this._weekViewOptions.locale;
  }

  /**
   * Start of the week to show.
   */
  @Input() set startDate(startDate: Date | undefined) {
    this._weekViewOptions.startDate = startDate;
    if (this.weekView) {
      this.weekView.settings.startDate = startDate;
      this.markForRefresh();
    }
  }

  get startDate(): Date | undefined {
    if (this.weekView) {
      return this.weekView.settings.startDate;
    }

    return this._weekViewOptions.startDate;
  }

  /**
   * End of the week to show
   */
  @Input() set endDate(endDate: Date | undefined) {
    this._weekViewOptions.endDate = endDate;
    if (this.weekView) {
      this.weekView.settings.endDate = endDate;
      this.markForRefresh();
    }
  }

  get endDate(): Date | undefined {
    if (this.weekView) {
      return this.weekView.settings.endDate;
    }

    return this._weekViewOptions.endDate;
  }

  /**
   * Start of the hour to show.
   */
  @Input() set startHour(startHour: number | undefined) {
    this._weekViewOptions.startHour = startHour;
    if (this.weekView) {
      this.weekView.settings.startHour = startHour;
      this.markForRefresh();
    }
  }

  get startHour(): number | undefined {
    if (this.weekView) {
      return this.weekView.settings.startHour;
    }

    return this._weekViewOptions.startHour;
  }

  /**
   * End of the hour to show
   */
  @Input() set endHour(endHour: number | undefined) {
    this._weekViewOptions.endHour = endHour;
    if (this.weekView) {
      this.weekView.settings.endHour = endHour;
      this.markForRefresh();
    }
  }

  get endHour(): number | undefined {
    if (this.weekView) {
      return this.weekView.settings.endHour;
    }

    return this._weekViewOptions.endHour;
  }

  /**
   * Determines if the today button should be shown.
   */
  @Input() set showToday(showToday: boolean | undefined) {
    this._weekViewOptions.showToday = showToday;
    if (this.weekView) {
      this.weekView.settings.showToday = showToday;
      this.markForRefresh();
    }
  }

  get showToday(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.showToday;
    }

    return this._weekViewOptions.showToday;
  }

  /**
   * Determines if the all day events row should be shown.
   */
  @Input() set showAllDay(showAllDay: boolean | undefined) {
    this._weekViewOptions.showAllDay = showAllDay;
    if (this.weekView) {
      this.weekView.settings.showAllDay = showAllDay;
      this.markForRefresh();
    }
  }

  get showAllDay(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.showAllDay;
    }

    return this._weekViewOptions.showAllDay;
  }

  /**
   *  If false the dropdown to change views will not be shown.
   */
  @Input() set showViewChanger(showViewChanger: boolean | undefined) {
    this._weekViewOptions.showViewChanger = showViewChanger;
    if (this.weekView) {
      this.weekView.settings.showViewChanger = showViewChanger;
      this.markForRefresh();
    }
  }

  get showViewChanger(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.showViewChanger;
    }

    return this._weekViewOptions.showViewChanger;
  }

  /**
   * Shows a bar across the current time.
   */
  @Input() set showTimeLine(showTimeLine: boolean | undefined) {
    this._weekViewOptions.showTimeLine = showTimeLine;
    if (this.weekView) {
      this.weekView.settings.showTimeLine = showTimeLine;
      this.markForRefresh();
    }
  }

  get showTimeLine(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.showTimeLine;
    }

    return this._weekViewOptions.showTimeLine;
  }

  /**
   * Set first day of the week. '1' would be Monday.
   */
  @Input() set firstDayOfWeek(firstDayOfWeek: boolean | undefined) {
    this._weekViewOptions.firstDayOfWeek = firstDayOfWeek;
    if (this.weekView) {
      this.weekView.settings.firstDayOfWeek = firstDayOfWeek;
      this.markForRefresh();
    }
  }

  get firstDayOfWeek(): boolean | undefined {
    if (this.weekView) {
      return this.weekView.settings.firstDayOfWeek;
    }

    return this._weekViewOptions.firstDayOfWeek;
  }

  /**
   * If false the mouseover text or day event will not be shown.
   */
  @Input() set eventTooltip(eventTooltip: string | SohoWeekViewTooltipFunction | undefined) {
    this._weekViewOptions.eventTooltip = eventTooltip;
    if (this.weekView) {
      this.weekView.settings.eventTooltip = eventTooltip;
      this.markForRefresh();
    }
  }

  get eventTooltip(): string | SohoWeekViewTooltipFunction | undefined {
    if (this.weekView) {
      return this.weekView.settings.eventTooltip;
    }

    return this._weekViewOptions.eventTooltip;
  }

  /**
   * If false the mouseover text for event icon will not be shown.
   */
  @Input() set iconTooltip(iconTooltip: string | SohoWeekViewTooltipFunction | undefined) {
    this._weekViewOptions.iconTooltip = iconTooltip;
    if (this.weekView) {
      this.weekView.settings.iconTooltip = iconTooltip;
      this.markForRefresh();
    }
  }

  get iconTooltip(): string | SohoWeekViewTooltipFunction | undefined {
    if (this.weekView) {
      return this.weekView.settings.iconTooltip;
    }

    return this._weekViewOptions.iconTooltip;
  }

  /**
   * Fires when a week view is rendered, allowing you to pass back events or event types to show.
   */
  @Input() set renderWeekCallback(renderWeekCallback: Function | undefined) {
    this._weekViewOptions.onRenderWeek = renderWeekCallback;
    if (this.weekView) {
      this.weekView.settings.onRenderWeek = renderWeekCallback;
      this.markForRefresh();
    }
  }

  get renderWeekCallback(): Function | undefined {
    if (this.weekView) {
      return this.weekView.settings.onRenderWeek;
    }

    return this._weekViewOptions.onRenderWeek;
  }

  /**
   * Call back for when the view changer is changed.
   */
  @Input() set changeToWeekDayCallback(changeToWeekDayCallback: Function | undefined) {
    this._weekViewOptions.onChangeToWeekDay = changeToWeekDayCallback;
    if (this.weekView) {
      this.weekView.settings.onChangeToWeekDay = changeToWeekDayCallback;
      this.markForRefresh();
    }
  }

  get changeToWeekDayCallback(): Function | undefined {
    if (this.weekView) {
      return this.weekView.settings.onChangeToWeekDay;
    }

    return this._weekViewOptions.onChangeToWeekDay;
  }

  /**
   * Call back for when the week is changed.
   */
  @Input() set changeWeekCallback(changeWeekCallback: Function | undefined) {
    this._weekViewOptions.onChangeWeek = changeWeekCallback;
    if (this.weekView) {
      this.weekView.settings.onChangeWeek = changeWeekCallback;
      this.markForRefresh();
    }
  }

  get changeWeekCallback(): Function | undefined {
    if (this.weekView) {
      return this.weekView.settings.onChangeWeek;
    }

    return this._weekViewOptions.onChangeWeek;
  }

  /**
   * Call back for when the view changer is changed.
   */
  @Input() set changeViewCallback(changeViewCallback: Function | undefined) {
    this._weekViewOptions.onChangeView = changeViewCallback;
    if (this.weekView) {
      this.weekView.settings.onChangeView = changeViewCallback;
      this.markForRefresh();
    }
  }

  get changeViewCallback(): Function | undefined {
    if (this.weekView) {
      return this.weekView.settings.onChangeView;
    }

    return this._weekViewOptions.onChangeView;
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this._weekViewOptions.attributes = attributes;
    if (this.weekView) {
      this.weekView.settings.attributes = attributes;
      this.markForRefresh();
    }
  }
  get attributes(): Array<Object> | Object | undefined {
    if (this.weekView) {
      return this.weekView.settings.attributes;
    }

    return this._weekViewOptions.attributes;
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
  @Output() selected = new EventEmitter<SohoWeekViewDateSelectedEvent>();
  @Output() weekRendered = new EventEmitter<SohoWeekViewRenderWeekEvent>();
  @Output() eventClick = new EventEmitter<SohoWeekViewClickEvent>();
  @Output() eventDblClick = new EventEmitter<SohoWeekViewClickEvent>();
  @Output() eventContextMenu = new EventEmitter<SohoWeekViewClickEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private weekView!: SohoWeekView | undefined;
  private _weekViewOptions: SohoWeekViewOptions = {};
  private updateRequired?: boolean;

  @Input() weekviewOptions(weekviewOptions: SohoWeekViewOptions) {
    this._weekViewOptions = weekviewOptions;

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
        .on('weekrendered', (_e: any, args: SohoWeekViewRenderWeekEvent) => this.onWeekRenderedEvent(args))
        .on('eventclick', (_e: any, args: SohoWeekViewClickEvent) => this.onEventClick(args))
        .on('eventdblclick', (_e: any, args: SohoWeekViewClickEvent) => this.onEventDblClick(args))
        .on('contextmenu', (_e: any, args: SohoWeekViewClickEvent) => this.onEventContextMenu(args));

      // Initialise the Soho control.
      this.jQueryElement.weekview(this._weekViewOptions);

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

  onWeekRenderedEvent(event: SohoWeekViewRenderWeekEvent) {
    this.ngZone.run(() => this.weekRendered.emit(event));
  }

  onEventClick(event: SohoWeekViewClickEvent) {
    this.ngZone.run(() => this.eventClick.emit(event));
  }

  onEventDblClick(event: SohoWeekViewClickEvent) {
    this.ngZone.run(() => this.eventDblClick.emit(event));
  }

  onEventContextMenu(event: SohoWeekViewClickEvent) {
    this.ngZone.run(() => this.eventContextMenu.emit(event));
  }

  /**
   * Get the current selected date on the weekView calendar.
   *
   * @returns the currently selected date on the control.
   */
  currentDate(): Date | undefined {
    return this.ngZone.runOutsideAngular(() => this.weekView?.currentDate());
  }

  /**
   * Get the events and date for the currently selected weekView calendar day.
   *
   * @param date The date to find the events for.
   * @returns dayEvents An object with all the events and the event date.
   */
  getDayEvents(date: Date): SohoWeekViewDayEvents | undefined {
    return this.ngZone.runOutsideAngular(() => this.weekView?.getDayEvents(date));
  }

  /**
   * Get dayMap object within weekview component
   * @returns {SohoWeekViewDayMap[]} dayMap object
   */
  getDayMap(): SohoWeekViewDayMap[] | undefined {
    return this.weekView?.dayMap;
  }

  /**
   * Handle updated settings and values.
   */
  updated(settings?: SohoWeekViewOptions) {
    this.ngZone.runOutsideAngular(() => this.weekView?.updated(settings));
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
      if (this.weekView) {
        this.weekView.destroy();
        this.weekView = undefined;
      }
    });
  }
}
