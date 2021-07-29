import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoNotificationBadgeComponent } from './soho-notification-badge.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoNotificationBadgeComponent,
  ],
  exports: [
    SohoNotificationBadgeComponent,
  ]
})
export class SohoNotificationBadgeModule { }
