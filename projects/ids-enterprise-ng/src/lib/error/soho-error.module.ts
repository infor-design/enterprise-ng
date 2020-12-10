import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoErrorDirective } from './soho-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoErrorDirective // eslint-disable-line
  ],
  exports: [
    SohoErrorDirective // eslint-disable-line
  ]
})
export class SohoErrorModule { }
