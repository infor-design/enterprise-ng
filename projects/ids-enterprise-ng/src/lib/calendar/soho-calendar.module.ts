import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoCalendarComponent, SohoCalendarMonthViewComponent } from './soho-calendar.component';

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
