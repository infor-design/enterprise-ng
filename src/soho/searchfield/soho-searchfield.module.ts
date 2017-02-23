import { NgModule } from '@angular/core';

import {
  SohoSearchFieldComponent,
  SohoSearchFieldWrapperComponent
} from './soho-searchfield.component';

@NgModule({
  declarations: [
    SohoSearchFieldComponent,
    SohoSearchFieldWrapperComponent,
  ],
  exports: [
    SohoSearchFieldComponent,
    SohoSearchFieldWrapperComponent,
  ],
})
export class SohoSearchFieldModule {}
