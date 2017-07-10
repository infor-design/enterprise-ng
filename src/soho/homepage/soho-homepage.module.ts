import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoHomePageComponent,
  SohoWidgetComponent,
  SohoWidgetContentComponent,
  SohoWidgetHeaderComponent,
  SohoWidgetTitleComponent } from './';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    SohoHomePageComponent,
    SohoWidgetComponent,
    SohoWidgetContentComponent,
    SohoWidgetHeaderComponent,
    SohoWidgetTitleComponent
  ],
  exports:      [
    SohoHomePageComponent,
    SohoWidgetComponent,
    SohoWidgetContentComponent,
    SohoWidgetHeaderComponent,
    SohoWidgetTitleComponent
  ]
})
export class SohoHomePageModule {
}
