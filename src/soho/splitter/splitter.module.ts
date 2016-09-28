import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoSplitterComponent
} from './splitter.component';

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
