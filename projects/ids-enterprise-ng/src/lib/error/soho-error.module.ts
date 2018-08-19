import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoErrorDirective } from './soho-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoErrorDirective // tslint:disable-line
  ],
  exports: [
    SohoErrorDirective // tslint:disable-line
  ]
})
export class SohoErrorModule { }
