import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoRatingComponent } from './soho-rating.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoRatingComponent
  ],
  exports: [
    SohoRatingComponent
  ],
})
export class SohoRatingModule {}
