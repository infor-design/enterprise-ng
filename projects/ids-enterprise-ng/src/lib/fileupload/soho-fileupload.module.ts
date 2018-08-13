import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoFileUploadComponent
} from './soho-fileupload.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoFileUploadComponent
  ],
  exports: [
    SohoFileUploadComponent
  ]
})
export class SohoFileUploadModule {}
