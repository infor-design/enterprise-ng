import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SohoComponentsModule } from '../../soho/soho-components.module';

import { ModalDialogDemoComponent } from './modal-dialog.demo';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';

@NgModule({
  declarations: [
    ExampleModalDialogComponent,
    ModalDialogDemoComponent
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
    // You need to add any 'dynamic' component to the entry components otherwise the factory can't ind them.
    ExampleModalDialogComponent
  ],
})
export class ModalDialogDemoModule {}
