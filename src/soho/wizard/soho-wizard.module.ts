import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoWizardComponent } from './soho-wizard.component';
import { SohoWizardTickComponent } from './soho-wizard-tick.component';
import { SohoWizardHeaderComponent } from './soho-wizard-header.component';
import { SohoButtonModule } from '../button/soho-button.module';

@NgModule({
  imports: [
    CommonModule,
    SohoButtonModule
  ],
  declarations: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent
  ],
  exports: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent
  ]})
export class SohoWizardModule {

}
