import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoAutoCompleteComponent } from './soho-autocomplete.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoAutoCompleteComponent
  ],
  exports: [
    SohoAutoCompleteComponent
  ],
})
export class SohoAutoCompleteModule {}
