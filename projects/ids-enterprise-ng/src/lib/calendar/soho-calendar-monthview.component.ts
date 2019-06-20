/// <reference path="soho-calendar-monthview.d.ts" />

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'div[soho-calendar-monthview]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCalendarMonthViewComponent { // implements AfterViewInit, OnDestroy {
  @HostBinding('class.calendar-monthview') isCalendarMonthView = true;
}

// import {
//   AfterViewInit,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   HostBinding,
//   NgZone,
//   OnDestroy
// } from '@angular/core';
//
// // @ts-ignore
// @Component({
//   selector: 'div[soho-calendar-monthview]', // tslint:disable-line
//   template: `<ng-content></ng-content>`,
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class SohoCalendarMonthViewComponent { // implements AfterViewInit, OnDestroy {
//   @HostBinding('class.calendar-monthview') isCalendarMonthView = true;
//
// // -------------------------------------------
// // Private Member Data
// // -------------------------------------------
//
// /** Reference to the jQuery control. */
// private jQueryElement: JQuery;
//
// /** Reference to the Soho control api. */
// private monthview: SohoMonthViewStatic;
//
// private options: SohoMonthViewOptions = {};
//
// /**
//  * Flag to force an update of the control after the view is created.
//  */
// private updateRequired: boolean;
//
// constructor(
//   private element: ElementRef,
//   private ngZone: NgZone,
//   public ref: ChangeDetectorRef
// ) {}
//
// ngAfterViewInit() {
//
//   this.ngZone.runOutsideAngular(() => {
//     // Wrap the element in a jQuery selector.
//     this.jQueryElement = jQuery(this.element.nativeElement);
//
//     // Initialise the Soho control.
//     this.jQueryElement.monthview(this.options);
//
//     // Once the control is initialised, extract the control
//     // plug-in from the element.  The element name is defined
//     // by the plug-in, but in this case is 'monthView'.
//     this.monthview = this.jQueryElement.data('monthview');
//   });
// }
//
// /**
//  * Destructor.
//  */
// ngOnDestroy() {
//   this.ngZone.runOutsideAngular(() => {
//     if (this.jQueryElement) {
//       this.jQueryElement.off();
//     }
//     if (this.monthview) {
//       this.monthview.destroy();
//       this.monthview = null;
//     }
//   });
// }
//
// /**
//  *  Get the events and date for the currently selected monthView day.
//  */
// public getDayEvents() {
//   if (this.jQueryElement) {
//     return this.ngZone.runOutsideAngular(() => this.monthview.getDayEvents());
//   }
//   return undefined;
// }
//
// /**
//  * Update the calendar to show the given month and year
//  */
// public showMonth(month: number, year: number): void {
//   if (this.jQueryElement) {
//     this.ngZone.runOutsideAngular(() => this.monthview.showMonth(month, year));
//   }
// }
//
// /**
//  * Select a specific date visually.
//  */
// public selectDay(date: string | object, closePopup?: boolean): void {
//   if (this.jQueryElement) {
//     this.ngZone.runOutsideAngular(() => this.monthview.selectDay(date, closePopup));
//   }
// }
//
// /**
//  * Select todays date visually.
//  */
// public selectToday(): void {
//   if (this.jQueryElement) {
//     this.ngZone.runOutsideAngular(() => this.monthview.selectToday());
//   }
// }
// }
