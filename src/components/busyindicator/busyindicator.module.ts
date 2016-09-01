/**
 * Created by ppatton on 8/30/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoBusyIndicatorComponent } from './busyindicator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoBusyIndicatorComponent
  ],
  exports: [
    SohoBusyIndicatorComponent
  ]
})
export class SohoBusyIndicatorModule {}
