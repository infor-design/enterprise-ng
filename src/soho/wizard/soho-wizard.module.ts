import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoButtonModule } from '../button/soho-button.module';

import { SohoWizardComponent } from './soho-wizard.component';
import { SohoWizardTickComponent } from './soho-wizard-tick.component';
import { SohoWizardHeaderComponent } from './soho-wizard-header.component';
import { SohoWizardPageComponent } from './soho-wizard-page.component';
import { SohoWizardPagesComponent } from './soho-wizard-pages.component';
import { SohoWizardButtonbarComponent } from './soho-wizard-buttonbar.component';

@NgModule({
  imports: [
    CommonModule,
    SohoButtonModule
  ],
  declarations: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent,
    SohoWizardPagesComponent,
    SohoWizardPageComponent,
    SohoWizardButtonbarComponent
  ],
  exports: [
    SohoWizardComponent,
    SohoWizardTickComponent,
    SohoWizardHeaderComponent,
    SohoWizardPagesComponent,
    SohoWizardPageComponent,
    SohoWizardButtonbarComponent
  ]})
export class SohoWizardModule {

}
