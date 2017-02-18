import { NgModule } from '@angular/core';

import {
  SohoSearchFieldComponent,
  SohoSearchFieldWrapperComponent
} from './soho-searchfield.component';
import {
  SohoToolbarSearchFieldComponent,
  SohoToolbarSearchFieldWrapperComponent
} from './soho-toolbar-searchfield.component';

@NgModule({
  declarations: [
    SohoSearchFieldComponent,
    SohoSearchFieldWrapperComponent,
    SohoToolbarSearchFieldComponent,
    SohoToolbarSearchFieldWrapperComponent
  ],
  exports: [
    SohoSearchFieldComponent,
    SohoSearchFieldWrapperComponent,
    SohoToolbarSearchFieldComponent,
    SohoToolbarSearchFieldWrapperComponent
  ],
})
export class SohoSearchFieldModule {}
