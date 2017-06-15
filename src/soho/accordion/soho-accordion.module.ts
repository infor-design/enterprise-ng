import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoAccordionComponent } from './soho-accordion.component';
import { SohoAccordionHeaderComponent } from './soho-accordion-header.component';
import { SohoAccordionPaneComponent } from './soho-accordion-pane.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoAccordionComponent,
    SohoAccordionHeaderComponent,
    SohoAccordionPaneComponent,
  ],
  exports: [
    SohoAccordionComponent,
    SohoAccordionHeaderComponent,
    SohoAccordionPaneComponent,
  ]
})
export class SohoAccordionModule {}
