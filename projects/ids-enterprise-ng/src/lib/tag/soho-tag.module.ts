import { NgModule } from '@angular/core';
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
})
export class SohoTagModule {}
