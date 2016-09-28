import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTimepickerComponent } from './soho-timepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoTimepickerComponent
  ],
  exports: [
    SohoTimepickerComponent
  ]
})
export class SohoTimepickerModule {}
