import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ExpandableAreaComponent,
  ExpandableFooterComponent,
  ExpandableHeaderComponent,
  ExpandablePaneComponent
} from './soho-expandablearea.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ExpandableAreaComponent,
    ExpandableFooterComponent,
    ExpandableHeaderComponent,
    ExpandablePaneComponent,
  ],
  exports: [
    ExpandableAreaComponent,
    ExpandableFooterComponent,
    ExpandableHeaderComponent,
    ExpandablePaneComponent,
  ]
})
export class SohoExpandableAreaModule {}
