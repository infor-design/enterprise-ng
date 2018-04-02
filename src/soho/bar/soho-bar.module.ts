import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoBarComponent } from './soho-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoBarComponent
  ],
  exports: [
    SohoBarComponent
  ],
})
export class SohoBarModule {}
