/**
 * Created by ppatton on 8/30/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoDropdownComponent } from './dropdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoDropdownComponent
  ],
  exports: [
    SohoDropdownComponent
  ]
})
export class SohoDropdownModule {}
