import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoEmptyMessageDirective } from './soho-emptymessage.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoEmptyMessageDirective
  ],
  exports: [
    SohoEmptyMessageDirective
  ]
})
export class SohoEmptyMessageModule { }
