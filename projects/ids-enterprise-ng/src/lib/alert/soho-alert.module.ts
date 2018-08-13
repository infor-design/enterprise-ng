import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoAlertDirective } from './soho-alert.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoAlertDirective
  ],
  exports: [
    SohoAlertDirective
  ]
})
export class SohoAlertModule { }
