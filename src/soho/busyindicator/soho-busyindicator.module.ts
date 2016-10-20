/**
 * Created by ppatton on 8/30/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoBusyIndicatorDirective } from './soho-busyindicator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoBusyIndicatorDirective
  ],
  exports: [
    SohoBusyIndicatorDirective
  ]
})
export class SohoBusyIndicatorModule {}
