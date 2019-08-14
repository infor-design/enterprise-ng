import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoHomePageComponent } from './soho-homepage.component';
import { SohoWidgetComponent } from './soho-widget.component';
import { SohoWidgetContentComponent } from './soho-widget-content.component';
import { SohoWidgetHeaderComponent } from './soho-widget-header.component';
import { SohoWidgetTitleComponent } from './soho-widget-title.component';
import { SohoHomepageSizerDirective } from './soho-homepage-sizer.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    SohoHomePageComponent,
    SohoHomepageSizerDirective,
    SohoWidgetComponent,
    SohoWidgetContentComponent,
    SohoWidgetHeaderComponent,
    SohoWidgetTitleComponent
  ],
  exports:      [
    SohoHomePageComponent,
    SohoHomepageSizerDirective,
    SohoWidgetComponent,
    SohoWidgetContentComponent,
    SohoWidgetHeaderComponent,
    SohoWidgetTitleComponent
  ]
})
export class SohoHomePageModule {
}
