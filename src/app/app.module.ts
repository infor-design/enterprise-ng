import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
// @ts-ignore
import { SohoComponentsModule } from 'ids-enterprise-ng';

import { AboutDemoComponent } from './about/about.demo';
import { AboutNestedDemoComponent } from './about/nested-about.demo';
import { ActionsheetDemoComponent } from './actionsheet/actionsheet.demo';
import { ActionsheetWithTrayDemoComponent } from './actionsheet/actionsheet-with-tray.demo';
import { AlertDemoComponent } from './alert/alert.demo';
import { ApplicationMenuDemoComponent } from './application-menu/application-menu.demo';
import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { ApplicationMenuLazyMenuDemoComponent } from './application-menu/application-menu-lazy-menu.demo';
import { ApplicationMenuLazyService } from './application-menu/application-menu-lazy-service.demo';
import { AreaDemoComponent } from './area/area.demo';
import { ArrangeDemoComponent } from './arrange/arrange.demo';
import { AutocompleteDemoComponent } from './autocomplete/autocomplete.demo';
import { AutocompleteTemplatesDemoComponent } from './autocomplete/autocomplete-templates.demo';
import { BarDemoComponent } from './bar/bar.demo';
import { BarGroupedDemoComponent } from './bar-grouped/bar-grouped.demo';
import { BarStackedDemoComponent } from './bar-stacked/bar-stacked.demo';
import { BlockGridCustomContentDemoComponent } from './blockgrid/blockgrid-custom-content.demo';
import { BlockGridMixedSelectionDemoComponent } from './blockgrid/blockgrid-mixed-selection.demo';
import { BlockGridMultiSelectionDemoComponent } from './blockgrid/blockgrid-multi-selection.demo';
import { BlockGridSingleSelectionDemoComponent } from './blockgrid/blockgrid-single-selection.demo';
import { BlockGridPagingDemoComponent } from './blockgrid/blockgrid-paging.demo';
import { BreadcrumbDemoComponent } from './breadcrumb/breadcrumb.demo';
import { BreadcrumbChangeContentsDemoComponent } from './breadcrumb/breadcrumb-change-contents.demo';
import { BreadcrumbCssOnlyDemoComponent } from './breadcrumb/breadcrumb-css-only.demo';
import { BreadcrumbGauntletDemoComponent } from './breadcrumb/breadcrumb-gauntlet.demo';
import { BubbleDemoComponent } from './bubble/bubble.demo';
import { BulletDemoComponent } from './bullet/bullet.demo';
import { BusyIndicatorDemoComponent } from './busyindicator/form.demo';
import { BusyIndicatorDemoBodyComponent } from './busyindicator/body-sample.demo';
import { ButtonDemoComponent } from './button/button.demo';
import { ButtonBadgeDemoComponent } from './button/button-badge.demo';
import { CalendarDemoComponent } from './calendar/calendar.demo';
import { CalendarLegendDemoComponent } from './calendar/calendar-legend.demo';
import { CalendarHideLegendDemoComponent } from './calendar/calendar-hide-legend.demo';
import { CalendarUpdatedDemoComponent } from './calendar/calendar-updated.demo';
import { CalendarRangeDemoComponent } from './calendar/calendar-range.demo';
import { CardsActionableDemoComponent } from './cards/cards-actionable.demo';
import { CardsDemoComponent } from './cards/cards.demo';
import { CardsExpandableDemoComponent } from './cards/cards-expandable.demo';
import { CardsMultiSelectDemoComponent } from './cards/cards-multi-select.demo';
import { CardsSingleSelectDemoComponent } from './cards/cards-single-select.demo';
import { CardsWorkspaceWidgetsComponent } from './cards/cards-workspace-widgets.demo';
import { ChartDemoComponent } from './chart/chart.demo';
import { CheckBoxDemoComponent } from './checkbox/checkbox.demo';
import { CirclepagerDemoComponent } from './circlepager/circlepager.demo';
import { ColorPickerDemoComponent } from './colorpicker/colorpicker.demo';
import { ColumnDemoComponent } from './column/column.demo';
import { ColumnYAxisDemoComponent } from './column/column-yaxis-format.demo';
import { ColumnGroupedDemoComponent } from './column-grouped/column-grouped.demo';
import { ColumnGroupedXaxisTwolineDemoComponent } from './column-grouped/column-grouped-xaxis-twoline.demo';
import { ColumnStackedDemoComponent } from './column-stacked/column-stacked.demo';
import { CodeBlockComponent } from './code-block/code-block.component';
import { CodeBlockDemoComponent } from './code-block/code-block.demo';
import { CompletionChartDemoComponent } from './completion-chart/completion-chart.demo';
import { ContextMenuDemoComponent } from './context-menu/context-menu.demo';
import { ContextMenuNestedDemoComponent } from './context-menu/context-menu-nested.demo';
import { ContextMenuSharedDemoComponent } from './context-menu/context-menu-shared.demo';
import { ContextMenuToggleDemoComponent } from './context-menu/context-menu-toggle.demo';
import { ContextMenuLazyLoadDemoComponent } from './context-menu/context-menu-lazy-load.demo';
import { ContextualActionPanelDemoModule } from './contextual-action-panel/contextual-action-panel.demo.module';
import { DataGridBreadcrumbDemoComponent } from './datagrid/datagrid-breadcrumb.demo';
import { DataGridSandboxDemoComponent } from './datagrid/datagrid-sandbox.demo'
import {
  DataGridAngularEditorDemoComponent,
  DemoCellInputEditorComponent,
  DemoCellDatePickerEditorComponent
} from './datagrid/datagrid-angular-editor.demo';
import {
  DataGridAngularFormatterDemoComponent,
  PriceCellFormatterComponent,
  ButtonCellFormatterComponent
} from './datagrid/datagrid-angular-formatter.demo';
import {
  DataGridAngularCardFormatterDemoComponent,
  CardFormatterComponent
} from './datagrid/datagrid-angular-card-formatter.demo';
import { DataGridCardDemoComponent } from './datagrid/datagrid-card.demo';
import {
  DataGridCodeBlockFormatterDemoComponent
} from './datagrid/datagrid-code-block-formatter.demo';
import {
  DataGridCodeBlockEditorDemoComponent,
  CodeBlockEditorComponent
} from './datagrid/datagrid-code-block-editor.demo';
import {
  DataGridCustomFormatterDemoComponent,
  DemoCellFormatterComponent,
  DemoCellIntegerFormatterComponent
} from './datagrid/datagrid-custom-formatter.demo';
import { DataGridLookupClickDemoComponent } from './datagrid/datagrid-lookup-click-function.demo';
import { DataGridLookupDialogDemoComponent } from './datagrid/datagrid-lookup-dialog.demo';
import { DataGridCustomFormatterServiceDemoComponent } from './datagrid/datagrid-custom-formatter-service.demo';
import { DataGridDirtyIndicationDemoComponent } from './datagrid/datagrid-dirty-indication.demo';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic.demo';
import { DataGridAddRowDemoComponent } from './datagrid/datagrid-add-row.demo';
import { DataGridEditorsDemoComponent } from './datagrid/datagrid-editors.demo';
import { DataGridEmptyMessageDemoComponent } from './datagrid/datagrid-empty-message.demo';
import { DataGridExportWithoutDataGridDemoComponent } from './datagrid/datagrid-export-without-datagrid.demo';
import { DataGridFixedHeaderDemoComponent } from './datagrid/datagrid-fixedheader.demo';
import { DataGridFrozenColumnRefreshDemoComponent } from "./datagrid/datagrid-frozen-column-refresh.demo";
import { DataGridGroupableDemoComponent } from './datagrid/datagrid-groupable.demo';
import { DataGridGroupedHeaderDemoComponent } from './datagrid/datagrid-grouped-header.demo';
import { DataGridMixedSelectionDemoComponent } from './datagrid/datagrid-mixed-selection.demo';
import { DataGridPagingIndeterminateDemoComponent } from './datagrid/datagrid-paging-indeterminate.demo';
import { DatagridStandalonePagerDemoComponent } from './datagrid/datagrid-standalone-pager.demo';
import { DataGridPagingServiceDemoComponent } from './datagrid/datagrid-paging-service.demo';
import { DataGridRowReorderDemoComponent } from './datagrid/datagrid-rowreorder.demo';
import { DataGridSaveUserSettingsDemoComponent } from './datagrid/datagrid-save-user-settings.demo';
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service.demo';
import { DataGridSettingsDemoComponent } from './datagrid/datagrid-settings.demo';
import { DataGridExpandableRowDemoComponent } from './datagrid/datagrid-expandable-row.demo';
import { DatagridPopupMenuToolbarComponent } from './datagrid/datagrid-popupmenu-toolbar.demo';
import { DataGridStandardFormatterDemoComponent } from './datagrid/datagrid-standard-formatter.demo';
import { DataGridTabDemoComponent } from './datagrid/datagrid-tab.demo';
import { DataGridTestSettingsDemoComponent } from './datagrid/datagrid-test-settings.demo';
import { DataGridToolbarDemoComponent } from './datagrid/datagrid-toolbar.demo';
import { DataGridTreeGridDemoComponent } from './datagrid/datagrid-treegrid.demo';
import { DataGridTreeGridLazyDemoComponent } from './datagrid/datagrid-treegrid-lazy.demo';
import { DatagridTreegridDynamicfilteringDemoComponent } from './datagrid/datagrid-treegrid-dynamicfiltering.demo';
import { ExpandedDemoComponent, DataGridExpandableRowDynamicDemoComponent } from './datagrid/datagrid-expandable-row-dynamic.demo';
import { NestedDatagridDemoComponent, DataGridExpandableRowNestedDemoComponent } from './datagrid/datagrid-expandable-row-nested.demo';
import { DataGridSummaryRowDemoComponent } from './datagrid/datagrid-summary-row.demo';
import { DatepickerDemoComponent } from './datepicker/datepicker.demo';
import { DonutDemoComponent } from './donut/donut.demo';
import { DragDemoComponent } from './drag/drag.demo';
import { DropdownAsyncBusyDemoComponent } from './dropdown/dropdown-async-busy.demo';
import { DropdownAsyncDemoComponent } from './dropdown/dropdown-async.demo';
import { DropdownDemoComponent } from './dropdown/dropdown.demo';
import { DropdownMultiselectDemoComponent } from './dropdown/dropdown-multiselect.demo';
import { DropdownMultiselectLandmarkDemoComponent } from './dropdown/dropdown-multiselect-landmark.demo';
import { DropdownReactiveDemoComponent } from './dropdown/dropdown-reactive.demo';
import { DropdownSimpleDemoComponent } from './dropdown/dropdown-simple.demo';
import { DropdownTypeaheadDemoComponent } from './dropdown/dropdown-typeahead.demo';
import { EditorDemoComponent } from './editor/editor.demo';
import { EmptyMessageDemoComponent } from './emptymessage/emptymessage.demo';
import { ErrorDemoComponent } from './error/error.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { ExpandableAreaFooterDemoComponent } from './expandablearea/expandablearea-footer.demo';
import { FieldFilterDemoComponent } from './field-filter/field-filter.demo';
import { FieldOptionsDemoComponent } from './field-options/field-options.demo';
import { FieldOptionsPopdownDemoComponent } from './field-options/field-options-popdown.demo';
import { FileUploadDemoComponent } from './fileupload/fileupload.demo';
import { FileUploadLMDemoComponent } from './fileupload/fileupload-lm.demo';
import { FileUploadAdvancedDemoComponent } from './fileupload-advanced/fileupload-advanced.demo';
import { FormCompactDemoComponent } from './form-compact/form-compact.demo';
import { FormReactiveFormDemoComponent } from './form/form-reactive-form.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToggleButtonsDemoComponent } from './header/header-toggle-buttons.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { HierarchyDemoComponent } from './hierarchy/hierarchy.demo';
import { HierarchyPagingDemoComponent } from './hierarchy/hierarchy-paging.demo';
import { HomePageDemoComponent } from './homepage/homepage.demo';
import { HomePageEditableDemoComponent } from './homepage/homepage-editable.demo';
import { HomePageScenarioADemoComponent } from './homepage/homepage-scenario-a.demo';
import { HomePageScenarioBDemoComponent } from './homepage/homepage-scenario-b.demo';
import { HomePageScenarioCDemoComponent } from './homepage/homepage-scenario-c.demo';
import { HyperlinkDemoComponent } from './hyperlink/hyperlink.demo';
import { SohoHeaderDemoComponent } from './header/header.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { LabelDemoComponent } from './label/label.demo';
import { LineDemoComponent } from './line/line.demo';
import { ListViewDemoComponent } from './listview/listview.demo';
import { ListViewCustomContentDemoComponent } from './listview/listview.custom-content.demo';
import { LookupDemoComponent } from './lookup/lookup.demo';
import { LookupDialogDemoComponent } from './lookup/lookup-dialog.demo';
import { LookupLandmarkDemoComponent } from './lookup/lookup-landmark.demo';
import { LookupValidationDemoComponent } from './lookup/lookup-validation.demo';
import { LookupDescDemoComponent } from './lookup/lookup-desc.demo';
import { MaskDemoComponent } from './mask/mask.demo';
import { MenuButtonDemoComponent } from './menu-button/menu-button.demo';
import { MessageDemoComponent } from './message/message.demo';
import { ModalDialogDemoModule } from './modal-dialog/modal-dialog.demo.module';
import { MonthViewDemoComponent } from './monthview/monthview.demo';
import { MonthViewDemoInPageComponent } from './monthview/monthview-inpage.demo';
import { NotificationDemoComponent } from './notification/notification.demo';
import { NotificationBadgePlacementDemoComponent } from './notification-badge/notification-badge-placement.demo';
import { NotificationBadgeShowHideDemoComponent } from './notification-badge/notification-badge-show-hide.demo';
import { PagerStandaloneDemoComponent } from './pager/pager-standalone.demo';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
import { PersonalizeColorApiDemoComponent } from './personalize/personalize-color-api.demo';
import { PieDemoComponent } from './pie/pie.demo';
import { PopDownDemoComponent } from './popdown/popdown.demo';
import { PopupMenuDemoComponent } from './popupmenu/popupmenu.demo';
import { ProgressDemoComponent } from './progress/progress.demo';
import { RadarDemoComponent } from './radar/radar.demo';
import { RadioButtonDemoComponent } from './radiobutton/radiobutton.demo';
import { RatingDemoComponent } from './rating/rating.demo';
import { SearchFieldDemoComponent } from './searchfield/searchfield.demo';
import { SearchFieldCategoryDemoComponent } from './searchfield/searchfield-category.demo';
import { SearchFieldClearDemoComponent } from './searchfield/searchfield-clear.demo';
import { SliderDemoComponent } from './slider/slider.demo';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';
import { SohoMastheadDemoComponent } from './masthead/masthead.demo';
import { SohoRenderLoopService } from '../../projects/ids-enterprise-ng/src/lib/renderLoop';
import { SparklineDemoComponent } from './sparkline/sparkline.demo';
import { SpinboxDemoComponent } from './spinbox/spinbox.demo';
import { SplitterHorizontalDemoComponent } from './splitter/splitter-horizontal.demo';
import { SplitterVerticalDemoComponent } from './splitter/splitter-vertical.demo';
import { StepChartColorDemoComponent } from './stepchart/stepchart-color.demo';
import { StepChartDemoComponent } from './stepchart/stepchart.demo';
import { StepProcessBtnDisableDemoComponent } from './stepprocess/stepprocessbuttondisable.demo';
import { StepProcessDemoComponent } from './stepprocess/stepprocess.demo';
import { StepProcessDataDrivenDemoComponent } from './stepprocess/stepprocess-data-driven.demo';
import { StepProcessVetoableDemoComponent } from './stepprocess/stepprocessvetoable.demo';
import { SwapListDemoComponent } from './swaplist/swaplist.demo';
import { SwapListDynamicDemoComponent } from './swaplist/swaplist-dynamic.demo';
import { SwapListFullAccessDemoComponent } from './swaplist/swaplist-full-access.demo';
import { SwapListSearchDemoComponent } from './swaplist/swaplist-search.demo';
import { SwapListServiceDemoComponent } from './swaplist/swaplist-service.demo';
import { SwipeActionDemoComponent } from './swipe-action/swipe-action.demo';
import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';
import { TabsResizeDemoComponent } from './tabs/tabs-resize.demo';
import { TabsModuleDemoComponent } from './tabs/tabs-module.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TagDemoComponent } from './tag/tag.demo';
import { TestTabsBasicComponent } from './tabs/test-tabs-basic.demo';
import { TextareaDemoComponent } from './textarea/textarea.demo';
import { TextAreaDirtyDemoComponent } from './textarea/textarea-dirty.demo';
import { TimePickerDemoComponent } from './timepicker/timepicker.demo';
import { ToastDemoComponent } from './toast/toast.demo';
import { ToolbarAllIconsDemoComponent } from './toolbar/toolbar-all-icons.demo';
import { ToolbarBasicDemoComponent } from './toolbar/toolbar-basic.demo';
import { ToolbarDataDrivenDemoComponent } from './toolbar/toolbar-datadriven.demo';
import { ToolbarFlexBasicDemoComponent } from './toolbar-flex/toolbar-flex-basic.demo';
import { ToolbarFlexDatagridDemoComponent } from './toolbar-flex/toolbar-flex-datagrid.demo';
import { ToolbarFlexMoreActionsAjaxDemoComponent } from './toolbar-flex/toolbar-flex-more-actions-ajax.demo';
import { ToolbarFlexSearchfieldDemoComponent } from './toolbar-flex/toolbar-flex-searchfield.demo';
import { ToolbarMoreActionsAjaxDemoComponent } from './toolbar/toolbar-more-actions-ajax.demo';
import { ToolbarPresetMoreActionsDemoComponent } from './toolbar/toolbar-preset-more-actions.demo';
import { ToolbarStateComponent } from './toolbar/toolbar-state.component';
import { ToolbarStateDemoComponent } from './toolbar/toolbar-state.demo';
import { ToolbarRightAlignedDemoComponent } from './toolbar/toolbar-right-aligned.demo';
import { TooltipDemoComponent } from './tooltip/tooltip.demo';
import { TooltipNestedDemoComponent } from './tooltip/tooltip-nested.demo';
import { TrackDirtyDemoComponent } from './trackdirty/trackdirty.demo';
import { TreeContentDemoComponent } from './tree/tree-content.demo';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic.demo';
import { TreeExpandTargetDemoComponent } from './tree/tree-expand-target.demo';
import { TreemapDemoComponent } from './treemap/treemap.demo';
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
import { LocaleInitializerModule } from './locale-initializer/locale-initializer.module';
import { ApplicationMenuRoleSwitcherDemoComponent } from './application-menu/application-menu-roleswitcher.demo';
import { ApplicationMenuNotificationBadgeDemoComponent } from './application-menu/application-menu-notification-badge.demo';
import { ApplicationMenuTestPerfDemoComponent } from './application-menu/application-menu-test-performance.demo';
import { DataGridTreeGridCubeDemoComponent } from './datagrid/datagrid-treegrid-cube.demo';
import { WeekViewDemoComponent } from './week-view/week-view.demo';
import { ButtonsetDemoComponent } from './buttonset/buttonset.demo';
import { DropdownMultiselectAttributesDemoComponent } from './dropdown/dropdown-multiselect-attributes-demo'
import { DataGridVerticalScrollDemoComponent } from './datagrid/datagrid-vertical-scroll-to-end.demo';
import { LookupSourceDemoComponent } from './lookup/lookup-source.demo';
import { ImagesExampleDemoComponent } from './images/images-example.demo';
import { InputClearableDemoComponent } from './input/input-clearable.demo';
import { ListViewContextDemoComponent } from './listview/listview-context.demo';
import { HeaderSearchfieldDemoComponent } from './header/header-searchfield.demo';
import { HeaderSearchfieldFlexDemoComponent } from './header/header-searchfield-flex-demo';
import { HeaderSearchfieldCategoryDemoComponent } from './header/header-searchfield-category.demo';
import { HomePageEditableFilledComponent } from './homepage/homepage-editable-filled.demo';
import { SearchFieldCategoryUpdateDemoComponent } from './searchfield/searchfield-category-update.demo';
import { ListBuilderDemoComponent } from './listbuilder/listbuilder.demo';
import { MonthViewLegendDemoComponent } from './monthview/monthview-legend.demo';
import { DataGridRowSpanDemoComponent } from './datagrid/datagrid-rowspan.demo';
import { DonutColorsDemoComponent } from './donut/donut-colors.demo';

@NgModule({
  declarations: [
    AppComponent,
    AboutDemoComponent,
    AboutNestedDemoComponent,
    ActionsheetDemoComponent,
    ActionsheetWithTrayDemoComponent,
    AlertDemoComponent,
    ApplicationMenuDemoComponent,
    ApplicationMenuLazyDemoComponent,
    ApplicationMenuLazyMenuDemoComponent,
    ApplicationMenuRoleSwitcherDemoComponent,
    ApplicationMenuNotificationBadgeDemoComponent,
    ApplicationMenuTestPerfDemoComponent,
    AreaDemoComponent,
    ArrangeDemoComponent,
    AutocompleteDemoComponent,
    AutocompleteTemplatesDemoComponent,
    BarDemoComponent,
    BarGroupedDemoComponent,
    BarStackedDemoComponent,
    BlockGridCustomContentDemoComponent,
    BlockGridMixedSelectionDemoComponent,
    BlockGridMultiSelectionDemoComponent,
    BlockGridSingleSelectionDemoComponent,
    BlockGridPagingDemoComponent,
    BreadcrumbDemoComponent,
    BreadcrumbChangeContentsDemoComponent,
    BreadcrumbCssOnlyDemoComponent,
    BreadcrumbGauntletDemoComponent,
    BubbleDemoComponent,
    BulletDemoComponent,
    BusyIndicatorDemoComponent,
    BusyIndicatorDemoBodyComponent,
    ButtonDemoComponent,
    ButtonBadgeDemoComponent,
    ButtonsetDemoComponent,
    CardFormatterComponent,
    CalendarDemoComponent,
    CalendarLegendDemoComponent,
    CalendarHideLegendDemoComponent,
    CalendarUpdatedDemoComponent,
    CalendarRangeDemoComponent,
    CardsActionableDemoComponent,
    CardsDemoComponent,
    CardsExpandableDemoComponent,
    CardsMultiSelectDemoComponent,
    CardsSingleSelectDemoComponent,
    CardsWorkspaceWidgetsComponent,
    ChartDemoComponent,
    CheckBoxDemoComponent,
    CirclepagerDemoComponent,
    ColorPickerDemoComponent,
    ColumnDemoComponent,
    ColumnYAxisDemoComponent,
    ColumnGroupedDemoComponent,
    ColumnGroupedXaxisTwolineDemoComponent,
    ColumnStackedDemoComponent,
    CodeBlockComponent,
    CodeBlockDemoComponent,
    CodeBlockEditorComponent,
    CompletionChartDemoComponent,
    ContextMenuDemoComponent,
    ContextMenuNestedDemoComponent,
    ContextMenuSharedDemoComponent,
    ContextMenuToggleDemoComponent,
    ContextMenuLazyLoadDemoComponent,
    DataGridBreadcrumbDemoComponent,
    DataGridSandboxDemoComponent,
    DataGridCardDemoComponent,
    DataGridAngularEditorDemoComponent,
    DataGridAngularFormatterDemoComponent,
    DataGridAngularCardFormatterDemoComponent,
    DataGridCodeBlockFormatterDemoComponent,
    DataGridCodeBlockEditorDemoComponent,
    DataGridCustomFormatterDemoComponent,
    DataGridCustomFormatterServiceDemoComponent,
    DemoCellDatePickerEditorComponent,
    DataGridDirtyIndicationDemoComponent,
    DataGridDynamicDemoComponent,
    DataGridAddRowDemoComponent,
    DataGridEditorsDemoComponent,
    DataGridEmptyMessageDemoComponent,
    DataGridExportWithoutDataGridDemoComponent,
    DataGridFixedHeaderDemoComponent,
    DataGridFrozenColumnRefreshDemoComponent,
    DataGridGroupedHeaderDemoComponent,
    DataGridLookupDialogDemoComponent,
    DataGridLookupClickDemoComponent,
    DataGridMixedSelectionDemoComponent,
    DataGridPagingIndeterminateDemoComponent,
    DatagridStandalonePagerDemoComponent,
    DataGridPagingServiceDemoComponent,
    DatagridPopupMenuToolbarComponent,
    DataGridRowReorderDemoComponent,
    DataGridSaveUserSettingsDemoComponent,
    DataGridServiceDemoComponent,
    DataGridSettingsDemoComponent,
    DataGridExpandableRowDemoComponent,
    DataGridStandardFormatterDemoComponent,
    DataGridTabDemoComponent,
    DataGridTestSettingsDemoComponent,
    DataGridToolbarDemoComponent,
    DataGridTreeGridDemoComponent,
    DataGridTreeGridLazyDemoComponent,
    DataGridTreeGridCubeDemoComponent,
    DatagridTreegridDynamicfilteringDemoComponent,
    DataGridGroupableDemoComponent,
    DataGridVerticalScrollDemoComponent,
    NestedDatagridDemoComponent,
    ExpandedDemoComponent,
    DataGridExpandableRowNestedDemoComponent,
    DataGridExpandableRowDynamicDemoComponent,
    DataGridSummaryRowDemoComponent,
    DataGridRowSpanDemoComponent,
    DatepickerDemoComponent,
    DemoCellInputEditorComponent,
    DemoCellFormatterComponent,
    DemoCellIntegerFormatterComponent,
    DonutDemoComponent,
    DonutColorsDemoComponent,
    DragDemoComponent,
    PriceCellFormatterComponent,
    ButtonCellFormatterComponent,
    DropdownAsyncBusyDemoComponent,
    DropdownAsyncDemoComponent,
    DropdownDemoComponent,
    DropdownMultiselectDemoComponent,
    DropdownMultiselectLandmarkDemoComponent,
    DropdownReactiveDemoComponent,
    DropdownSimpleDemoComponent,
    DropdownTypeaheadDemoComponent,
    EditorDemoComponent,
    EmptyMessageDemoComponent,
    ErrorDemoComponent,
    ExpandableAreaDemoComponent,
    ExpandableAreaFooterDemoComponent,
    FieldFilterDemoComponent,
    FieldOptionsDemoComponent,
    FieldOptionsPopdownDemoComponent,
    FileUploadAdvancedDemoComponent,
    FileUploadDemoComponent,
    FileUploadLMDemoComponent,
    FormReactiveFormDemoComponent,
    FormCompactDemoComponent,
    HeaderTabsDemoComponent,
    HeaderToggleButtonsDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    HeaderToolbarDemoComponent,
    HeaderSearchfieldDemoComponent,
    HeaderSearchfieldFlexDemoComponent,
    HeaderSearchfieldCategoryDemoComponent,
    HierarchyDemoComponent,
    HierarchyPagingDemoComponent,
    HomePageDemoComponent,
    HomePageEditableDemoComponent,
    HomePageScenarioADemoComponent,
    HomePageScenarioBDemoComponent,
    HomePageScenarioCDemoComponent,
    HomePageEditableFilledComponent,
    HyperlinkDemoComponent,
    IconDemoComponent,
    ImagesExampleDemoComponent,
    InputClearableDemoComponent,
    LabelDemoComponent,
    LineDemoComponent,
    ListViewCustomContentDemoComponent,
    ListViewDemoComponent,
    ListViewContextDemoComponent,
    ListBuilderDemoComponent,
    LookupDemoComponent,
    LookupDialogDemoComponent,
    LookupLandmarkDemoComponent,
    LookupValidationDemoComponent,
    LookupDescDemoComponent,
    LookupSourceDemoComponent,
    MaskDemoComponent,
    MenuButtonDemoComponent,
    MessageDemoComponent,
    MonthViewDemoComponent,
    MonthViewDemoInPageComponent,
    MonthViewLegendDemoComponent,
    NotificationDemoComponent,
    NotificationBadgePlacementDemoComponent,
    NotificationBadgeShowHideDemoComponent,
    PagerStandaloneDemoComponent,
    PersonalizeColorApiDemoComponent,
    PersonalizeMenuComponent,
    PieDemoComponent,
    PopDownDemoComponent,
    PopupMenuDemoComponent,
    ProgressDemoComponent,
    RadarDemoComponent,
    RadioButtonDemoComponent,
    RatingDemoComponent,
    SearchFieldDemoComponent,
    SearchFieldCategoryDemoComponent,
    SearchFieldClearDemoComponent,
    SearchFieldCategoryUpdateDemoComponent,
    SliderDemoComponent,
    SohoHeaderDynamicDemoComponent,
    SohoHeaderDemoComponent,
    SohoMastheadDemoComponent,
    SparklineDemoComponent,
    SpinboxDemoComponent,
    SplitterHorizontalDemoComponent,
    SplitterVerticalDemoComponent,
    StepChartDemoComponent,
    StepChartColorDemoComponent,
    StepProcessDemoComponent,
    StepProcessBtnDisableDemoComponent,
    StepProcessDataDrivenDemoComponent,
    StepProcessVetoableDemoComponent,
    SwapListDemoComponent,
    SwapListDynamicDemoComponent,
    SwapListFullAccessDemoComponent,
    SwapListSearchDemoComponent,
    SwapListServiceDemoComponent,
    SwipeActionDemoComponent,
    TabsBasicDemoComponent,
    TabsCountsDemoComponent,
    TabsDataDrivenDemoComponent,
    TabsDismissibleDemoComponent,
    TabsDropdownDemoComponent,
    TabsDynamicDemoComponent,
    TabsResizeDemoComponent,
    TabsModuleDemoComponent,
    TabsVerticalDemoComponent,
    TagDemoComponent,
    TestTabsBasicComponent,
    TextareaDemoComponent,
    TextAreaDirtyDemoComponent,
    TimePickerDemoComponent,
    ToastDemoComponent,
    ToolbarAllIconsDemoComponent,
    ToolbarBasicDemoComponent,
    ToolbarDataDrivenDemoComponent,
    ToolbarFlexBasicDemoComponent,
    ToolbarFlexDatagridDemoComponent,
    ToolbarFlexMoreActionsAjaxDemoComponent,
    ToolbarFlexSearchfieldDemoComponent,
    ToolbarMoreActionsAjaxDemoComponent,
    ToolbarStateComponent,
    ToolbarStateDemoComponent,
    ToolbarPresetMoreActionsDemoComponent,
    ToolbarRightAlignedDemoComponent,
    TooltipDemoComponent,
    TooltipNestedDemoComponent,
    TrackDirtyDemoComponent,
    TreeContentDemoComponent,
    TreeDynamicDemoComponent,
    TreeExpandTargetDemoComponent,
    TreemapDemoComponent,
    TreeServiceDemoComponent,
    TreeSourceDemoComponent,
    ValidationFormDemoComponent,
    ValidationFormEventDemoComponent,
    ValidationFormGroupDemoComponent,
    WeekViewDemoComponent,
    WizardDemoComponent,
    WizardDemoConfirmationPageComponent,
    WizardDemoSelectFilePageComponent,
    WizardDemoTargetFolderPageComponent,
    WizardDemoBackupRulePageComponent,
    WizardDemoResultPageComponent,
    WizardDemoValidationRulesPageComponent,
    DropdownMultiselectAttributesDemoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalDialogDemoModule,
    ContextualActionPanelDemoModule,
    ReactiveFormsModule,
    SohoComponentsModule,
    LocaleInitializerModule
  ],
  providers: [
    ApplicationMenuLazyService,
    SohoRenderLoopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
