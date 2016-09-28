import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoListViewComponent,
  SohoListViewHeaderComponent,
  SohoListViewItemComponent,
  SohoListViewMicroComponent,
  SohoListViewSearchComponent,
  SohoListViewSubHeaderComponent,
} from './soho-listview.component';

import { SohoSearchfieldModule } from '../soho-searchfield';

@NgModule({
  declarations: [
    SohoListViewComponent,
    SohoListViewHeaderComponent,
    SohoListViewItemComponent,
    SohoListViewMicroComponent,
    SohoListViewSearchComponent,
    SohoListViewSubHeaderComponent,
  ],
  exports: [
    SohoListViewComponent,
    SohoListViewHeaderComponent,
    SohoListViewItemComponent,
    SohoListViewMicroComponent,
    SohoListViewSearchComponent,
    SohoListViewSubHeaderComponent,
  ],
  imports: [
    CommonModule,
    SohoSearchfieldModule,
  ], // TODO: Add toolbar module
})
export class SohoListViewModule {}
