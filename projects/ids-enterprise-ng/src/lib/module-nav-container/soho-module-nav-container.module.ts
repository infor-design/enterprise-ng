import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModuleNavContainerComponent } from './soho-module-nav-container.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoModuleNavContainerComponent,
  ],
  exports: [
    SohoModuleNavContainerComponent,
  ]
})
export class SohoModuleNavContainerModule { }
