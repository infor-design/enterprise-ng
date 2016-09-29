import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoTextAreaComponent
} from './soho-textarea.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTextAreaComponent
  ],
  exports: [
    SohoTextAreaComponent
  ]
})
export class SohoTextAreaModule {}
