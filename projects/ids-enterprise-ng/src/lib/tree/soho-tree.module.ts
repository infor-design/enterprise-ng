import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTreeComponent } from './soho-tree.component';

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
