import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoTagComponent } from './soho-tag.component';
import { SohoTagListComponent } from './soho-tag-list.component';
import { IdsIconModule } from '../iconn/ids-icon.module';


@NgModule({
  imports: [
    CommonModule,
    IdsIconModule
  ],
  declarations: [
    SohoTagComponent,
    SohoTagListComponent
  ],
  exports: [
    SohoTagComponent,
    SohoTagListComponent
  ],
})
export class SohoTagModule { }
