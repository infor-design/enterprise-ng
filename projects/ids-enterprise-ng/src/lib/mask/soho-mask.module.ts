import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoMaskDirective } from './soho-mask.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoMaskDirective
  ],
  exports: [
    SohoMaskDirective
  ]
})
export class SohoMaskModule {}
