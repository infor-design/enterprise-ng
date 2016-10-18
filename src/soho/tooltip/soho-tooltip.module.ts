import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoTooltipComponent
} from './soho-tooltip.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTooltipComponent
  ],
  exports: [
    SohoTooltipComponent
  ]
})
export class SohoTooltipModule {}
