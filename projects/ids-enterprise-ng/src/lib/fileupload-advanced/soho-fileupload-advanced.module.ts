import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoFileUploadAdvancedComponent
} from './soho-fileupload-advanced.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoFileUploadAdvancedComponent
  ],
  exports: [
    SohoFileUploadAdvancedComponent
  ]
})
export class SohoFileUploadAdvancedModule {}
