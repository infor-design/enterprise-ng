import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModuleNavSwitcherComponent } from './soho-module-nav-switcher.component';
import { SohoIconModule } from '../icon';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule
  ],
  declarations: [
    SohoModuleNavSwitcherComponent,
  ],
  exports: [
    SohoModuleNavSwitcherComponent,
  ]
})
export class SohoModuleNavSwitcherModule { }
