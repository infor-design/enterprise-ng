import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoToastService } from './toast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoToastService
  ],
  exports: [
    SohoToastService
  ]
})
export class SohoToastModule { }
