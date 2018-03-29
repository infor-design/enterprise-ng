import { NgModule } from '@angular/core';
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
})
export class SohoPieModule {}
