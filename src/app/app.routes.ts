import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/form.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { CheckBoxDemoComponent } from './checkbox/checkbox.demo';
import { EditorDemoComponent } from './editor/editor.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { TextareaDemoComponent } from './textarea/textarea.demo';
import { ToastDemoComponent } from './toast/toast.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { TrackDirtyDemoComponent } from './trackdirty/trackdirty.demo';
import { TreeServiceDemoComponent } from './tree/tree-service.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';
import { TreeSourceDemoComponent } from './tree/tree-source.demo';

import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridEditorsDemoComponent } from './datagrid/datagrid-editors.demo';
import { DataGridTreeGridDemoComponent } from './datagrid/datagrid-treegrid.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';
import { DataGridPagingServiceDemoComponent } from './datagrid/datagrid-paging-service.demo';
import { DataGridPagingIndeterminateDemoComponent } from './datagrid/datagrid-paging-indeterminate.demo';

import { LabelDemoComponent } from './label/label.demo';
import { ListViewDemoComponent } from './listview/listview.demo';

import { DropdownDemoComponent } from './dropdown/dropdown.demo';
import { DropdownMultiselectDemoComponent } from './dropdown/dropdown-multiselect.demo';
import { DropdownLMDemoComponent } from './dropdown/dropdown-lm.demo';
import { DropdownAsyncBusyDemoComponent } from './dropdown/dropdown-async-busy.demo';
import { DropdownSimpleDemoComponent } from './dropdown/dropdown-simple.demo';

import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';

import { ToolbarBasicDemoComponent } from './toolbar/toolbar-basic.demo';
import { ToolbarAllIconsDemoComponent } from './toolbar/toolbar-all-icons.demo';
import { ToolbarDataDrivenDemoComponent } from './toolbar/toolbar-datadriven.demo';
import { ToolbarStateComponent } from './toolbar/toolbar-state.component';

import { TooltipDemoComponent } from './tooltip/tooltip.demo';

import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';

import { ModalDialogDemoComponent } from './modal-dialog/modal-dialog.demo';
import { MessageDemoComponent } from './message/message.demo';

import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';
import { ValidationFormDemoComponent } from './validation/validation-form.demo';

import { DatepickerDemoComponent } from './datepicker/datepicker.demo';
import { TimePickerDemoComponent } from './timepicker/timepicker.demo';
import { RadioButtonDemoComponent } from './radiobutton/radiobutton.demo';
import { SliderDemoComponent } from './slider/slider.demo';

export const routes: Routes = [
  { path: '',                      component: ExpandableAreaDemoComponent }, // default
  { path: 'application-lazy-menu', component: ApplicationMenuLazyDemoComponent},
  { path: 'button',                component: ButtonDemoComponent },
  { path: 'busyindicator',         component: BusyIndicatorDemoComponent },
  { path: 'checkbox',              component: CheckBoxDemoComponent },
  { path: 'datepicker',            component: DatepickerDemoComponent },
  { path: 'timepicker',            component: TimePickerDemoComponent },
  { path: 'dropdown',              component: DropdownDemoComponent },
  { path: 'dropdown-multi',        component: DropdownMultiselectDemoComponent },
  { path: 'dropdown-lm',           component: DropdownLMDemoComponent },
  { path: 'dropdown-async-busy',   component: DropdownAsyncBusyDemoComponent },
  { path: 'dropdown-simple',       component: DropdownSimpleDemoComponent },
  { path: 'editor',                component: EditorDemoComponent },
  { path: 'expandablearea',        component: ExpandableAreaDemoComponent },
  { path: 'slider',                component: SliderDemoComponent },
  { path: 'textarea',              component: TextareaDemoComponent },
  { path: 'toast',                 component: ToastDemoComponent },
  { path: 'icon',                  component: IconDemoComponent },
  { path: 'label',                 component: LabelDemoComponent },
  { path: 'listview',              component: ListViewDemoComponent },
  { path: 'lookup',                component: LookupDemoComponent },
  { path: 'mask',                  component: MaskDemoComponent },
  { path: 'menu-button',           component: MenuButtonDemoComponent },
  { path: 'splitter-vertical',     component: SplitterVerticalDemoComponent },
  { path: 'splitter-horizontal',   component: SplitterHorizontalDemoComponent },
  { path: 'trackdirty',            component: TrackDirtyDemoComponent },
  { path: 'tree-dynamic',          component: TreeDynamicDemoComponent },
  { path: 'tree-service',          component: TreeServiceDemoComponent },
  { path: 'tree-content',          component: TreeContentDemoComponent },
  { path: 'tree-source',           component: TreeSourceDemoComponent },
  { path: 'datagrid-dynamic',      component: DataGridDynamicDemoComponent },
  { path: 'datagrid-service',      component: DataGridServiceDemoComponent },
  { path: 'datagrid-content',      component: DataGridContentDemoComponent },
  { path: 'datagrid-editors',      component: DataGridEditorsDemoComponent },
  { path: 'datagrid-breadcrumb',   component: DataGridBreadcrumbDemoComponent },
  { path: 'datagrid-treegrid',     component: DataGridTreeGridDemoComponent },
  { path: 'datagrid-settings',     component: DataGridSettingsDemoComponent },
  { path: 'datagrid-paging-service', component: DataGridPagingServiceDemoComponent },
  { path: 'datagrid-paging-indeterminate', component: DataGridPagingIndeterminateDemoComponent },
  { path: 'header-tabs',           component: HeaderTabsDemoComponent },
  { path: 'header-toolbar',        component: HeaderToolbarDemoComponent },
  { path: 'header-toolbar-tabs',   component: HeaderToolbarAndTabsDemoComponent },
  { path: 'modal-dialog',          component: ModalDialogDemoComponent },
  { path: 'message',               component: MessageDemoComponent },
  { path: 'tabs-basic',            component: TabsBasicDemoComponent },
  { path: 'tabs-vertical',         component: TabsVerticalDemoComponent },
  { path: 'tabs-counts',           component: TabsCountsDemoComponent },
  { path: 'tabs-dismissible',      component: TabsDismissibleDemoComponent },
  { path: 'tabs-dropdown',         component: TabsDropdownDemoComponent },
  { path: 'tabs-datadriven',       component: TabsDataDrivenDemoComponent },
  { path: 'tabs-dynamic',          component: TabsDynamicDemoComponent },
  { path: 'toolbar-basic',         component: ToolbarBasicDemoComponent },
  { path: 'tooltip',               component: TooltipDemoComponent },
  { path: 'toolbar-datadriven',    component: ToolbarDataDrivenDemoComponent },
  { path: 'toolbar-all-icons',     component: ToolbarAllIconsDemoComponent },
  { path: 'toolbar-state',         component: ToolbarStateComponent },
  // { path: 'accordian',           component: AccordionSampleComponent},
  { path: 'validation',            component: ValidationFormDemoComponent},
  { path: 'radiobutton',           component: RadioButtonDemoComponent}
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
