import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoInputComponent } from './soho-input.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoInputComponent
  ],
  exports: [
    SohoInputComponent
  ]
})
export class SohoInputModule {}
