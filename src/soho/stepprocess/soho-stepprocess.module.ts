import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoStepListComponent,
  SohoStepListTitleComponent,
  SohoStepListItemComponent,
  SohoStepListItemAnchorComponent,
  SohoStepListItemTitleComponent,
  SohoSubstepListComponent,
  SohoStepContentTitleComponent,
  SohoStepContentComponent,
  SohoStepContentPanelComponent,
  SohoStepProcessComponent
} from '../stepprocess/soho-stepprocess.component';
import { SohoIconModule } from '../icon/soho-icon.module';
import { SohoButtonModule } from '../button/soho-button.module';
import { SohoToolbarModule } from '../toolbar/soho-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule,
    SohoButtonModule,
    SohoToolbarModule
  ],
  declarations: [
    SohoStepListComponent,
    SohoStepListTitleComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,
    SohoStepListItemTitleComponent,
    SohoSubstepListComponent,
    SohoStepContentTitleComponent,
    SohoStepContentComponent,
    SohoStepContentPanelComponent,
    SohoStepProcessComponent
  ],
  exports: [
    SohoStepListComponent,
    SohoStepListTitleComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,
    SohoStepListItemTitleComponent,
    SohoSubstepListComponent,
    SohoStepContentTitleComponent,
    SohoStepContentComponent,
    SohoStepContentPanelComponent,
    SohoStepProcessComponent
  ]
})
export class SohoStepProcessModule {}
