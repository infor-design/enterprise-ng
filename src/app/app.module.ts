import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  APP_BASE_HREF
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

import { SohoComponentsModule } from '../soho/soho-components.module';

import { AboutDemoComponent } from './about/about.demo';
import { AccordionDemoComponent } from './accordion/accordion.demo';
import { AlertDemoComponent } from './alert/alert.demo';
import { ApplicationMenuDemoComponent } from './application-menu/application-menu.demo';
import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { ApplicationMenuLazyMenuDemoComponent } from './application-menu/application-menu-lazy-menu.demo';
import { ApplicationMenuLazyService } from './application-menu/application-menu-lazy-service.demo';
import { AutocompleteDemoComponent } from './autocomplete/autocomplete.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/form.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { ChartDemoComponent } from './chart/chart.demo';
import { CheckBoxDemoComponent } from './checkbox/checkbox.demo';
import { ColorPickerDemoComponent } from './colorpicker/colorpicker.demo';
import { CompletionChartDemoComponent } from './completion-chart/completion-chart.demo';
import { ContextMenuDemoComponent } from './context-menu/context-menu.demo';
import { ContextualActionPanelDemoModule } from './contextual-action-panel/contextual-action-panel.demo.module';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content.demo';
import {
  DataGridAngularFormatterDemoComponent,
  PriceCellFormatterComponent,
  ButtonCellFormatterComponent
} from './datagrid/datagrid-angular-formatter.demo';
import {
  DataGridCustomFormatterDemoComponent,
  DemoCellFormatterComponent,
  DemoCellIntegerFormatterComponent
} from './datagrid/datagrid-custom-formatter.demo';
import { DataGridCustomFormatterServiceDemoComponent } from './datagrid/datagrid-custom-formatter-service.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridEditorsDemoComponent } from './datagrid/datagrid-editors.demo';
import { DataGridFixedHeaderDemoComponent } from './datagrid/datagrid-fixedheader.demo';
import { DataGridGroupableDemoComponent } from './datagrid/datagrid-groupable.demo';
import { DataGridGroupedHeaderDemoComponent } from './datagrid/datagrid-grouped-header.demo';
import { DataGridMixedSelectionDemoComponent } from './datagrid/datagrid-mixed-selection.demo';
import { DataGridPagingIndeterminateDemoComponent } from './datagrid/datagrid-paging-indeterminate.demo';
import { DataGridPagingServiceDemoComponent } from './datagrid/datagrid-paging-service.demo';
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';
import { DataGridStandardFormatterDemoComponent } from './datagrid/datagrid-standard-formatter.demo';
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
import { ErrorDemoComponent } from './error/error.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { ExpandableAreaFooterDemoComponent } from './expandablearea/expandablearea-footer.demo';
import { FileUploadDemoComponent } from './fileupload/fileupload.demo';
import { FileUploadAdvancedDemoComponent } from './fileupload-advanced/fileupload-advanced.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HierarchyDemoComponent } from './hierarchy/hierarchy.demo';
import { HierarchyPagingDemoComponent } from './hierarchy/hierarchy-paging.demo';
import { HomePageDemoComponent } from './homepage/homepage.demo';
import { HomePageScenarioADemoComponent } from './homepage/homepage-scenario-a.demo';
import { HomePageScenarioBDemoComponent } from './homepage/homepage-scenario-b.demo';
import { HomePageScenarioCDemoComponent } from './homepage/homepage-scenario-c.demo';
import { HyperlinkDemoComponent } from './hyperlink/hyperlink.demo';
import { SohoHeaderDemoComponent } from './header/header.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { LabelDemoComponent } from './label/label.demo';
import { ListViewDemoComponent } from './listview/listview.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { LookupValidationDemoComponent } from './lookup/lookup-validation.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MaskLegacyDemoComponent } from './mask/mask-legacy.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { MessageDemoComponent } from './message/message.demo';
import { ModalDialogDemoModule } from './modal-dialog/modal-dialog.demo.module';
import { PopDownDemoComponent } from './popdown/popdown.demo';
import { PopupMenuDemoComponent } from './popupmenu/popupmenu.demo';
import { ProgressDemoComponent } from './progress/progress.demo';
import { RadioButtonDemoComponent } from './radiobutton/radiobutton.demo';
import { SliderDemoComponent } from './slider/slider.demo';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';
import { SohoMastheadDemoComponent } from './masthead/masthead.demo';
import { SpinboxDemoComponent } from './spinbox/spinbox.demo';
import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';
import { StepProcessBtnDisableDemoComponent } from './stepprocess/stepprocessbuttondisable.demo';
import { StepProcessDemoComponent } from './stepprocess/stepprocess.demo';
import { StepProcessDataDrivenDemoComponent } from './stepprocess/stepprocess-data-driven.demo';
import { StepProcessVetoableDemoComponent } from './stepprocess/stepprocessvetoable.demo';
import { SwapListDemoComponent } from './swaplist/swaplist.demo';
import { SwapListDynamicDemoComponent } from './swaplist/swaplist-dynamic.demo';
import { SwapListFullAccessDemoComponent } from './swaplist/swaplist-full-access.demo';
import { SwapListServiceDemoComponent } from './swaplist/swaplist-service.demo';
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
import { ToolbarPresetMoreActionsDemoComponent } from './toolbar/toolbar-preset-more-actions.demo';
import { ToolbarStateComponent } from './toolbar/toolbar-state.component';
import { ToolbarStateDemoComponent } from './toolbar/toolbar-state.demo';
import { ToolbarRightAlignedDemoComponent } from './toolbar/toolbar-right-aligned.demo';
import { TooltipDemoComponent } from './tooltip/tooltip.demo';
import { TrackDirtyDemoComponent } from './trackdirty/trackdirty.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';
import { TreeServiceDemoComponent } from './tree/tree-service.demo';
import { TreeSourceDemoComponent } from './tree/tree-source.demo';
import { ValidationFormDemoComponent } from './validation/validation-form.demo';
import { ValidationFormEventDemoComponent } from './validation/validation-form-event.demo';
import { ValidationFormGroupDemoComponent } from './validation/validation-form-group.demo';
import { WizardDemoBackupRulePageComponent } from './wizard/wizard-backup-rule-page.demo';
import { WizardDemoComponent } from './wizard/wizard.demo';
import { WizardDemoConfirmationPageComponent } from './wizard/wizard-confirmation-page.demo';
import { WizardDemoResultPageComponent } from './wizard/wizard-result-page.demo';
import { WizardDemoSelectFilePageComponent } from './wizard/wizard-selected-files-page.demo';
import { WizardDemoTargetFolderPageComponent } from './wizard/wizard-target-folder-page.demo';
import { WizardDemoValidationRulesPageComponent } from './wizard/wizard-validation-rules-page.demo';

@NgModule({
  declarations: [
    AppComponent,
    AboutDemoComponent,
    AccordionDemoComponent,
    AlertDemoComponent,
    ApplicationMenuDemoComponent,
    ApplicationMenuLazyDemoComponent,
    ApplicationMenuLazyMenuDemoComponent,
    AutocompleteDemoComponent,
    BusyIndicatorDemoComponent,
    ButtonDemoComponent,
    ChartDemoComponent,
    CheckBoxDemoComponent,
    ColorPickerDemoComponent,
    CompletionChartDemoComponent,
    ContextMenuDemoComponent,
    DataGridBreadcrumbDemoComponent,
    DataGridContentDemoComponent,
    DataGridAngularFormatterDemoComponent,
    DataGridCustomFormatterDemoComponent,
    DataGridCustomFormatterServiceDemoComponent,
    DataGridDynamicDemoComponent,
    DataGridEditorsDemoComponent,
    DataGridFixedHeaderDemoComponent,
    DataGridGroupedHeaderDemoComponent,
    DataGridMixedSelectionDemoComponent,
    DataGridPagingIndeterminateDemoComponent,
    DataGridPagingServiceDemoComponent,
    DataGridServiceDemoComponent,
    DataGridSettingsDemoComponent,
    DataGridStandardFormatterDemoComponent,
    DataGridToolbarDemoComponent,
    DataGridTreeGridDemoComponent,
    DataGridGroupableDemoComponent,
    DatepickerDemoComponent,
    DemoCellFormatterComponent,
    DemoCellIntegerFormatterComponent,
    PriceCellFormatterComponent,
    ButtonCellFormatterComponent,
    DropdownAsyncBusyDemoComponent,
    DropdownAsyncDemoComponent,
    DropdownDemoComponent,
    DropdownLMDemoComponent,
    DropdownMultiselectDemoComponent,
    DropdownSimpleDemoComponent,
    EditorDemoComponent,
    ErrorDemoComponent,
    ExpandableAreaDemoComponent,
    ExpandableAreaFooterDemoComponent,
    FileUploadAdvancedDemoComponent,
    FileUploadDemoComponent,
    HeaderTabsDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    HeaderToolbarDemoComponent,
    HierarchyDemoComponent,
    HierarchyPagingDemoComponent,
    HomePageDemoComponent,
    HomePageScenarioADemoComponent,
    HomePageScenarioBDemoComponent,
    HomePageScenarioCDemoComponent,
    HyperlinkDemoComponent,
    IconDemoComponent,
    LabelDemoComponent,
    ListViewDemoComponent,
    LookupDemoComponent,
    LookupValidationDemoComponent,
    MaskDemoComponent,
    MaskLegacyDemoComponent,
    MenuButtonDemoComponent,
    MessageDemoComponent,
    PopDownDemoComponent,
    PopupMenuDemoComponent,
    ProgressDemoComponent,
    RadioButtonDemoComponent,
    SliderDemoComponent,
    SohoHeaderDynamicDemoComponent,
    SohoHeaderDemoComponent,
    SohoMastheadDemoComponent,
    SpinboxDemoComponent,
    SplitterHorizontalDemoComponent,
    SplitterVerticalDemoComponent,
    StepProcessDemoComponent,
    StepProcessBtnDisableDemoComponent,
    StepProcessDataDrivenDemoComponent,
    StepProcessVetoableDemoComponent,
    SwapListDemoComponent,
    SwapListDynamicDemoComponent,
    SwapListFullAccessDemoComponent,
    SwapListServiceDemoComponent,
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
    ToolbarPresetMoreActionsDemoComponent,
    ToolbarRightAlignedDemoComponent,
    TooltipDemoComponent,
    TrackDirtyDemoComponent,
    TreeContentDemoComponent,
    TreeDynamicDemoComponent,
    TreeServiceDemoComponent,
    TreeSourceDemoComponent,
    ValidationFormDemoComponent,
    ValidationFormEventDemoComponent,
    ValidationFormGroupDemoComponent,
    WizardDemoComponent,
    WizardDemoConfirmationPageComponent,
    WizardDemoSelectFilePageComponent,
    WizardDemoTargetFolderPageComponent,
    WizardDemoBackupRulePageComponent,
    WizardDemoResultPageComponent,
    WizardDemoValidationRulesPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ModalDialogDemoModule,
    ContextualActionPanelDemoModule,
    ReactiveFormsModule,
    SohoComponentsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ApplicationMenuLazyService
  ],
  entryComponents: [
    DemoCellFormatterComponent,
    DemoCellIntegerFormatterComponent,
    ButtonCellFormatterComponent,
    PriceCellFormatterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
