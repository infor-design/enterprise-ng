import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoSplitterComponent,
  SohoSplitterRightPaneComponent,
  SohoSplitterLeftPaneComponent
} from './splitter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoSplitterLeftPaneComponent,
    SohoSplitterRightPaneComponent,
    SohoSplitterComponent
  ],
  exports: [
    SohoSplitterComponent
  ]
})
export class SohoSplitterModule {}
