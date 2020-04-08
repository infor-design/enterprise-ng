import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SohoComponentsModule } from 'ids-enterprise-ng';

import { ModalDialogDemoComponent } from './modal-dialog.demo';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';
import { ModalDialogDataGridComponent } from './modal-dialog-datagrid.component';
import { FullSizeModalDialogComponent } from './example-fullsize-modal.component';

@NgModule({
  declarations: [
    FullSizeModalDialogComponent,
    NestedModalDialogComponent,
    ExampleModalDialogComponent,
    ModalDialogDemoComponent,
    VetoableModalDialogComponent,
    ModalDialogDataGridComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SohoComponentsModule
  ],
  providers: [
  ],
  entryComponents: [
    // You need to add any 'dynamic' components to the entry components otherwise the factory can't find them.
    FullSizeModalDialogComponent,
    ExampleModalDialogComponent,
    NestedModalDialogComponent,
    VetoableModalDialogComponent,
    ModalDialogDataGridComponent
  ],
})
export class ModalDialogDemoModule { }
