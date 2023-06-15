import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModuleNavSettingsComponent } from './soho-module-nav-settings.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoModuleNavSettingsComponent,
  ],
  exports: [
    SohoModuleNavSettingsComponent,
  ]
})
export class SohoModuleNavSettingsModule { }
