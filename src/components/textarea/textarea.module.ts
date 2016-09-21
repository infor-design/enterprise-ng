import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoTextareaComponent
} from './textarea.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTextareaComponent
  ],
  exports: [
    SohoTextareaComponent
  ]
})
export class SohoTextareaModule {}
