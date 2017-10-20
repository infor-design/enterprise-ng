import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoButtonModule } from '../button/soho-button.module';

import { SohoWizardComponent } from './soho-wizard.component';
import { SohoWizardTickComponent } from './soho-wizard-tick.component';
import { SohoWizardHeaderComponent } from './soho-wizard-header.component';
import { SohoWizardPageComponent } from './soho-wizard-page.component';


@NgModule({
  imports: [
    CommonModule,
    SohoButtonModule
  ],
  declarations: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent,
    SohoWizardPageComponent
  ],
  exports: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent,
    SohoWizardPageComponent
  ]})
export class SohoWizardModule {

}
