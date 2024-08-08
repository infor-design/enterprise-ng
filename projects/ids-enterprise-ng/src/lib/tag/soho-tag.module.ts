import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoTagComponent } from './soho-tag.component';
import { SohoTagListComponent } from './soho-tag-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SohoTagComponent,
    SohoTagListComponent,
  ],
  exports: [
    SohoTagComponent,
    SohoTagListComponent,
  ],
})
export class SohoTagModule { }
