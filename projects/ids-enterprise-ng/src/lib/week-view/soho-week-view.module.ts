import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoWeekViewComponent } from './soho-week-view.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoWeekViewComponent,
  ],
  exports: [
    SohoWeekViewComponent,
  ]
})
export class SohoWeekViewModule {}
