import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoHeaderComponent } from './soho-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoHeaderComponent
  ],
  exports: [
    SohoHeaderComponent
  ]
})
export class SohoHeaderModule {}
