import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTreeComponent } from './tree.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoTreeComponent
  ],
  exports: [
    SohoTreeComponent
  ]
})
export class SohoTreeModule {}
