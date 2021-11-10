import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoSwipeActionComponent
} from './soho-swipe-action.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoSwipeActionComponent,
  ],
  exports: [
    SohoSwipeActionComponent,
  ],
})
export class SohoSwipeActionModule { }
