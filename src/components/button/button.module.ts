import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoButtonComponent } from './button.component';
import { SohoIconModule } from '../icon/icon.module';

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
