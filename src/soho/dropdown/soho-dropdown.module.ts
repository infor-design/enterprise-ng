/**
 * Created by ppatton on 8/30/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoDropDownComponent } from './soho-dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoDropDownComponent
  ],
  exports: [
    SohoDropDownComponent
  ]
})
export class SohoDropDownModule {}
