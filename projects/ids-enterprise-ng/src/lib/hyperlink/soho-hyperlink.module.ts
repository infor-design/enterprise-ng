import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoHyperlinkComponent } from './soho-hyperlink.component';
import { SohoIconModule } from '../icon/soho-icon.module';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule
  ],

  declarations: [
    SohoHyperlinkComponent
  ],

  exports: [
    SohoHyperlinkComponent
  ]
})
export class SohoHyperlinkModule {}
