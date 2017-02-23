import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoToolbarComponent,
  SohoToolbarButtonSetComponent,
  SohoToolbarTitleComponent,
  SohoToolbarNavButtonComponent,
  SohoSectionTitleComponent,
  SohoPageTitleComponent,
  SohoToolbarMoreButtonComponent,
  SohoToolbarSearchFieldComponent,
} from './soho-toolbar.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoToolbarComponent,
    SohoToolbarButtonSetComponent,
    SohoToolbarTitleComponent,
    SohoToolbarNavButtonComponent,
    SohoSectionTitleComponent,
    SohoPageTitleComponent,
    SohoToolbarMoreButtonComponent,
    SohoToolbarSearchFieldComponent,
  ],
  exports: [
    SohoToolbarComponent,
    SohoToolbarButtonSetComponent,
    SohoToolbarTitleComponent,
    SohoToolbarNavButtonComponent,
    SohoSectionTitleComponent,
    SohoPageTitleComponent,
    SohoToolbarMoreButtonComponent,
    SohoToolbarSearchFieldComponent,
  ]
})
export class SohoToolbarModule {}
