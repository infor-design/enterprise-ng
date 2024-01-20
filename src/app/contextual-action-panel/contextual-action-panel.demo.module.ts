import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// @ts-ignore
import { SohoComponentsModule } from 'ids-enterprise-ng';

import { ContextualActionPanelDemoComponent } from './contextual-action-panel.demo';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { ContextualActionPanelComponent } from './contextual-action-panel.component';
import { ContextualActionPanelSearchfieldComponent } from './contextual-action-panel-searchfield.component';
import { ContextualActionPanelSearchfieldFlexComponent } from './contextual-action-panel-searchfield-flex.component';
import { ContextualActionPanelFullSizeComponent } from './contextual-action-panel-fullsize.component';
import { ContextualActionPanelVerticalTabsComponent } from './contextual-action-panel-tabs-vertical.component';
import { ContextualActionPanelButtonsetAPIComponent } from './contextual-action-panel-buttonsetapi.component';
import { CAPDatagridDemoComponent } from './cap-datagrid.demo';

@NgModule({
    declarations: [
        ContextualActionPanelComponent,
        ContextualActionPanelSearchfieldComponent,
        ContextualActionPanelSearchfieldFlexComponent,
        ContextualActionPanelFullSizeComponent,
        ContextualActionPanelVerticalTabsComponent,
        ContextualActionPanelDemoComponent,
        ContextualActionPanelButtonsetAPIComponent,
        CAPDatagridDemoComponent,
        NestedModalDialogComponent,
    ],
    exports: [],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SohoComponentsModule
    ],
    providers: []
})
export class ContextualActionPanelDemoModule { }
