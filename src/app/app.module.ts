import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  APP_BASE_HREF
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import { SohoComponentsModule } from '../soho-components.module';

import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/busyindicator.demo';
import { DropdownDemoComponent } from './dropdown/dropdown.demo';
import { DropdownMultiselectDemoComponent } from './dropdown/dropdown-multiselect.demo';
import { DropdownLMDemoComponent } from './dropdown/dropdown-lm.demo';
import { ToastDemoComponent } from './toast/toast.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { ListviewDemoComponent } from './listview/listview.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';
import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';
import { TreeServiceDemoComponent } from './tree/tree-service.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content.demo';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridTreeGridDemoComponent } from './datagrid/datagrid-treegrid.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';
import { ToolbarBasicDemoComponent } from './toolbar/toolbar-basic.demo';
import { ToolbarDataDrivenDemoComponent } from './toolbar/toolbar-datadriven.demo';
import { ToolbarAllIconsDemoComponent } from './toolbar/toolbar-all-icons.demo';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableAreaDemoComponent,
    ButtonDemoComponent,
    BusyIndicatorDemoComponent,
    DropdownDemoComponent,
    DropdownMultiselectDemoComponent,
    DropdownLMDemoComponent,
    ToastDemoComponent,
    IconDemoComponent,
    ListviewDemoComponent,
    LookupDemoComponent,
    MaskDemoComponent,
    MenuButtonDemoComponent,
    SplitterVerticalDemoComponent,
    SplitterHorizontalDemoComponent,
    TreeDynamicDemoComponent,
    TreeServiceDemoComponent,
    TreeContentDemoComponent,
    DataGridDynamicDemoComponent,
    DataGridServiceDemoComponent,
    DataGridContentDemoComponent,
    DataGridBreadcrumbDemoComponent,
    DataGridTreeGridDemoComponent,
    DataGridSettingsDemoComponent,
    HeaderTabsDemoComponent,
    HeaderToolbarDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    TabsBasicDemoComponent,
    TabsVerticalDemoComponent,
    TabsCountsDemoComponent,
    TabsDismissibleDemoComponent,
    TabsDropdownDemoComponent,
    TabsDataDrivenDemoComponent,
    TabsDynamicDemoComponent,
    ToolbarBasicDemoComponent,
    ToolbarDataDrivenDemoComponent,
    ToolbarAllIconsDemoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SohoComponentsModule,
  ],
  providers: [
    APP_ROUTER_PROVIDERS,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
