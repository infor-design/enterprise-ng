import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoButtonComponent } from './soho-button.component';
import { SohoIconModule } from '../icon/soho-icon.module';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule
  ],
  declarations: [
    SohoButtonComponent
  ],
  exports: [
    SohoButtonComponent
  ]
})
export class SohoButtonModule {}
