import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconModule } from '../icon/soho-icon.module';
import { SohoStandalonePagerComponent } from './soho-standalone-pager.component';

@NgModule({
  imports: [
    CommonModule,
    SohoIconModule
  ],
  declarations: [
    SohoStandalonePagerComponent
  ],
  exports: [
    SohoStandalonePagerComponent
  ]
})
export class SohoPagerModule {}
