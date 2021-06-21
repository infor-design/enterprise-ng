import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoCardHeaderComponent,
  SohoCardPaneComponent,
  SohoCardComponent
} from './soho-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ],
  exports: [
    SohoCardHeaderComponent,
    SohoCardPaneComponent,
    SohoCardComponent,
  ]
})
export class SohoCardModule { }
