import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoCardsComponent,
  SohoCardActionableComponent,
  SohoCardHeaderComponent,
  SohoCardContentComponent,
  SohoCardPaneComponent,
  SohoCardComponent,
} from './soho-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoCardsComponent,
    SohoCardActionableComponent,
    SohoCardHeaderComponent,
    SohoCardContentComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ],
  exports: [
    SohoCardsComponent,
    SohoCardActionableComponent,
    SohoCardHeaderComponent,
    SohoCardContentComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ]
})
export class SohoCardModule { }
