import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  APP_BASE_HREF
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

import { SohoComponentsModule } from '../soho/soho-components.module';

import { ApplicationMenuDemoComponent } from './application-menu/application-menu.demo';
import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { ApplicationMenuLazyMenuDemoComponent } from './application-menu/application-menu-lazy-menu.demo';
import { ApplicationMenuLazyService } from './application-menu/application-menu-lazy-service.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/form.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { CheckBoxDemoComponent } from './checkbox/checkbox.demo';
import { ContextMenuDemoComponent } from './context-menu/context-menu.demo';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridEditorsDemoComponent } from './datagrid/datagrid-editors.demo';
import { DataGridPagingIndeterminateDemoComponent } from './datagrid/datagrid-paging-indeterminate.demo';
import { DataGridPagingServiceDemoComponent } from './datagrid/datagrid-paging-service.demo';
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';
import { DataGridToolbarDemoComponent } from './datagrid/datagrid-toolbar.demo';
import { DataGridTreeGridDemoComponent } from './datagrid/datagrid-treegrid.demo';
import { DatepickerDemoComponent } from './datepicker/datepicker.demo';
import { DropdownAsyncBusyDemoComponent } from './dropdown/dropdown-async-busy.demo';
import { DropdownAsyncDemoComponent } from './dropdown/dropdown-async.demo';
import { DropdownDemoComponent } from './dropdown/dropdown.demo';
import { DropdownLMDemoComponent } from './dropdown/dropdown-lm.demo';
import { DropdownMultiselectDemoComponent } from './dropdown/dropdown-multiselect.demo';
import { DropdownSimpleDemoComponent } from './dropdown/dropdown-simple.demo';
import { EditorDemoComponent } from './editor/editor.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { FileUploadDemoComponent } from './fileupload/fileupload.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HyperlinkDemoComponent } from './hyperlink/hyperlink.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { LabelDemoComponent } from './label/label.demo';
import { ListViewDemoComponent } from './listview/listview.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { MessageDemoComponent } from './message/message.demo';
import { ModalDialogDemoModule } from './modal-dialog/modal-dialog.demo.module';
import { PopupMenuDemoComponent } from './popupmenu/popupmenu.demo';
import { ProgressDemoComponent } from './progress/progress.demo';
import { RadioButtonDemoComponent } from './radiobutton/radiobutton.demo';
import { SliderDemoComponent } from './slider/slider.demo';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';
import { SohoMastheadDemoComponent } from './masthead/masthead.demo';
import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';
import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TextareaDemoComponent } from './textarea/textarea.demo';
import { TimePickerDemoComponent } from './timepicker/timepicker.demo';
import { ToastDemoComponent } from './toast/toast.demo';
import { ToolbarAllIconsDemoComponent } from './toolbar/toolbar-all-icons.demo';
import { ToolbarBasicDemoComponent } from './toolbar/toolbar-basic.demo';
import { ToolbarDataDrivenDemoComponent } from './toolbar/toolbar-datadriven.demo';
import { ToolbarStateComponent } from './toolbar/toolbar-state.component';
import { ToolbarStateDemoComponent } from './toolbar/toolbar-state.demo';
import { TooltipDemoComponent } from './tooltip/tooltip.demo';
import { TrackDirtyDemoComponent } from './trackdirty/trackdirty.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';
import { TreeServiceDemoComponent } from './tree/tree-service.demo';
import { TreeSourceDemoComponent } from './tree/tree-source.demo';
import { ValidationFormDemoComponent } from './validation/validation-form.demo';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationMenuDemoComponent,
    ApplicationMenuLazyDemoComponent,
    ApplicationMenuLazyMenuDemoComponent,
    BusyIndicatorDemoComponent,
    ButtonDemoComponent,
    CheckBoxDemoComponent,
    ContextMenuDemoComponent,
    DataGridBreadcrumbDemoComponent,
    DataGridContentDemoComponent,
    DataGridDynamicDemoComponent,
    DataGridEditorsDemoComponent,
    DataGridPagingIndeterminateDemoComponent,
    DataGridPagingServiceDemoComponent,
    DataGridServiceDemoComponent,
    DataGridSettingsDemoComponent,
    DataGridToolbarDemoComponent,
    DataGridTreeGridDemoComponent,
    DatepickerDemoComponent,
    DropdownAsyncBusyDemoComponent,
    DropdownAsyncDemoComponent,
    DropdownDemoComponent,
    DropdownLMDemoComponent,
    DropdownMultiselectDemoComponent,
    DropdownSimpleDemoComponent,
    EditorDemoComponent,
    ExpandableAreaDemoComponent,
    FileUploadDemoComponent,
    HeaderTabsDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    HeaderToolbarDemoComponent,
    HyperlinkDemoComponent,
    IconDemoComponent,
    LabelDemoComponent,
    ListViewDemoComponent,
    LookupDemoComponent,
    MaskDemoComponent,
    MenuButtonDemoComponent,
    MessageDemoComponent,
    PopupMenuDemoComponent,
    ProgressDemoComponent,
    RadioButtonDemoComponent,
    SliderDemoComponent,
    SohoHeaderDynamicDemoComponent,
    SohoMastheadDemoComponent,
    SplitterHorizontalDemoComponent,
    SplitterVerticalDemoComponent,
    TabsBasicDemoComponent,
    TabsCountsDemoComponent,
    TabsDataDrivenDemoComponent,
    TabsDismissibleDemoComponent,
    TabsDropdownDemoComponent,
    TabsDynamicDemoComponent,
    TabsVerticalDemoComponent,
    TextareaDemoComponent,
    TimePickerDemoComponent,
    ToastDemoComponent,
    ToolbarAllIconsDemoComponent,
    ToolbarBasicDemoComponent,
    ToolbarDataDrivenDemoComponent,
    ToolbarStateComponent,
    ToolbarStateDemoComponent,
    TooltipDemoComponent,
    TrackDirtyDemoComponent,
    TreeContentDemoComponent,
    TreeDynamicDemoComponent,
    TreeServiceDemoComponent,
    TreeSourceDemoComponent,
    ValidationFormDemoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ModalDialogDemoModule,
    ReactiveFormsModule,
    SohoComponentsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApplicationMenuLazyService
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
