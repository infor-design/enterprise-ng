import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoFieldOptionsDirective } from './soho-field-options.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoFieldOptionsDirective
  ],
  exports: [
    SohoFieldOptionsDirective
  ]
})
export class SohoFieldOptionsModule {}
