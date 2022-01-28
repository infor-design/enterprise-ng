import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoCardsComponent,
  SohoCardActionableComponent,
  SohoCardHeaderComponent,
  SohoCardPaneComponent,
  SohoCardComponent,
} from './soho-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoCardsComponent,
    SohoCardActionableComponent,
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ],
  exports: [
    SohoCardsComponent,
    SohoCardActionableComponent,
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ]
})
export class SohoCardModule { }
