import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoCalendarComponent } from './soho-calendar.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoCalendarComponent
  ],
  exports: [
    SohoCalendarComponent
  ]
})
export class SohoCalendarModule {}
