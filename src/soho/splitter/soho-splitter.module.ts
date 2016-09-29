import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoSplitterComponent
} from './soho-splitter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoSplitterComponent
  ],
  exports: [
    SohoSplitterComponent
  ]
})
export class SohoSplitterModule {}
