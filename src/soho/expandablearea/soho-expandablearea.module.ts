import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ExpandableAreaComponent,
  ExpandableHeaderComponent,
  ExpandablePaneComponent
} from './soho-expandablearea.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ExpandableAreaComponent,
    ExpandableHeaderComponent,
    ExpandablePaneComponent,
  ],
  exports: [
    ExpandableAreaComponent,
    ExpandableHeaderComponent,
    ExpandablePaneComponent,
  ]
})
export class SohoExpandableAreaModule {}
