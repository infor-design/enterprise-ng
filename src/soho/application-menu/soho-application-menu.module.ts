/**
 * Created by ppatton on 8/30/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoApplicationMenuComponent } from './soho-application-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoApplicationMenuComponent
  ],
  exports: [
    SohoApplicationMenuComponent
  ]
})
export class SohoApplicationMenuModule {}
