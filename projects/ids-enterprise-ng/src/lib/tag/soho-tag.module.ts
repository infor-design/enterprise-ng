import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoTagComponent,
  SohoTagListComponent
} from './soho-tag.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoTagComponent,
    SohoTagListComponent
  ],
  exports: [
    SohoTagComponent,
    SohoTagListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SohoTagModule { }
