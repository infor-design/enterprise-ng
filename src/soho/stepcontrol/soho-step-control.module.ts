import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoStepControlComponent,
         SohoStepsListComponent,
         SohoStepsContentComponent,
         SohoStepsListTitleComponent,
         SohoStepContentTitleComponent,
         SohoStepListItemHeaderComponent,
         SohoStepListItemsComponent,
         SohoStepListItemComponent,
         SohoStepListItemAnchorComponent,
         SohoStepsContentPanelComponent
        } from '../stepcontrol/soho-step-control.component';
import { SohoIconModule } from '../icon/soho-icon.module';
import { SohoButtonModule } from '../button/soho-button.module';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule,
    SohoButtonModule
  ],
  declarations: [
    SohoStepControlComponent,
    SohoStepsListComponent,
    SohoStepsListTitleComponent,
    SohoStepContentTitleComponent,
    SohoStepsContentComponent,
    SohoStepListItemHeaderComponent,
    SohoStepListItemsComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,
    SohoStepsContentPanelComponent
  ],
  exports: [
    SohoStepControlComponent,
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
export class SohoStepControlModule {}
