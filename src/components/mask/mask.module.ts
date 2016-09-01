import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoMaskComponent } from './mask.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoMaskComponent
  ],
  exports: [
    SohoMaskComponent
  ]
})
export class SohoMaskModule {}
