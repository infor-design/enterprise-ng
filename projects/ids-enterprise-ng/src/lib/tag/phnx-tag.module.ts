import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhnxTagComponent } from './phnx-tag.component';
import { PhnxTagListComponent } from './phnx-tag-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PhnxTagComponent,
    PhnxTagListComponent,
  ],
  exports: [
    PhnxTagComponent,
    PhnxTagListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhnxTagModule { }
