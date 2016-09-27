import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/busyindicator.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { EditorDemoComponent } from './editor/editor.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { TextareaDemoComponent } from './textarea/textarea.demo';
import { ToastDemoComponent } from './toast/toast.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { TreeServiceDemoComponent } from './tree/tree-service.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';

import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridTreeGridDemoComponent } from './datagrid/datagrid-treegrid.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';

import { ListviewDemoComponent } from './listview/listview.demo';

import { DropdownDemoComponent } from './dropdown/dropdown.demo';
import { DropdownMultiselectDemoComponent } from './dropdown/dropdown-multiselect.demo';
import { DropdownLMDemoComponent } from './dropdown/dropdown-lm.demo';
import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';

import { ToolbarBasicDemoComponent } from './toolbar/toolbar-basic.demo';
import { ToolbarAllIconsDemoComponent } from './toolbar/toolbar-all-icons.demo';
import { ToolbarDataDrivenDemoComponent } from './toolbar/toolbar-datadriven.demo';

import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';

import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';

export const routes: Routes = [
  { path: '',                      component: ExpandableAreaDemoComponent }, // default
  { path: 'application-lazy-menu', component: ApplicationMenuLazyDemoComponent},
  { path: 'button',                component: ButtonDemoComponent },
  { path: 'busyindicator',         component: BusyIndicatorDemoComponent },
  { path: 'dropdown',              component: DropdownDemoComponent },
  { path: 'dropdown-multi',        component: DropdownMultiselectDemoComponent },
  { path: 'dropdown-lm',           component: DropdownLMDemoComponent },
  { path: 'editor',                component: EditorDemoComponent },
  { path: 'expandablearea',        component: ExpandableAreaDemoComponent },
  { path: 'textarea',              component: TextareaDemoComponent },
  { path: 'toast',                 component: ToastDemoComponent },
  { path: 'icon',                  component: IconDemoComponent },
  { path: 'listview',              component: ListviewDemoComponent },
  { path: 'lookup',                component: LookupDemoComponent },
  { path: 'mask',                  component: MaskDemoComponent },
  { path: 'menu-button',           component: MenuButtonDemoComponent },
  { path: 'splitter-vertical',     component: SplitterVerticalDemoComponent },
  { path: 'splitter-horizontal',   component: SplitterHorizontalDemoComponent },
  { path: 'tree-dynamic',          component: TreeDynamicDemoComponent },
  { path: 'tree-service',          component: TreeServiceDemoComponent },
  { path: 'tree-content',          component: TreeContentDemoComponent },
  { path: 'datagrid-dynamic',      component: DataGridDynamicDemoComponent },
  { path: 'datagrid-service',      component: DataGridServiceDemoComponent },
  { path: 'datagrid-content',      component: DataGridContentDemoComponent },
  { path: 'datagrid-breadcrumb',   component: DataGridBreadcrumbDemoComponent },
  { path: 'datagrid-treegrid',     component: DataGridTreeGridDemoComponent },
  { path: 'datagrid-settings',     component: DataGridSettingsDemoComponent },
  { path: 'header-tabs',           component: HeaderTabsDemoComponent },
  { path: 'header-toolbar',        component: HeaderToolbarDemoComponent },
  { path: 'header-toolbar-tabs',   component: HeaderToolbarAndTabsDemoComponent },
  { path: 'tabs-basic',            component: TabsBasicDemoComponent },
  { path: 'tabs-vertical',         component: TabsVerticalDemoComponent },
  { path: 'tabs-counts',           component: TabsCountsDemoComponent },
  { path: 'tabs-dismissible',      component: TabsDismissibleDemoComponent },
  { path: 'tabs-dropdown',         component: TabsDropdownDemoComponent },
  { path: 'tabs-datadriven',       component: TabsDataDrivenDemoComponent },
  { path: 'tabs-dynamic',          component: TabsDynamicDemoComponent },
  { path: 'toolbar-basic',         component: ToolbarBasicDemoComponent },
  { path: 'toolbar-datadriven',    component: ToolbarDataDrivenDemoComponent },
  { path: 'toolbar-all-icons',     component: ToolbarAllIconsDemoComponent },
  // { path: 'accordian',           component: AccordionSampleComponent},
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
