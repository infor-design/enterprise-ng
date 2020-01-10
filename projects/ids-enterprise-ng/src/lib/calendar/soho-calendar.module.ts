import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoCalendarComponent, SohoCalendarMonthViewComponent, SohoCalendarWeekViewComponent } from './soho-calendar.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoCalendarComponent,
    SohoCalendarMonthViewComponent,
    SohoCalendarWeekViewComponent
  ],
  exports: [
    SohoCalendarComponent,
    SohoCalendarMonthViewComponent,
    SohoCalendarWeekViewComponent
  ]
})
export class SohoCalendarModule {}
