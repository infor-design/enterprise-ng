import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoEditorComponent
} from './soho-editor.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoEditorComponent
  ],
  exports: [
    SohoEditorComponent
  ]
})
export class SohoEditorModule {}
