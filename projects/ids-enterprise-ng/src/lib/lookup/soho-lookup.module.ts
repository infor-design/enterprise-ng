import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoLookupComponent } from './soho-lookup.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoLookupComponent
  ],
  exports: [
    SohoLookupComponent
  ]
})
export class SohoLookupModule {}
