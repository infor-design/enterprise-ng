import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoErrorDirective } from './soho-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoErrorDirective
  ],
  exports: [
    SohoErrorDirective
  ]
})
export class SohoErrorModule { }
