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

import { SohoSearchFieldModule } from '../searchfield/soho-searchfield.module';

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
    SohoSearchFieldModule
  ], // TODO: Add toolbar module
})
export class SohoListViewModule {}
