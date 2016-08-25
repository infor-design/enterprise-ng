import { NgModule } from '@angular/core';

import { SohoSearchfieldComponent, SohoSearchfieldWrapperComponent } from './searchfield.component';

@NgModule({
  declarations: [
    SohoSearchfieldComponent,
    SohoSearchfieldWrapperComponent
  ],
  exports: [
    SohoSearchfieldComponent,
    SohoSearchfieldWrapperComponent
  ],
})
export class SohoSearchfieldModule {}
