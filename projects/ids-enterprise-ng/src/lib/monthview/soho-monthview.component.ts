/// <reference path="soho-monthview.d.ts" />

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  NgZone,
  OnDestroy, Output
} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'div[soho-monthview]', // tslint:disable-line
  templateUrl: './soho-monthview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoMonthViewComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * Initial month to show
   */
  @Input() set month(month: number) {
    this.options.month = month;
    if (this.monthview) {
      this.monthview.settings.month = month;
      this.markForRefresh();
    }
  }

  /**
   * Initial year to show
   */
  @Input() set year(year: number) {
    this.options.year = year;
    if (this.monthview) {
      this.monthview.settings.year = year;
      this.markForRefresh();
    }
  }

  /**
   * If false the dropdown to change views will not be shown.
   */
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean) {
    this.options.showMonthYearPicker = showMonthYearPicker;
    if (this.monthview) {
      this.monthview.settings.showMonthYearPicker = showMonthYearPicker;
      this.markForRefresh();
    }
  }

  // Add Events for Angular elements to listen to (can only have exposed events)
  @Output() selected: EventEmitter<SohoMonthViewSelectedEvent> = new EventEmitter();

  @Output() monthRendered: EventEmitter<SohoMonthViewRenderMonthEvent> = new EventEmitter();

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery control. */
  private jQueryElement: JQuery;

  /** Reference to the Soho control api. */
  private monthview: SohoMonthViewStatic;

  private options: SohoMonthViewOptions = {};

  /**
   * Flag to force an update of the control after the view is created.
   */
  private updateRequired: boolean;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Add listeners to emit events
      this.jQueryElement
      .on('selected', (event: SohoMonthViewSelectedEvent) => this.onSelectedEvent(event))
      .on('monthrendered', (event: SohoMonthViewRenderMonthEvent) => this.onMonthRenderedEvent(event));

      // Initialise the Soho control.
      this.jQueryElement.monthview(this.options);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is defined
      // by the plug-in, but in this case is 'monthView'.
      this.monthview = this.jQueryElement.data('monthview');
    });
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.monthview) {
          this.monthview.updated();
        }
        this.updateRequired = false;
      });
    }
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
      if (this.monthview) {
        this.monthview.destroy();
        this.monthview = null;
      }
    });
  }

  onSelectedEvent(event: SohoMonthViewSelectedEvent) {
    this.ngZone.run(() => this.selected.emit(event));
  }

  onMonthRenderedEvent(event: SohoMonthViewRenderMonthEvent) {
    this.ngZone.run(() => this.monthRendered.emit(event));
  }

  /**
   *  Get the events and date for the currently selected monthView day.
   */
  public getDayEvents() {
    if (this.jQueryElement) {
      return this.ngZone.runOutsideAngular(() => this.monthview.getDayEvents());
    }
    return undefined;
  }

  /**
   * Update the calendar to show the given month and year
   */
  public showMonth(month: number, year: number): void {
    if (this.jQueryElement) {
      this.ngZone.runOutsideAngular(() => this.monthview.showMonth(month, year));
    }
  }

  /**
   * Select a specific date visually.
   */
  public selectDay(date: string | object, closePopup?: boolean): void {
    if (this.jQueryElement) {
      this.ngZone.runOutsideAngular(() => this.monthview.selectDay(date, closePopup));
    }
  }

  /**
   * Select todays date visually.
   */
  public selectToday(): void {
    if (this.jQueryElement) {
      this.ngZone.runOutsideAngular(() => this.monthview.selectToday());
    }
  }
}
