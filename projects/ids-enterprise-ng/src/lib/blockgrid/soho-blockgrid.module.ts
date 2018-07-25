import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoBlockGridComponent } from './soho-blockgrid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoBlockGridComponent
  ],
  exports: [
    SohoBlockGridComponent
  ],
})
export class SohoBlockGridModule {}
