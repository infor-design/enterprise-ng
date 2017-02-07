import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoStepProcessComponent,
         SohoStepsListComponent,
         SohoStepsContentComponent,
         SohoStepsListTitleComponent,
         SohoStepContentTitleComponent,
         SohoStepItemTitleComponent,
         SohoStepListItemHeaderComponent,
         SohoStepListItemsComponent,
         SohoStepListItemComponent,
         SohoStepListItemAnchorComponent,
         SohoStepsContentPanelComponent
        } from '../stepprocess/soho-stepprocess.component';
import { SohoIconModule } from '../icon/soho-icon.module';
import { SohoButtonModule } from '../button/soho-button.module';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule,
    SohoButtonModule
  ],
  declarations: [
    SohoStepProcessComponent,
    SohoStepsListComponent,
    SohoStepsListTitleComponent,
    SohoStepContentTitleComponent,
    SohoStepsContentComponent,
    SohoStepItemTitleComponent,
    SohoStepListItemHeaderComponent,
    SohoStepListItemsComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,

    SohoStepsContentPanelComponent,

  ],
  exports: [
    SohoStepProcessComponent,
    SohoStepsListComponent,
    SohoStepsListTitleComponent,
    SohoStepContentTitleComponent,
    SohoStepsContentComponent,
    SohoStepListItemHeaderComponent,
    SohoStepListItemsComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,
    SohoStepsContentPanelComponent
  ]
})
export class SohoStepProcessModule {}
