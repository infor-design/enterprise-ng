
import { NgModule } from '@angular/core';

import { SohoTranslatePipe } from './soho-translate.pipe';
import { SohoFormatDatePipe } from './soho-formatdate.pipe';
import { SohoFormatNumberPipe } from './soho-formatnumber.pipe';

@NgModule({
  declarations: [
    SohoFormatDatePipe,
    SohoFormatNumberPipe,
    SohoTranslatePipe
  ],
  exports: [
    SohoTranslatePipe,
    SohoFormatDatePipe,
    SohoFormatNumberPipe
  ]
})
export class SohoLocaleModule {
}
