import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoTreeComponent } from './Tree.component';

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
