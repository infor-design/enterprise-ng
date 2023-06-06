import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModuleNavComponent } from './soho-module-nav.component';

// @TODO do we need to import Soho Accordion/Search/Dropdown/Popupmenu here?
// import { SohoAccordionHeaderComponent } from './soho-accordion-header.component';
// import { SohoAccordionPaneComponent } from './soho-accordion-pane.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoModuleNavComponent
  ],
  exports: [
    SohoModuleNavComponent
  ]
})
export class SohoModuleNavModule { }
