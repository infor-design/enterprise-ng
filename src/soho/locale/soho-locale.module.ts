
import { NgModule } from '@angular/core';

import { SohoTranslatePipe } from './soho-translate.pipe';

@NgModule({
  declarations: [SohoTranslatePipe],
  exports: [SohoTranslatePipe]
})
export class SohoLocaleModule {
}
