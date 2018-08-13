import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoButtonModule } from '../button/soho-button.module';

import {
  SohoSwapListCardComponent,
  SohoSwapListComponent
} from './soho-swaplist.component';

@NgModule({
  imports: [
    CommonModule,
    SohoButtonModule
  ],
  declarations: [
    SohoSwapListCardComponent,
    SohoSwapListComponent
  ],
  exports: [
    SohoSwapListCardComponent,
    SohoSwapListComponent
  ]
})
export class SohoSwapListModule { }
