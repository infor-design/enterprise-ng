import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoPopupMenuDirective } from './soho-popup-menu.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoPopupMenuDirective
  ],
  exports: [
    SohoPopupMenuDirective
  ]
})
export class SohoPopupMenuModule {}
