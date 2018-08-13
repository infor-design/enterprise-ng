import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoCheckBoxComponent } from './soho-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoCheckBoxComponent
  ],
  exports: [
    SohoCheckBoxComponent
  ]
})
export class SohoCheckBoxModule {}
