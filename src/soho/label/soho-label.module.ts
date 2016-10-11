import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoLabelDirective } from './soho-label.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoLabelDirective
  ],
  exports: [
    SohoLabelDirective
  ]
})
export class SohoLabelModule {}
