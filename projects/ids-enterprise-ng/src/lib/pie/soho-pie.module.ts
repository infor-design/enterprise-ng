import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoPieComponent } from './soho-pie.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoPieComponent
  ],
  exports: [
    SohoPieComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SohoPieModule { }
