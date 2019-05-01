import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoToolbarFlexComponent,
  SohoToolbarFlexNavButtonComponent,
  SohoToolbarFlexSectionTitleComponent,
  SohoToolbarFlexPageTitleComponent,
  SohoToolbarFlexMoreButtonComponent,
  SohoToolbarFlexSectionComponent,
  SohoToolbarFlexSearchFieldComponent,
} from './soho-toolbar-flex.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoToolbarFlexComponent,
    SohoToolbarFlexNavButtonComponent,
    SohoToolbarFlexSectionTitleComponent,
    SohoToolbarFlexPageTitleComponent,
    SohoToolbarFlexMoreButtonComponent,
    SohoToolbarFlexSectionComponent,
    SohoToolbarFlexSearchFieldComponent,
  ],
  exports: [
    SohoToolbarFlexComponent,
    SohoToolbarFlexNavButtonComponent,
    SohoToolbarFlexSectionTitleComponent,
    SohoToolbarFlexPageTitleComponent,
    SohoToolbarFlexMoreButtonComponent,
    SohoToolbarFlexSectionComponent,
    SohoToolbarFlexSearchFieldComponent,
  ]
})
export class SohoToolbarFlexModule {}
