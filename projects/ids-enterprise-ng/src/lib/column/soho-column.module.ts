import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoColumnComponent } from './soho-column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoColumnComponent
  ],
  exports: [
    SohoColumnComponent
  ],
})
export class SohoColumnModule {}
