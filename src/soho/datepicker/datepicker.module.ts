import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoDatepickerComponent } from './datepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoDatepickerComponent
  ],
  exports: [
    SohoDatepickerComponent
  ]
})
export class SohoDatepickerModule {}
