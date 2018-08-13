import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTimePickerComponent } from './soho-timepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoTimePickerComponent
  ],
  exports: [
    SohoTimePickerComponent
  ]
})
export class SohoTimePickerModule {}
