import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoRadioButtonComponent
} from './soho-radiobutton.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoRadioButtonComponent
  ],
  exports: [
    SohoRadioButtonComponent
  ]
})
export class SohoRadioButtonModule {}
