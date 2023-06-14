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
  selector: '[soho-monthview]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoMonthViewComponent implements AfterViewChecked, AfterViewInit, OnDestroy {

  @HostBinding('class.monthview') isMonthView = true;
  @HostBinding('attr.data-init') dataInit = false;

  @Input() set monthviewOptions(monthviewOptions: SohoMonthViewOptions | undefined) {
    this._monthviewOptions = monthviewOptions;

    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get monthviewOptions(): SohoMonthViewOptions | undefined {
    if (this.monthview) {
      return this.monthview.settings;
    }

    return this._monthviewOptions;
  }

  /**
   * The name of the locale to use for this instance. If not set the current locale will be used.
   */
  @Input() set locale(locale: string) {
    (this._monthviewOptions as any).locale = locale;
    if (this.monthview) {
      this.monthview.settings.locale = locale;
      this.markForRefresh();
    }
  }
  get locale(): string {
    if (this.monthview) {
      return (this.monthview as any).settings.locale;
    }

    return (this._monthviewOptions as any).locale;
  }

  /**
   * Initial month to show.
   */
  @Input() set month(month: number | undefined) {
    (this._monthviewOptions as any).month = month;
    if (this.monthview) {
      this.monthview.settings.month = month;
      this.markForRefresh();
    }
  }
  get month(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.month;
    }

    return (this._monthviewOptions as any).month;
  }

  /**
   * Initial year to show.
   */
  @Input() set year(year: number | undefined) {
    (this._monthviewOptions as any).year = year;
    if (this.monthview) {
      this.monthview.settings.year = year;
      this.markForRefresh();
    }
  }
  get year(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.year;
    }

    return (this._monthviewOptions as any).year;
  }

  /**
   * The initial selected day to show.
   */
  @Input() set day(day: number | undefined) {
    (this._monthviewOptions as any).day = day;
    if (this.monthview) {
      this.monthview.settings.day = day;
      this.markForRefresh();
    }
  }
  get day(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.day;
    }

    return (this._monthviewOptions as any).day;
  }

  /**
   * The date to highlight as selected/today.
   */
  @Input() set activeDate(activeDate: number | undefined) {
    (this._monthviewOptions as any).activeDate = activeDate;
    if (this.monthview) {
      this.monthview.settings.activeDate = activeDate;
      this.markForRefresh();
    }
  }
  get activeDate(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.activeDate;
    }

    return (this._monthviewOptions as any).activeDate;
  }

  /**
   * The date to highlight as selected/today (as an array for islamic)
   */
  @Input() set activeDateIslamic(activeDateIslamic: number | undefined) {
    (this._monthviewOptions as any).activeDateIslamic = activeDateIslamic;
    if (this.monthview) {
      this.monthview.settings.activeDateIslamic = activeDateIslamic;
      this.markForRefresh();
    }
  }
  get activeDateIslamic(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.activeDateIslamic;
    }

    return (this._monthviewOptions as any).activeDateIslamic;
  }

  /**
   * Is it in a popup (datepicker using it)
   */
  @Input() set isPopup(isPopup: boolean | undefined) {
    (this._monthviewOptions as any).isPopup = isPopup;
    if (this.monthview) {
      this.monthview.settings.isPopup = isPopup;
      this.markForRefresh();
    }
  }
  get isPopup(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.isPopup;
    }

    return (this._monthviewOptions as any).isPopup;
  }

  /**
   * If true, will set it as inPage month view.
   */
  @Input() set inPage(inPage: boolean | undefined) {
    (this._monthviewOptions as any).inPage = inPage;
    if (this.monthview) {
      this.monthview.settings.inPage = inPage;
      this.markForRefresh();
    }
  }
  get inPage(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.inPage;
    }

    return (this._monthviewOptions as any).inPage;
  }

  /**
   * If true, will set the month-year title as button for inPage.
   */
  @Input() set inPageTitleAsButton(inPageTitleAsButton: boolean | undefined) {
    (this._monthviewOptions as any).inPageTitleAsButton = inPageTitleAsButton;
    if (this.monthview) {
      this.monthview.settings.inPageTitleAsButton = inPageTitleAsButton;
      this.markForRefresh();
    }
  }
  get inPageTitleAsButton(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.inPageTitleAsButton;
    }

    return (this._monthviewOptions as any).inPageTitleAsButton;
  }

  /**
   * If true, will set to be toggleable.
   */
  @Input() set inPageToggleable(inPageToggleable: boolean | undefined) {
    (this._monthviewOptions as any).inPageToggleable = inPageToggleable;
    if (this.monthview) {
      this.monthview.settings.inPageToggleable = inPageToggleable;
      this.markForRefresh();
    }
  }
  get inPageToggleable(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.inPageToggleable;
    }

    return (this._monthviewOptions as any).inPageToggleable;
  }

  /**
   * If true, will init as expanded
   */
  @Input() set inPageExpanded(inPageExpanded: boolean | undefined) {
    (this._monthviewOptions as any).inPageExpanded = inPageExpanded;
    if (this.monthview) {
      this.monthview.settings.inPageExpanded = inPageExpanded;
      this.markForRefresh();
    }
  }
  get inPageExpanded(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.inPageExpanded;
    }

    return (this._monthviewOptions as any).inPageExpanded;
  }

  /**
   * Set first day of the week. '1' would be Monday.
   */
  @Input() set firstDayOfWeek(firstDayOfWeek: number | undefined) {
    (this._monthviewOptions as any).settingsfirstDayOfWeek = firstDayOfWeek;
    if (this.monthview) {
      this.monthview.settings.firstDayOfWeek = firstDayOfWeek;
      this.markForRefresh();
    }
  }
  get firstDayOfWeek(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.firstDayOfWeek;
    }

    return (this._monthviewOptions as any).settings.firstDayOfWeek;
  }

  /**
   * If true the today button is shown on the header.
   */
  @Input() set showToday(showToday: boolean | undefined) {
    (this._monthviewOptions as any).showToday = showToday;
    if (this.monthview) {
      this.monthview.settings.showToday = showToday;
      this.markForRefresh();
    }
  }
  get showToday(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.showToday;
    }

    return (this._monthviewOptions as any).showToday;
  }

  /**
   * Indicates this is a month picker on the month and week view.
   * Has some slight different behavior.
   */
  @Input() set isMonthPicker(isMonthPicker: boolean | undefined) {
    (this._monthviewOptions as any).isMonthPicker = isMonthPicker;
    if (this.monthview) {
      this.monthview.settings.isMonthPicker = isMonthPicker;
      this.markForRefresh();
    }
  }
  get isMonthPicker(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.isMonthPicker;
    }

    return (this._monthviewOptions as any).isMonthPicker;
  }

  /**
   * If false the year and month switcher will be disabled.
   */
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean | undefined) {
    (this._monthviewOptions as any).showMonthYearPicker = showMonthYearPicker;
    if (this.monthview) {
      this.monthview.settings.showMonthYearPicker = showMonthYearPicker;
      this.markForRefresh();
    }
  }
  get showMonthYearPicker(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.showMonthYearPicker;
    }

    return (this._monthviewOptions as any).showMonthYearPicker;
  }

  /**
   * Shows the legend below the table.
   */
  @Input() set showLegend(showLegend: boolean | undefined) {
    (this._monthviewOptions as any).showLegend = showLegend;
    if (this.monthview) {
      this.monthview.settings.showLegend = showLegend;
      this.markForRefresh();
    }
  }
  get showLegend(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.showLegend;
    }

    return (this._monthviewOptions as any).showLegend;
  }

  /**
   * Legend Build up.
   */
  @Input() set legend(legend: SohoMonthViewLegend[] | undefined) {
    (this._monthviewOptions as any).legend = legend;
    if (this.monthview) {
      this.monthview.settings.legend = legend;
      this.updateLegend = true;
      this.ref.markForCheck();
    }
  }
  get legend(): SohoMonthViewLegend[] | undefined {
    if (this.monthview) {
      return this.monthview.settings.legend;
    }

    return (this._monthviewOptions as any).legend;
  }

  /**
   * If true the days portion of the calendar will be hidden.
   * Usefull for Month/Year only formats.
   */
  @Input() set hideDays(hideDays: boolean | undefined) {
    (this._monthviewOptions as any).hideDays = hideDays;
    if (this.monthview) {
      this.monthview.settings.hideDays = hideDays;
      this.markForRefresh();
    }
  }
  get hideDays(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.hideDays;
    }

    return (this._monthviewOptions as any).hideDays;
  }

  /**
   * Disable dates in various ways.
   * For example `{minDate: 'M/d/yyyy', maxDate: 'M/d/yyyy'}`.
   * Dates should be in format M/d/yyyy
   */
  @Input() set disable(disable: SohoDatePickerDisable | undefined) {
    (this._monthviewOptions as any).settings.disable = disable;
    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get disable(): SohoDatePickerDisable | undefined {
    if (this.monthview) {
      return (this.monthview as any).settings.disable;
    }

    return this.disable;
  }

  /**
   * The number of years ahead to show in the month/year picker should total 9 with yearsBack.
   */
  @Input() set yearsBack(yearsBack: number | undefined) {
    (this._monthviewOptions as any).yearsBack = yearsBack;
    if (this.monthview) {
      this.monthview.settings.yearsBack = yearsBack;
      this.markForRefresh();
    }
  }
  get yearsBack(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.yearsBack;
    }

    return (this._monthviewOptions as any).yearsBack;
  }

  /**
   * The number of years back to show in the month/year picker should total 9 with yearsAhead.
   */
  @Input() set yearsAhead(yearsAhead: number | undefined) {
    (this._monthviewOptions as any).yearsAhead = yearsAhead;
    if (this.monthview) {
      this.monthview.settings.yearsAhead = yearsAhead;
      this.markForRefresh();
    }
  }
  get yearsAhead(): number | undefined {
    if (this.monthview) {
      return this.monthview.settings.yearsAhead;
    }

    return (this._monthviewOptions as any).yearsAhead;
  }

  /**
   * Range between two dates with various options.
   */
  @Input() set range(range: SohoMonthViewRange[] | undefined) {
    (this._monthviewOptions as any).range = range;
    if (this.monthview) {
      this.monthview.settings.range = range;
      this.markForRefresh();
    }
  }
  get range(): SohoMonthViewRange[] | undefined {
    if (this.monthview) {
      return this.monthview.settings.range;
    }

    return (this._monthviewOptions as any).range;
  }

  /**
   * If true the month days can be clicked to select
   */
  @Input() set selectable(selectable: boolean | undefined) {
    (this._monthviewOptions as any).selectable = selectable;
    if (this.monthview) {
      this.monthview.settings.selectable = selectable;
      this.markForRefresh();
    }
  }
  get selectable(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.selectable;
    }

    return (this._monthviewOptions as any).selectable;
  }

  /**
   * Callback that fires when a month day is clicked.
   */
  @Input() set onSelected(onSelected: boolean | undefined) {
    (this._monthviewOptions as any).onSelected = onSelected;
    if (this.monthview) {
      this.monthview.settings.onSelected = onSelected;
      this.markForRefresh();
    }
  }
  get onSelected(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.onSelected;
    }

    return (this._monthviewOptions as any).onSelected;
  }

  /**
   * Callback that fires when a key is pressed down.
   */
  @Input() set onKeyDown(onKeyDown: boolean | undefined) {
    (this._monthviewOptions as any).onKeyDown = onKeyDown;
    if (this.monthview) {
      this.monthview.settings.onKeyDown = onKeyDown;
      this.markForRefresh();
    }
  }
  get onKeyDown(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.onKeyDown;
    }

    return (this._monthviewOptions as any).onKeyDown;
  }

  /**
   * If true the Next Previous buttons will shown on the header.
   */
  @Input() set showNextPrevious(showNextPrevious: boolean | undefined) {
    (this._monthviewOptions as any).showNextPrevious = showNextPrevious;
    if (this.monthview) {
      this.monthview.settings.showNextPrevious = showNextPrevious;
      this.markForRefresh();
    }
  }
  get showNextPrevious(): boolean | undefined {
    if (this.monthview) {
      return this.monthview.settings.showNextPrevious;
    }

    return (this._monthviewOptions as any).showNextPrevious;
  }

  /**
   * Call back for when the view changer is changed.
   */
  @Input() set changeViewCallback(changeViewCallback: Function | undefined) {
    (this._monthviewOptions as any).onChangeView = changeViewCallback;
    if (this.monthview) {
      this.monthview.settings.onChangeView = changeViewCallback;
      this.markForRefresh();
    }
  }
  get changeViewCallback(): Function | undefined {
    if (this.monthview) {
      return this.monthview.settings.onChangeView;
    }

    return (this._monthviewOptions as any).onChangeView;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    (this.monthview as any).settings.attributes = attributes;
    if (this.jQueryElement) {
      this.markForRefresh();
    }
  }
  get attributes(): Array<Object> | Object | undefined {
    if (this.monthview) {
      return this.monthview.settings.attributes;
    }

    return this.attributes;
  }

  // -------------------------------------
  // Component Output
  // -------------------------------------
  @Output() monthRendered = new EventEmitter<SohoMonthViewRenderEvent>();
  @Output() selected = new EventEmitter<SohoMonthViewSelectedEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private monthview?: SohoMonthView | null;
  private _monthviewOptions?: SohoMonthViewOptions = {};
  private updateRequired?: boolean;
  private updateLegend?: boolean;

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
        .on('monthrendered', (_e: any, args: SohoMonthViewRenderEvent) => this.onMonthViewRenderedEvent(args))
        .on('selected', (_e: any, event: SohoMonthViewSelectedEvent) => this.onMonthViewSelectedEvent(event));

      // Initialize the Soho control.
      this.jQueryElement.monthview(this._monthviewOptions);

      this.monthview = this.jQueryElement.data('monthview');
    });
  }

  ngAfterViewChecked() {
    if (!this.monthview || !this.jQueryElement) {
      return;
    }

    if (this.updateLegend) {
      this.monthview.loadLegend(this.legend);
      this.updateLegend = false;
    }

    if (this.updateRequired) {
      this.updated();
      this.updateRequired = false;
    }
  }

  onMonthViewRenderedEvent(event: SohoMonthViewRenderEvent) {
    this.ngZone.runOutsideAngular(() => this.monthRendered.emit(event));
  }

  onMonthViewSelectedEvent(event: SohoMonthViewSelectedEvent) {
    this.ngZone.runOutsideAngular(() => this.selected.emit(event));
  }

  /**
   * Handle updated settings and values.
   */
  updated() {
    this.ngZone.runOutsideAngular(() => (this.monthview as any).updated());
  }

  /**
   * Mark the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    this.updateRequired = true;

    this.ref.markForCheck();
  }

  /**
   * Tear down the markup for the monthview
   */
  teardown(): void {
    if (this.monthview) {
      this.ngZone.runOutsideAngular(() => (this.monthview as any).teardown());
    }
  }

  /**
   * Destroy the markup and any other resources.
   */
  destroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.monthview) {
        this.monthview.destroy();
        this.monthview = null;
      }
    });
  }
  
  /**
   * Shows the given month and year.
   */
  showMonth(month: number, year: number) {
    if (this.monthview) {
      (this.monthview as any).showMonth(month, year);
    }
  }

  /**
   * Cleanup just before Angular destroys the component.
   * Unsubscribe observables, detach event handlers and remove other resources to avoid memory leaks.
   */
  ngOnDestroy() {
    this.destroy();
  }
}
