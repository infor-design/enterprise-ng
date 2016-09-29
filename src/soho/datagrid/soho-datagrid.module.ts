import { NgModule } from '@angular/core';
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
  ]
})
export class SohoDataGridModule {}
