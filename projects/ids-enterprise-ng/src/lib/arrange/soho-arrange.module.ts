import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoArrangeDirective,
} from './soho-arrange.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SohoArrangeDirective],
  exports: [SohoArrangeDirective],
})
export class SohoArrangeModule {}
