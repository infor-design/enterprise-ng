import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// @ts-ignore
import { SohoComponentsModule } from 'ids-enterprise-ng';
import { AccordionDemoComponent } from './accordion.demo';
import { AccordionDynamicDemoComponent } from './accordion-dynamic.demo';
import { AccordionPanelsDemoComponent } from './accordion-panels.demo';
import { AccordionDemoRoutingModule } from './accordion-demo.routes';
import { AccordionCardDemoComponent } from './accordion-card.demo';

@NgModule({
  declarations: [
    AccordionDemoComponent,
    AccordionDynamicDemoComponent,
    AccordionPanelsDemoComponent,
    AccordionCardDemoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SohoComponentsModule,
    AccordionDemoRoutingModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class AccordionDemoModule { }
