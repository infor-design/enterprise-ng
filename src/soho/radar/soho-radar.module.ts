import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoRadarComponent } from './soho-radar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoRadarComponent
  ],
  exports: [
    SohoRadarComponent
  ],
})
export class SohoRadarModule {}
