import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoToastService } from './toast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SohoToastService
  ]
})
export class SohoToastModule { }
