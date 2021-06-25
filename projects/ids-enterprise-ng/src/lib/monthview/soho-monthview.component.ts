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

  // -------------------------------------
  // Component Output
  // -------------------------------------
  @Output() monthRendered = new EventEmitter<SohoMonthViewRenderEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private monthview?: SohoMonthView | null;
  private _monthviewOptions?: SohoMonthViewOptions = {};
  private updatedRequired?: boolean;

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
        .on('monthrendered', (_e: any, args: SohoMonthViewRenderEvent) => this.onMonthViewRenderedEvent(args));

      // Initialize the Soho control.
      this.jQueryElement.monthview(this._monthviewOptions);

      this.monthview = this.jQueryElement.data('monthview');
    });
  }

  ngAfterViewChecked() {
    if (!this.monthview || !this.jQueryElement) {
      return;
    }

    if (this.updatedRequired) {
      this.updated();
      this.updatedRequired = false;
    }
  }

  onMonthViewRenderedEvent(event: SohoMonthViewRenderEvent) {
    this.ngZone.runOutsideAngular(() => this.monthRendered.emit(event));
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
    this.updatedRequired = true;

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
      }
      if (this.monthview) {
        this.monthview.destroy();
        this.monthview = null;
      }
    });
  }

  /**
   * Cleanup just before Angular destroys the component.
   * Unsubscribe observables, detach event handlers and remove other resources to avoid memory leaks.
   */
  ngOnDestroy() {
    this.destroy();
  }
}
