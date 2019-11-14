import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModalService } from './soho-modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SohoModalService
  ]
})
export class SohoModalModule {}
