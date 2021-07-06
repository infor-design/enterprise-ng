import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoMonthViewComponent } from './soho-monthview.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoMonthViewComponent,
  ],
  exports: [
    SohoMonthViewComponent
  ]
})
export class SohoMonthViewModule { }
