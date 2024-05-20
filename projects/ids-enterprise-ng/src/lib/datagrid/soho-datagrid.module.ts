import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoDataGridComponent } from './soho-datagrid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoDataGridComponent
  ],
  exports: [
    SohoDataGridComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SohoDataGridModule { }
