import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoStepControlComponent,
         SohoStepsListComponent,
         SohoStepsContentComponent,
         SohoStepsListTitleComponent,
         SohoStepContentTitleComponent,
         SohoStepIconComponent,
         SohoStepIconUseComponent,
         SohoStepListItemHeaderComponent,
         SohoStepListItemsComponent,
         SohoStepListItemComponent,
         SohoStepListItemAnchorComponent,
         SohoStepsContentPanelComponent
        } from '../stepcontrol/soho-step-control.component';
import { SohoIconModule } from '../icon/soho-icon.module';

@NgModule({
  imports: [ CommonModule,     SohoIconModule ],
  declarations: [
    SohoStepControlComponent,
    SohoStepsListComponent,
    SohoStepsListTitleComponent,
    SohoStepContentTitleComponent,
    SohoStepsContentComponent,
    SohoStepIconComponent,
    SohoStepIconUseComponent,
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
    SohoStepIconComponent,
    SohoStepIconUseComponent,
    SohoStepListItemHeaderComponent,
    SohoStepListItemsComponent,
    SohoStepListItemComponent,
    SohoStepListItemAnchorComponent,
    SohoStepsContentPanelComponent
  ]
})
export class SohoStepControlModule {}
