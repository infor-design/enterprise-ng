import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoPersonalizeDirective } from './soho-personalize.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoPersonalizeDirective
  ],
  exports: [
    SohoPersonalizeDirective
  ]
})
export class SohoPersonalizeModule { }
