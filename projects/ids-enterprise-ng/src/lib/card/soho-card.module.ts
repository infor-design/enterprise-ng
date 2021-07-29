import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoCardsComponent,
  SohoCardHeaderComponent,
  SohoCardPaneComponent,
  SohoCardComponent,
} from './soho-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoCardsComponent,
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ],
  exports: [
    SohoCardsComponent,
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ]
})
export class SohoCardModule { }
