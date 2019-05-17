import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoNotificationService } from './soho-notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SohoNotificationService
  ]
})
export class SohoNotificationModule { }
