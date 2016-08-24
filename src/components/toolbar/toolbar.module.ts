import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoToolbarComponent,
  SohoToolbarButtonSetComponent,
  SohoToolbarTitleComponent,
  SohoToolbarNavButtonComponent,
  SohoSectionTitleComponent,
  SohoPageTitleComponent,
  SohoToolbarMoreButtonComponent
} from './toolbar.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoToolbarComponent,
    SohoToolbarButtonSetComponent,
    SohoToolbarTitleComponent,
    SohoToolbarNavButtonComponent,
    SohoSectionTitleComponent,
    SohoPageTitleComponent,
    SohoToolbarMoreButtonComponent
  ],
  exports: [
    SohoToolbarComponent,
    SohoToolbarButtonSetComponent,
    SohoToolbarTitleComponent,
    SohoToolbarNavButtonComponent,
    SohoSectionTitleComponent,
    SohoPageTitleComponent,
    SohoToolbarMoreButtonComponent
  ]
})
export class SohoToolbarModule {}
