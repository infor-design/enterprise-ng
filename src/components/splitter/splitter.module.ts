import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoSplitterComponent,
  SohoSplitterPaneComponent,
} from './splitter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoSplitterPaneComponent,
    SohoSplitterComponent
  ],
  exports: [
    SohoSplitterPaneComponent,
    SohoSplitterComponent
  ]
})
export class SohoSplitterModule {}
