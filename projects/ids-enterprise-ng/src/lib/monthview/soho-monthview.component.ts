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

@Component({
  selector: 'div[soho-monthview]', // tslint:disable-line
  templateUrl: './soho-monthview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoMonthViewComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * Initial month to show
   */
  @Input() set month(month: []) {
    this._monthViewOptions.month = month;
    if (this.monthView) {
      this.markForRefresh();
    }
  }

  /**
   * Initial year to show
   */
  @Input() set year(year: []) {
    this._monthViewOptions.year = year;
    if (this.monthView) {
      this.markForRefresh();
    }
  }

  /**
   * If false the dropdown to change views will not be shown.
   */
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean) {
    this._monthViewOptions.showMonthYearPicker = showMonthYearPicker;
    if (this.monthView) {
      this.markForRefresh();
    }
  }

  public todaysEvents: Array<SohoMonthViewEvent> = [];

  // Add Events for Angular elements to listen to (can only have exposed events)
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();

  @Output() renderMonth: EventEmitter<Object> = new EventEmitter<Object>();

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery control. */
  private jQueryElement: JQuery;

  /** Reference to the Soho control api. */
  private monthView: SohoMonthViewStatic;

  private _monthViewOptions: SohoMonthViewOptions = {};

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck: boolean;

  constructor(private element: ElementRef,
              private ngZone: NgZone,
              public ref: ChangeDetectorRef) {
  }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Add the selected callback.
      this._monthViewOptions.onSelected = (node: any, args: []) => {
        this.onSelected(node, args);
      };

      // Add the renderMonth callback.
      this._monthViewOptions.onRenderMonth = (node: any, response: any) => {
        this.onRenderMonth(response);
      };

      // Initialise the Soho control.
      this.jQueryElement.monthview(this._monthViewOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is defined
      // by the plug-in, but in this case is 'monthView'.
      this.monthView = this.jQueryElement.data('monthview');

      // Add listeners to emit events
    });

    // There are no 'extra' event handlers for monthView.
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.monthView) {
          this.monthView.updated(this._monthViewOptions);
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
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
      if (this.monthView) {
        this.monthView.destroy();
        this.monthView = null;
      }
    });
  }

  /**
   * Fires when a month day is clicked. Allowing you to do something.
   */
  private onSelected(node: any, args: []) {
    this.ngZone.runOutsideAngular(() => {
      this.todaysEvents = this.getDayEvents().events;
    });

    if (this.monthView) {
      this.ref.markForCheck();
    }

    // ensure we are back in the angular zone
    this.ngZone.run(() => this.selected.emit(event));
  }

  // /**
  //  * Event fired month view is rendered.
  //  */
  private onRenderMonth(response: any) {
    const event: SohoMonthViewRenderMonthEvent = { node: this, response: response};

    // ensure we are back in the angular zone
    this.ngZone.run(() => this.renderMonth.emit(event));
  }

  /**
   *  Get the events and date for the currently selected monthView day.
   */
  getDayEvents() {
    if (this.jQueryElement) {
      return this.ngZone.runOutsideAngular(() => this.monthView.getDayEvents());
    }
    return undefined;
  }
}
