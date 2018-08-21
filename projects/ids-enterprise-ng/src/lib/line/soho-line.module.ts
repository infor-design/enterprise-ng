import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoLineComponent } from './soho-line.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoLineComponent
  ],
  exports: [
    SohoLineComponent
  ],
})
export class SohoLineModule {}
