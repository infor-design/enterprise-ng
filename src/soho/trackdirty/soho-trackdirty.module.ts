import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTrackDirtyDirective } from './soho-trackdirty.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoTrackDirtyDirective
  ],
  exports: [
    SohoTrackDirtyDirective
  ]
})
export class SohoTrackDirtyModule {
}
