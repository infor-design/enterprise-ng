import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoCalendarComponent } from './soho-calendar.component';
import { SohoCalendarMonthViewComponent } from './soho-calendar-monthview.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoCalendarComponent,
    SohoCalendarMonthViewComponent,
  ],
  exports: [
    SohoCalendarComponent,
    SohoCalendarMonthViewComponent,
  ]
})
export class SohoCalendarModule {}
