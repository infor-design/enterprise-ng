import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoTooltipDirective
} from './soho-tooltip.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTooltipDirective
  ],
  exports: [
    SohoTooltipDirective
  ]
})
export class SohoTooltipModule {}
