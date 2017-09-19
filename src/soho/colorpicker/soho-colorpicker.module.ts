import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoColorPickerComponent } from './soho-colorpicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoColorPickerComponent
  ],
  exports: [
    SohoColorPickerComponent
  ]
})
export class SohoColorPickerModule {}
