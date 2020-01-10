import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoWeekviewComponent } from './soho-weekview.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoWeekviewComponent,
  ],
  exports: [
    SohoWeekviewComponent,
  ]
})
export class SohoWeekviewModule {}
