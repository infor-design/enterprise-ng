import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoRowComponent,
} from './soho-row.component';

import {
  SohoColumnsComponent,
} from './soho-columns.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoRowComponent,
    SohoColumnsComponent
  ],
  exports: [
    SohoRowComponent,
    SohoColumnsComponent
  ],
})
export class SohoGridModule { }
