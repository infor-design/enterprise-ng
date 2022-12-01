import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccordionDemoComponent } from './accordion.demo';
import { AccordionDynamicDemoComponent } from './accordion-dynamic.demo';
import { AccordionPanelsDemoComponent } from './accordion-panels.demo';
import { AccordionCardDemoComponent } from './accordion-card.demo';

const routes: Routes = [
  { path: '', component: AccordionDemoComponent },
  { path: 'dynamic', component: AccordionDynamicDemoComponent },
  { path: 'panels', component: AccordionPanelsDemoComponent },
  { path: 'card', component: AccordionCardDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccordionDemoRoutingModule { }
