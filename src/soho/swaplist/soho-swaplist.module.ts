import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoSwapListComponent } from './soho-swaplist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      SohoSwapListComponent
  ],
  exports: [
      SohoSwapListComponent
  ]
})
export class SohoSwapListModule {}
