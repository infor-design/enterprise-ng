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
  SohoToolbarSearchFieldWrapperComponent,
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
    SohoToolbarSearchFieldWrapperComponent,
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
    SohoToolbarSearchFieldWrapperComponent,
  ]
})
export class SohoToolbarModule {}
