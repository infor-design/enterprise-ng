import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SohoComponentsModule } from 'ids-enterprise-ng';

import { ContextualActionPanelDemoComponent } from './contextual-action-panel.demo';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { ContextualActionPanelComponent } from './contextual-action-panel.component';

@NgModule({
  declarations: [
    ContextualActionPanelComponent,
    ContextualActionPanelDemoComponent,
    NestedModalDialogComponent
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
    ContextualActionPanelComponent,
    NestedModalDialogComponent
  ],
})
export class ContextualActionPanelDemoModule {}
