import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModuleNavSwitcherComponent } from './soho-module-nav-switcher.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoModuleNavSwitcherComponent,
  ],
  exports: [
    SohoModuleNavSwitcherComponent,
  ]
})
export class SohoModuleNavSwitcherModule { }
