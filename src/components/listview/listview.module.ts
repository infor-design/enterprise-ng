import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoListviewComponent,
  SohoListviewHeaderComponent,
  SohoListviewItemComponent,
  SohoListviewMicroComponent,
  SohoListviewSubHeaderComponent,
} from './listview.component';
import { SohoSearchfieldModule } from '../searchfield';

@NgModule({
  declarations: [
    SohoListviewComponent,
    SohoListviewHeaderComponent,
    SohoListviewItemComponent,
    SohoListviewMicroComponent,
    SohoListviewSubHeaderComponent,
  ],
  exports: [
    SohoListviewComponent,
    SohoListviewHeaderComponent,
    SohoListviewItemComponent,
    SohoListviewMicroComponent,
    SohoListviewSubHeaderComponent,
  ],
  imports: [
    CommonModule,
    SohoSearchfieldModule,
  ], // TODO: Add toolbar module
})
export class SohoListviewModule {}
