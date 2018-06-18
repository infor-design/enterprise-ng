import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoFieldFilterDirective } from './soho-field-filter.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoFieldFilterDirective
  ],
  exports: [
    SohoFieldFilterDirective
  ]
})
export class SohoFieldFilterModule {}
