import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoDatePickerComponent } from './soho-datepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoDatePickerComponent
  ],
  exports: [
    SohoDatePickerComponent
  ]
})
export class SohoDatePickerModule {}
