import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoInputValidateDirective } from './soho-input-validate.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoInputValidateDirective
  ],
  exports: [
    SohoInputValidateDirective
  ]
})
export class SohoInputValidateModule { }
