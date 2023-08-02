import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  AfterViewChecked,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  ComponentRef,
  Type,
  NgZone
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';
import { SohoDataGridService } from './soho-datagrid.service';

export type SohoDataGridType = 'auto' | 'content-only';

/**
 * Contract for cell editors.
 */
export interface ExtendedSohoDataGridCellEditor extends SohoDataGridCellEditor {
  // The type of the component.
  component: Type<SohoDataGridCellEditor>;

  // The args passed to the editor
  args: SohoDataGridEditCellFunctionArgs;

  // This is the input element (single) within the field
  input?: JQuery<HTMLElement>;

  // Use the direct value from the dataset vs the formatted value
  useValue: boolean;

  // The parent class of the inner editor. Used to determine if open or not.
  className?: string;

  /**
   * Initialise the edit control with the given component.  The control
   * mist conform to the SohoDataGridCellEditor contract.
   */
  init(componentRef: ComponentRef<SohoDataGridCellEditor>): void;

  /**
   * Destroy the editor.
   */
  destroy(): void;
}

export class SohoAngularEditorAdapter implements ExtendedSohoDataGridCellEditor {
  componentRef?: ComponentRef<SohoDataGridCellEditor> | null;

  input?: JQuery<HTMLElement>;

  // Use the direct value from the dataset vs the formatted value
  useValue = true;

  // The parent class of the inner editor. Used to determine if open or not.
  className?: string;

  constructor(
    public component: Type<SohoDataGridCellEditor>,
    public args: SohoDataGridEditCellFunctionArgs) {
  }

  init(componentRef: ComponentRef<SohoDataGridCellEditor>) {
    // Store the component.
    this.componentRef = componentRef;

    // The Soho datagrid wants an input control, otherwise it wont accept the editor
    // as a component.
    // @todo talk to Tim about removing this requirement.
    this.input = $(this.componentRef.location.nativeElement).find('input:first');
    this.className = this.componentRef.instance
      && this.componentRef.instance.className
      ? this.componentRef.instance.className : '.editor';
  }

  val(value?: any): any {
    return this.componentRef?.instance.val(value);
  }

  focus(): void {
    this.componentRef?.instance.focus();
  }

  destroy(): void {
    if (this.componentRef) {
      setTimeout(() => {
        this.componentRef?.destroy();
        this.componentRef = null;
      });
    }
  }
}

/**
 * Internal refresh hints used to determine what type of "refresh" is
 * required after the change detection process has completed and the
 * AfterViewChecked method is called.
 *
 * @todo resolve no-shadow
 */
// eslint-disable-next-line no-shadow
enum RefreshHintFlags {
  // No refresh required.
  None = 0,
  // The rows needs to be re-rendered.
  RenderRows = 1,
  // The header needs to be re-renendered.
  RenderHeader = 2,
  // A full rebuild is required.
  Rebuild = 4
}

/**
 * Angular Wrapper for the Soho Data Grid Component.
 *
 * This component searches for an element with the attribute
 * 'soho-datagrid' in the parent's DOM tree, initialising it with
 * the Soho datagrid control.
 *
 * The data is provided either by a component input or an implementation
 * of the DataGridService interface, by specifying an implementation
 * on the hosting component, i.e.
 *
 * providers: [ provide: DataGridService, useClass: DataGridDemoService} ]
 */
@Component({
  selector: '[soho-datagrid]', // eslint-disable-line
  template: ' <ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoDataGridComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  // -------------------------------------------
  // Soho Data Grid Types
  // -------------------------------------------

  // "auto" where columns and rows are obtained from the injected service
  // (if defined) or via the Inputs, otherwise.
  static AUTO: SohoDataGridType = 'auto';

  // 'content-only' where table elements are used to define the
  // columns and rows.
  static CONTENT_ONLY: SohoDataGridType = 'content-only';

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /**
   * Sets the grid options for the data grid, marking this components
   * as requiring a full rebuild at the end of the change lifecycle.
   *
   * @param gridOptions - not null grid options.
   */
  @Input() set gridOptions(gridOptions: SohoDataGridOptions) {
    ArgumentHelper.checkNotNull('gridOptions', gridOptions);

    this._gridOptions = gridOptions;

    this.checkForComponentEditors();
    this.checkForSummaryRowSettings();

    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh('gridOptions', RefreshHintFlags.Rebuild);
    }
  }
  get gridOptions(): SohoDataGridOptions {
    if (this.datagrid) {
      return this.datagrid.settings;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions;
  }

  /**
   * Defines which property in the data rows is to be used as the id of each
   * row of the data.
   *
   * @param idProperty string id
   */
  @Input() set idProperty(idProperty: string | undefined) {
    this._gridOptions.idProperty = idProperty;
    if (this.datagrid) {
      this.datagrid.settings.idProperty = idProperty;
      this.markForRefresh('idProperty', RefreshHintFlags.Rebuild);
    }
  }

  get idProperty(): string | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.idProperty;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.idProperty;
  }

  /**
   * The value of the frozenColumns option - returns the requested
   * value if the control has not been created yet.
   */
  get frozenColumns(): SohoDataGridFrozenColumns | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.frozenColumns;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.frozenColumns;
  }

  /**
   * Sets the frozenColumns settings - will force a grid rebuild if the component has already been
   * created.
   *
   * @param frozenColumns - the frozenColumns settings.
   */
  @Input() set frozenColumns(frozenColumns: SohoDataGridFrozenColumns | undefined) {
    this._gridOptions.frozenColumns = frozenColumns;
    if (this.datagrid) {
      this.datagrid.settings.frozenColumns = frozenColumns;

      // Force all a full rebuild of the control.
      this.markForRefresh('frozenColumns', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * If true allows
   */
  @Input() set cellNavigation(cellNavigation: boolean | undefined) {
    this._gridOptions.cellNavigation = cellNavigation;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.cellNavigation = cellNavigation;
      this.markForRefresh('cellNavigation', RefreshHintFlags.RenderRows);
    }
  }

  get cellNavigation(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.cellNavigation;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.cellNavigation;
  }

  get isVerticalScrollToEnd(): boolean | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).isVerticalScrollToEnd;
    }

    return false;
  }

  /**
   * Changes the row navigation setting of the data grid. If rowNavigation
   * is "false” then a border is not displayed around the row.
   *
   * Defaults to true.
   *
   * @param rowlNavigation i "false” then grid will NOT show a border around the row.
   */
  @Input() set rowNavigation(rowNavigation: boolean | undefined) {
    this._gridOptions.rowNavigation = rowNavigation;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.rowNavigation = rowNavigation;
      this.markForRefresh('rowNavigation', RefreshHintFlags.RenderRows);
    }
  }

  get rowNavigation(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.rowNavigation;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.rowNavigation;
  }

  /**
   * If true, displays the rows in the grid using alternate shading, otherwise
   * all the rows use the same shading.
   */
  @Input() set alternateRowShading(alternateRowShading: boolean | undefined) {
    this._gridOptions.alternateRowShading = alternateRowShading;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.alternateRowShading = alternateRowShading;
      this.markForRefresh('alternateRowShading', RefreshHintFlags.RenderRows);
    }
  }

  get alternateRowShading(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.rowNavigation;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.alternateRowShading;
  }

  /**
   * The data to be displayed provided as an array
   * of json objects compatible with the column meta
   * data provided.
   *
   * @param dataset - array of json objects
   */
  @Input() set dataset(dataset: Array<any> | undefined) {
    this._gridOptions.dataset = dataset;
    if (this.jQueryElement) {
      const pagerInfo: SohoPagerPagingInfo = {};
      (this.datagrid as any).settings.dataset = dataset;

      this.ngZone.runOutsideAngular(() => {
        // @todo do we need hints as this may be bundled up with other changes.
        (this.datagrid as any).updateDataset((dataset as any), pagerInfo);
      });
    }
  }

  /**
   * Return the dataset currently displayed by the datagrid.
   *
   * @return an array of objects.
   */
  get dataset(): any[] | undefined {

    // If the Soho control has been created, then the dataset
    // in the settings object will contain the rows currently
    // on display.
    if (this.datagrid) {
      return this.datagrid.settings.dataset;
    }

    // ... we've been called before the component has completed
    // initialisation, so no data has been set (or potentially
    // retrieved from a service), so the only option is the
    // Input dataset, which may be undefined.
    return this._gridOptions.dataset || [];
  }

  /**
   * If true the columns can be reorders; otherwise if false they are fixed.
   */
  @Input() set columnReorder(columnReorder: boolean | undefined) {
    this._gridOptions.columnReorder = columnReorder;
    if (this.datagrid) {
      this.datagrid.settings.columnReorder = columnReorder;
      this.markForRefresh('columnReorder', RefreshHintFlags.RenderHeader);
    }
  }

  get columnReorder(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.columnReorder;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.columnReorder;
  }

  @Input() set disableClientSort(disableClientSort: boolean | undefined) {
    this._gridOptions.disableClientSort = disableClientSort;
    if (this.datagrid) {
      this.datagrid.settings.disableClientSort = disableClientSort;
    }
  }

  get disableClientSort(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.disableClientSort;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.disableClientSort;
  }

  @Input() set disableClientFilter(disableClientFilter: boolean | undefined) {
    this._gridOptions.disableClientFilter = disableClientFilter;
    if (this.datagrid) {
      this.datagrid.settings.disableClientFilter = disableClientFilter;
    }
  }

  get disableClientFilter(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.disableClientFilter;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.disableClientFilter;
  }

  @Input() set resultsText(resultsText: SohoDataGridResultsTextFunction) {
    this._gridOptions.resultsText = resultsText;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.resultsText = resultsText;
    }
  }

  @Input() set showFilterTotal(showFilterTotal: boolean | undefined) {
    this._gridOptions.showFilterTotal = showFilterTotal;
    if (this.datagrid) {
      this.datagrid.settings.showFilterTotal = showFilterTotal;
    }
  }

  get showFilterTotal(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.showFilterTotal;
    }

    return this._gridOptions.showFilterTotal;
  }

  /**
   * If true, the grid allows edits, otherwise if false edits are disabled.
   */
  @Input() set editable(editable: boolean | undefined) {
    this._gridOptions.editable = editable;
    if (this.datagrid) {
      this.datagrid.settings.editable = editable;
      this.markForRefresh('editable', RefreshHintFlags.Rebuild);
    }
  }

  get editable(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.editable;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.editable;
  }

  /**
   * Input that defines a function which is used to determine if a row is disabled, or not.
   */
  @Input() set isRowDisabled(isRowDisabled: SohoIsRowDisabledFunction | undefined) {
    this._gridOptions.isRowDisabled = isRowDisabled;
    if (this.datagrid) {
      this.datagrid.settings.isRowDisabled = isRowDisabled;
      this.markForRefresh('isRowDisabled', RefreshHintFlags.RenderRows);
    }
  }

  get isRowDisabled(): SohoIsRowDisabledFunction | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.isRowDisabled;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.isRowDisabled;
  }

  @Input() set allowOneExpandedRow(allowOneExpandedRow: boolean | undefined) {
    this._gridOptions.allowOneExpandedRow = allowOneExpandedRow;
    if (this.datagrid) {
      this.datagrid.settings.allowOneExpandedRow = allowOneExpandedRow;
    }
  }

  get allowOneExpandedRow(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.allowOneExpandedRow;
    }

    return this._gridOptions.allowOneExpandedRow;
  }

  @Input() set rowTemplate(rowTemplate: string | undefined) {
    this._gridOptions.rowTemplate = rowTemplate;
    if (this.datagrid) {
      this.datagrid.settings.rowTemplate = rowTemplate;
    }
  }

  get rowTemplate(): string | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.rowTemplate;
    }

    return this._gridOptions.rowTemplate;
  }

  @Input() set rowTemplateComponent(rowTemplateComponent: any) {
    this._gridOptions.rowTemplateComponent = rowTemplateComponent;
    if (this.datagrid) {
      this.datagrid.settings.rowTemplateComponent = rowTemplateComponent;
    }
  }

  get rowTemplateComponent(): any {
    if (this.datagrid) {
      return this.datagrid.settings.rowTemplateComponent;
    }

    return this._gridOptions.rowTemplateComponent;
  }

  @Input() set rowTemplateComponentInputs(rowTemplateComponentInputs: any) {
    this._gridOptions.rowTemplateComponentInputs = rowTemplateComponentInputs;
    if (this.datagrid) {
      this.datagrid.settings.rowTemplateComponentInputs = rowTemplateComponentInputs;
    }
  }

  get rowTemplateComponentInputs(): any {
    if (this.datagrid) {
      return this.datagrid.settings.rowTemplateComponentInputs;
    }

    return this._gridOptions.rowTemplateComponentInputs;
  }

  @Input() set rowTemplateField(rowTemplateField: string | undefined) {
    this._gridOptions.rowTemplateField = rowTemplateField;
    if (this.datagrid) {
      this.datagrid.settings.rowTemplateField = rowTemplateField;
    }
  }

  get rowTemplateField(): string | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.rowTemplateField;
    }

    return this._gridOptions.rowTemplateField;
  }

  /**
   * If true, will select the cell text soon as entering edit mode
   */
  @Input() set selectOnEdit(selectOnEdit: boolean | undefined) {
    this._gridOptions.selectOnEdit = selectOnEdit;
    if (this.datagrid) {
      this.datagrid.settings.selectOnEdit = selectOnEdit;
      this.markForRefresh('editable', RefreshHintFlags.Rebuild);
    }
  }

  get selectOnEdit(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.selectOnEdit;
    }
    return this._gridOptions.selectOnEdit;
  }

  @Input() set isList(isList: boolean | undefined) {
    this._gridOptions.isList = isList;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.isList = isList;

      // calling rebuild as a brute force way of udpating the view.
      this.markForRefresh('isList', RefreshHintFlags.Rebuild);
    }
  }

  get isList(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.isList;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.isList;
  }

  @Input() set menuId(menuId: any) {
    this._gridOptions.menuId = menuId;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.menuId = menuId;
      this.markForRefresh('menuId', RefreshHintFlags.Rebuild);
    }
  }

  /** beforeOpen - ajax callback for open event */
  @Input() set menuBeforeOpen(menuBeforeOpen: SohoPopupMenuSourceFunction) {
    this._gridOptions.menuBeforeOpen = menuBeforeOpen;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.menuBeforeOpen = menuBeforeOpen;
      this.markForRefresh('menuBeforeOpen', RefreshHintFlags.Rebuild);
    }
  }

  get menuBeforeOpen(): SohoPopupMenuSourceFunction {
    return (this._gridOptions as any).settings.menuBeforeOpen;
  }

  /**
   * Sets the row height for the grid, to be one of the supported options.
   *
   * @param rowHeight - 'extra-small' | 'small' | 'medium' | 'large'
   */
  @Input() set rowHeight(rowHeight: SohoDataGridRowHeight) {
    this._gridOptions.rowHeight = rowHeight;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.rowHeight = rowHeight;

      this.ngZone.runOutsideAngular(() => {
        (this.datagrid as any).rowHeight(rowHeight);
      });
    }
  }

  /**
   * Sets the height of the row to something other then the three built in rowHeights.
   *
   * @param fixedRowHeight Any integer
   */
  @Input() set fixedRowHeight(fixedRowHeight: number | string | Function) {
    this._gridOptions.fixedRowHeight = fixedRowHeight;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.fixedRowHeight = fixedRowHeight;
      this.markForRefresh('fixedRowHeight', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Whether selection is enabled.
   *
   * @param selectable valid values are: 'multiple', 'single', 'mixed', 'siblings' and false.
   */
  @Input() set selectable(selectable: any) {
    this._gridOptions.selectable = selectable;
    if (this.jQueryElement) {
      // Just changing the datagrid.settings.selectable updates the datagrid view.
      (this.datagrid as any).settings.selectable = selectable;
      this.markForRefresh('selectable', RefreshHintFlags.RenderRows);
    }
  }

  get selectable(): any {
    if (this.datagrid) {
      return this.datagrid.settings.selectable;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.selectable;
  }

  @Input() set showSelectAllCheckBox(showSelectAllCheckBox: boolean | undefined) {
    this._gridOptions.showSelectAllCheckBox = showSelectAllCheckBox;
    if (this.jQueryElement) {
      // Just changing the datagrid.settings.selectable updates the datagrid view.
      (this.datagrid as any).settings.showSelectAllCheckBox = showSelectAllCheckBox;
      this.markForRefresh('showSelectAllCheckBox', RefreshHintFlags.Rebuild);
    }
  }

  get showSelectAllCheckBox(): boolean | undefined {
    return this._gridOptions.showSelectAllCheckBox;
  }

  @Input() set clickToSelect(clickToSelect: boolean | undefined) {
    this._gridOptions.clickToSelect = clickToSelect;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.clickToSelect = clickToSelect;
      this.markForRefresh('clickToSelect', RefreshHintFlags.RenderRows);
    }
  }

  get clickToSelect(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.clickToSelect;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.clickToSelect;
  }

  @Input() set toolbar(toolbar: SohoToolbarOptions) {
    this._gridOptions.toolbar = toolbar;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.toolbar = toolbar;
      this.markForRefresh('toolbar', RefreshHintFlags.Rebuild);
    }
  }

  @Input() set initializeToolbar(initializeToolbar: boolean | undefined) {
    this._gridOptions.initializeToolbar = initializeToolbar;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.initializeToolbar = initializeToolbar;
    }
  }

  get initializeToolbar(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.initializeToolbar;
    }

    return this._gridOptions.initializeToolbar;
  }

  @Input() set saveUserSettings(settingsForSave: SohoDataGridSaveUserSettings) {
    this._gridOptions.saveUserSettings = settingsForSave;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.saveUserSettings = settingsForSave;
    }
  }

  @Input() set paging(paging: boolean | undefined) {
    this._gridOptions.paging = paging;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.paging = paging;

      // todo: update soho data grids view - this.updatePagingInfo()?
      this.markForRefresh('paging', RefreshHintFlags.Rebuild);
    }
  }
  get paging(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.paging;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.paging;
  }

  @Input() set pagesize(pagesize: number) {
    this._gridOptions.pagesize = pagesize;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.pagesize = pagesize;
      this.markForRefresh('pagesize', RefreshHintFlags.Rebuild);
    }
  }

  @Input() set pagesizes(pagesizes: Array<number>) {
    this._gridOptions.pagesizes = pagesizes;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.pagesizes = pagesizes;
      this.markForRefresh('pagesizes', RefreshHintFlags.Rebuild);
    }
  }

  @Input() set indeterminate(indeterminate: boolean) {
    this._gridOptions.indeterminate = indeterminate;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.indeterminate = indeterminate;
      this.markForRefresh('indeterminate', RefreshHintFlags.Rebuild);
    }
  }

  @Input() set actionableMode(actionableMode: boolean | undefined) {
    this._gridOptions.actionableMode = actionableMode;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.actionableMode = actionableMode;
      this.markForRefresh('actionableMode', RefreshHintFlags.Rebuild);
    }
  }

  get actionableMode(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.actionableMode;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.actionableMode;
  }

  @Input() set saveColumns(saveColumns: boolean) {
    this._gridOptions.saveColumns = saveColumns;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.saveColumns = saveColumns;
      this.markForRefresh('saveColumns', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Input for the source function.
   *
   * @param source the dataset's source function.
   */
  @Input() set source(source: SohoDataGridSourceFunction | undefined) {
    this.updateSource((source as any));
    if (this.jQueryElement) {
      (this.datagrid as any).settings.source = source;
      this.markForRefresh('source', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Enables or disables the filter bar on the grid.
   *
   * @param filterable if true, the filter bar is displayed; otherwise no filter bar is displayed.
   */
  @Input() set filterable(filterable: boolean | undefined) {
    this._gridOptions.filterable = filterable;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.filterable = filterable;
      this.markForRefresh('filterable', RefreshHintFlags.Rebuild);
    }
  }
  get filterable(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.filterable;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.filterable;
  }

  @Input() set filterWhenTyping(filterWhenTyping: boolean | undefined) {
    this._gridOptions.filterWhenTyping = filterWhenTyping;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.filterWhenTyping = filterWhenTyping;
    }
  }

  get filterWhenTyping(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.filterWhenTyping;
    }

    return this._gridOptions.filterWhenTyping;
  }

  /**
   * If true the datagrid is displayed as a tree, otherwise
   * the grid is displayed as flat rows.
   *
   * This field is dynamic, and will cause the grid to be rebuilt
   * if changed.
   *
   * @param treeGrid - boolean flag indicating if the data is hierarchical.
   */
  @Input() set treeGrid(treeGrid: boolean | undefined) {
    if (treeGrid !== this._gridOptions.treeGrid) {
      this._gridOptions.treeGrid = treeGrid;

      // If the jQuery control has been initialised, update it.
      if (this.jQueryElement) {
        (this.datagrid as any).settings.treeGrid = treeGrid;
        this.markForRefresh('treeGrid', RefreshHintFlags.Rebuild);
      }
    }
  }

  get treeGrid(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.treeGrid;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.treeGrid;
  }

  /**
   * Returns the unqiue identifier; which may be undefined.
   */
  get uniqueId(): string | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.uniqueId;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.uniqueId;
  }

  /**
   * Sets the unqiueId - will force a grid rebuild if the component has already been
   * created.
   *
   * @param unqiueId - the new id.
   */
  @Input() set uniqueId(uniqueId: string | undefined) {
    this._gridOptions.uniqueId = uniqueId;
    if (this.datagrid) {
      this.datagrid.settings.uniqueId = uniqueId;

      // Force all a full rebuild of the control.
      this.markForRefresh('uniqueId', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The value of the rowReorder flag - returns the requested value if the control has not been created yet.
   */
  get rowReorder(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.rowReorder;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.rowReorder;
  }

  /**
   * Sets the rowReorder flag - will force a grid rebuild if the component has already been
   * created.
   *
   * @param rowReorder - if true the rows will be reorderable; otherwise they will not.
   */
  @Input() set rowReorder(value: boolean | undefined) {
    this._gridOptions.rowReorder = value;
    if (this.datagrid) {
      this.datagrid.settings.rowReorder = value;

      // Force all a full rebuild of the control.
      this.markForRefresh('rowReorder', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The value of the showDirty flag - returns the requested value if the control has not been created yet.
   */
  get showDirty(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.showDirty;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.showDirty;
  }

  /**
   * Sets the showDirty flag - will force a grid rebuild if the component has already been
   * created.
   *
   * @param showDirty - if true then dirty rows will be highlighted; otherwise they will not.
   */
  @Input() set showDirty(value: boolean | undefined) {
    this._gridOptions.showDirty = value;
    if (this.datagrid) {
      this.datagrid.settings.showDirty = value;

      // Force all a full rebuild of the control.
      this.markForRefresh('showDirty', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Sets the resizeMode option to changes the column resize behavior.
   *
   * @param resizeMode - if true then dirty rows will be highlighted; otherwise they will not.
   */
  @Input() set resizeMode(value: SohoDataGridResizeMode | undefined) {
    this._gridOptions.resizeMode = value;
    if (this.datagrid) {
      this.datagrid.settings.resizeMode = value;

      this.markForRefresh('resizeMode', RefreshHintFlags.None);
    }
  }

  /**
   * Sets the datagrid header background color, either dark or light.
   * @param headerBackgroundColor - default value is 'dark'
   */
  @Input() set headerBackgroundColor(value: SohoDatagridHeaderBackgroundColor | undefined) {
    this._gridOptions.headerBackgroundColor = value;
    if (this.datagrid) {
      this.datagrid.settings.headerBackgroundColor = value;
    }
  }

  @Input() set headerMenuId(value: string | undefined) {
    this._gridOptions.headerMenuId = value;
    if (this.datagrid) {
      this.datagrid.settings.headerMenuId = value;
    }
  }

  get headerMenuId(): string | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.headerMenuId;
    }

    return this._gridOptions.headerMenuId;
  }

  @Input() set headerMenuSelected(headerMenuSelected: Function) {
    this._gridOptions.headerMenuSelected = headerMenuSelected;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.headerMenuSelected = headerMenuSelected;
    }
  }

  @Input() set headerMenuBeforeOpen(headerMenuBeforeOpen: Function) {
    this._gridOptions.headerMenuBeforeOpen = headerMenuBeforeOpen;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.headerMenuBeforeOpen = headerMenuBeforeOpen;
    }
  }

  get disableRowDeactivation(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.disableRowDeactivation;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.disableRowDeactivation;
  }

  @Input() set disableRowDeactivation(value: boolean | undefined) {
    this._gridOptions.disableRowDeactivation = value;
    if (this.datagrid) {
      this.datagrid.settings.disableRowDeactivation = value;
    }
  }

  get disableRowDeselection(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.disableRowDeselection;
    }

    return this._gridOptions.disableRowDeselection;
  }

  @Input() set disableRowDeselection(value: boolean | undefined) {
    this._gridOptions.disableRowDeselection = value;
    if (this.datagrid) {
      this.datagrid.settings.disableRowDeselection = value;
    }
  }
  /**
   * Used to hold an object that can be referenced in formatters
   * and editors or anywhere else a datagrid reference is available
   */
  @Input() set userObject(userObject: any | undefined) {
    this._gridOptions.userObject = userObject;
    if (this.datagrid) {
      this.datagrid.settings.userObject = userObject;
    }
  }

  get userObject(): any | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.userObject;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.userObject;
  }

  /**
   * The value of the groupable option - returns the requested
   * value if the control has not been created yet.
   */
  get groupable(): SohoDataGridGroupable | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.groupable;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._gridOptions.groupable;
  }

  /**
   * Sets the groupable settings - will force a grid rebuild if the component has already been
   * created.
   *
   * @param groupable - the groupable settings.
   */
  @Input() set groupable(value: SohoDataGridGroupable | undefined) {
    this._gridOptions.groupable = value;
    if (this.datagrid) {
      this.datagrid.settings.groupable = value;

      // Force all a full rebuild of the control.
      this.markForRefresh('groupable', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The array of data to display in the grid.
   *
   * @param an array of objects matching the column definition.
   *
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */
  @Input() set data(data: any[] | undefined) {
    this.gridData = data;
    if (data && this.jQueryElement) {

      this.ngZone.runOutsideAngular(() => {
        // @todo add hints for this too, as other changes may force a rebuild?
        this.datagrid?.loadData(data);
      });
    }
  }

  /**
   * The array of columns to display in the grid.
   *
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */
  @Input() set columns(columns: SohoDataGridColumn[] | undefined) {
    this._gridOptions.columns = columns || [];

    this.checkForComponentEditors();

    if (columns && this.jQueryElement) {

      this.ngZone.runOutsideAngular(() => {
        this.datagrid?.updateColumns((this._gridOptions as any).columns, (this._gridOptions as any).columnGroups);
        (this.datagrid as any).setOriginalColumns();
      });
    }
  }

  /**
   *
   * Summary row columns settingss
   */
  @Input() set summaryRowColumns(summaryRowColumns: SohoDataGridSummaryRowColumnSettings[]) {
    this._gridOptions.summaryRowColumns = summaryRowColumns;
    this.checkForSummaryRowSettings();

    if (this._gridOptions.columns && this.jQueryElement) {
      this.ngZone.runOutsideAngular(() =>
        this.datagrid?.updateColumns((this._gridOptions.columns as any), (this._gridOptions.columnGroups as any)));
    }
  }

  /**
   * If true an extra column will be added to the end that fills the space.
   * This allows columns to not stretch to fill so they are a constant size.
   * This setting cannot be used with percent columns.
   */
  @Input() set spacerColumn(spacerColumn: boolean | undefined) {
    this._gridOptions.spacerColumn = spacerColumn;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.spacerColumn = spacerColumn;
      this.markForRefresh('spacerColumn', RefreshHintFlags.Rebuild);
    }
  }


  /**
   * If true an extra column is currently added to the end that fills the space.
   */
  get spacerColumn(): boolean | undefined {
    return this._gridOptions?.spacerColumn;
  }

  @Input() set sizeColumnsEqually(sizeColumnsEqually: boolean | undefined) {
    this._gridOptions.sizeColumnsEqually = sizeColumnsEqually;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.sizeColumnsEqually = sizeColumnsEqually;
    }
  }

  get sizeColumnsEqually(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.sizeColumnsEqually;
    }

    return this._gridOptions.sizeColumnsEqually;
  }

  @Input() set expandableRow(expandableRow: boolean | undefined) {
    this._gridOptions.expandableRow = expandableRow;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.expandableRow = expandableRow;
    }
  }

  get expandableRow(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.expandableRow;
    }

    return this._gridOptions.expandableRow;
  }

  @Input() set redrawOnResize(redrawOnResize: boolean | undefined) {
    this._gridOptions.redrawOnResize = redrawOnResize;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.redrawOnResize = redrawOnResize;
    }
  }

  get redrawOnResize(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.redrawOnResize;
    }

    return this._gridOptions.redrawOnResize;
  }

  @Input() set exportConvertNegative(exportConvertNegative: boolean | undefined) {
    this._gridOptions.exportConvertNegative = exportConvertNegative;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.exportConvertNegative = exportConvertNegative;
    }
  }

  get exportConvertNegative(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.exportConvertNegative;
    }

    return this._gridOptions.exportConvertNegative;
  }

  /* Experimental Feature to stick on the top of the page. This feature has numerous limitations. */
  @Input() set stickyHeader(stickyHeader: boolean) {
    this._gridOptions.stickyHeader = stickyHeader;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.stickyHeader = stickyHeader;
      this.markForRefresh('stickyHeader', RefreshHintFlags.Rebuild);
    }
  }

  /* Experimental Feature to stick on the top of the page. This feature has numerous limitations. */
  @Input() set attributes(attributes: Array<Object> | Object) {
    this._gridOptions.attributes = attributes;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.attributes = attributes;
      this.markForRefresh('attributes', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Determines the sizing method for the auto sizing columns.
   */
  @Input() set columnSizing(columnSizing: 'both' | 'data' | 'header' | undefined) {
    this._gridOptions.columnSizing = columnSizing;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.columnSizing = columnSizing;
      this.markForRefresh('columnSizing', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Determines the sizing method for the auto sizing columns.
   */
  get columnSizing(): 'both' | 'data' | 'header' | undefined {
    return this._gridOptions.columnSizing;
  }

  /**
   * The name of the column stretched to fill the width of the datagrid,
   * or 'last' where the last column will be stretched to fill the
   * remaining space.
   *
   * @param stretchColumn - the name of the column to stretch; or 'last',
   */
  @Input() set stretchColumn(stretchColumn: string | undefined) {
    this._gridOptions.stretchColumn = stretchColumn;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.stretchColumn = stretchColumn;
      this.markForRefresh('stretchColumn', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The name of the column to stretch, or 'last' if the
   * last column is stretched.
   */
  get stretchColumn(): string | undefined {
    return this._gridOptions.stretchColumn;
  }

  /**
   * If true, column will recalculate its width and stretch if required on column change.
   *
   * @param stretchColumnOnChange - If false stretch logic wont run on column change.
   */
  @Input() set stretchColumnOnChange(stretchColumnOnChange: boolean | undefined) {
    this._gridOptions.stretchColumnOnChange = stretchColumnOnChange;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.stretchColumnOnChange = stretchColumnOnChange;
      this.markForRefresh('stretchColumnOnChange', RefreshHintFlags.Rebuild);
    }
  }
  /**
   * The current value of stretchColumnOnChange.
   */
  get stretchColumnOnChange(): boolean | undefined {
    return this._gridOptions.stretchColumnOnChange;
  }

  /**
   * Whether to show the page size selector or not.
   */
  @Input() set showPageSizeSelector(showPageSizeSelector: boolean) {
    this._gridOptions.showPageSizeSelector = showPageSizeSelector;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.showPageSizeSelector = showPageSizeSelector;

      // todo: need a function in datagrid.js that allows toggling of the page size selector. for now I have to rebuild the datagrid.
      this.markForRefresh('showPageSizeSelector', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * If true, hides the pager if there's only one page worth of results.
   */
  @Input() set hidePagerOnOnePage(hidePagerOnOnePage: boolean) {
    this._gridOptions.hidePagerOnOnePage = hidePagerOnOnePage;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.hidePagerOnOnePage = hidePagerOnOnePage;

      this.markForRefresh('hidePagerOnOnePage', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The column groups
   *
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */
  @Input() set columnGroup(columnGroups: SohoDataGridColumnGroup[]) {
    this._gridOptions.columnGroups = columnGroups || [];
    if (columnGroups && this._gridOptions.columns && this.jQueryElement) {

      // @todo add hints for this too, as other changes may force a rebuild?
      (this.datagrid as any).updateColumns(this._gridOptions.columns, columnGroups);
    }
  }

  get columnGroup(): SohoDataGridColumnGroup[] {
    if (this.datagrid) {
      return this.datagrid.settings.columnGroups || [];
    }

    return this._gridOptions.columnGroups || [];
  }

  /**
   * The `emptyMessage` data grid option.
   * Use null or undefined to remove any empty message.
   */
  @Input() set emptyMessage(emptyMessage: SohoEmptyMessageOptions | null | undefined) {
    // Check for undefined/null and reset to the default message
    if (!emptyMessage) {
      // soho only takes a null here so making it so any !emptyMessage gets set to null
      emptyMessage = null;
    }

    this._gridOptions.emptyMessage = emptyMessage;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.emptyMessage = emptyMessage;
      this.ngZone.runOutsideAngular(() => {
        this.datagrid?.setEmptyMessage(emptyMessage);
      });
    }
  }

  get emptyMessage(): SohoEmptyMessageOptions | null | undefined {
    return this._gridOptions.emptyMessage;
  }

  /**
   * Enable toolips on the cell values, at a cost of performance.
   */
  @Input() set enableTooltips(value: boolean | undefined) {
    this._gridOptions.enableTooltips = value;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.enableTooltips = value;

      this.markForRefresh('enableTooltips', RefreshHintFlags.Rebuild);
    }
  }

  get enableTooltips(): boolean | undefined {
    return this._gridOptions.enableTooltips;
  }

  @Input() set selectChildren(selectChildren: boolean | undefined) {
    this._gridOptions.selectChildren = selectChildren;
    if (this.jQueryElement) {
      (this.datagrid as any).settings.selectChildren = selectChildren;
      this.markForRefresh('selectChildren', RefreshHintFlags.RenderRows);
    }
  }

  get selectChildren(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.selectChildren;
    }

    return this._gridOptions.selectChildren;
  }

  @Input() set allowChildExpandOnMatch(allowChildExpandOnMatch: boolean | undefined) {
    this._gridOptions.allowChildExpandOnMatch = allowChildExpandOnMatch;
    if (this.jQueryElement && this.datagrid) {
      this.datagrid.settings.allowChildExpandOnMatch = allowChildExpandOnMatch;
    }
  }

  get allowChildExpandOnMatch(): boolean | undefined {
    if (this.datagrid) {
      return this.datagrid.settings.allowChildExpandOnMatch;
    }

    return this._gridOptions.allowChildExpandOnMatch;
  }

  /**
   * Defines the source type of the grid, either:
   *
   * - "content-only" where table elements are provided in the body.
   * - "auto" where columns and rows are obtained for an
   *   injected service (if defined) or via the Inputs if not.
   *
   * Allow the input to be overriden, to match the component selector.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('soho-datagrid') set sohoDatagrid(datagridType: SohoDataGridType | undefined | null) {
    this.datagridType = datagridType && datagridType.toString() != '' ? datagridType : SohoDataGridComponent.AUTO;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // This event is fired when a row (or rows) are selected.
  @Output()
  selected = new EventEmitter<SohoDataGridSelectedEvent>();

  // This event is fired when a cell is changed.
  @Output()
  cellchange = new EventEmitter<SohoDataGridCellChangeEvent>();

  // This event is fired when a row is removed.
  @Output()
  rowRemove = new EventEmitter<SohoDataGridRowRemoveEvent>();

  // This event is fired when a row is added.
  @Output()
  rowAdd = new EventEmitter<SohoDataGridAddRowEvent>();

  // This event is fired when the grid is filtered.
  @Output()
  filtered = new EventEmitter<SohoDataGridFilteredEvent>();

  // This event is fired when a row in the grid is expanded.
  @Output()
  expandrow = new EventEmitter<SohoDataGridToggleRowEvent>();

  /**
   * This event is fired when a key is pressed
   *
   * @todo remove override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output()
  keydown = new EventEmitter<SohoDataGridKeyDownEvent>();

  // This event is fired when edit mode is exited.
  @Output()
  exiteditmode = new EventEmitter<SohoDataGridEditModeEvent>();

  // This event is fired before edit mode is started.
  @Output()
  beforeentereditmode = new EventEmitter<SohoDataGridEditModeEvent>();

  /**
   * This event is fired when edit mode is entered.
   */
  @Output()
  entereditmode = new EventEmitter<SohoDataGridEditModeEvent>();

  // This event is fired when a row in the grid is collapsed.
  @Output()
  collapserow = new EventEmitter<SohoDataGridToggleRowEvent>();

  @Output()
  sorted = new EventEmitter<SohoDataGridSortedEvent>();

  @Output()
  nextPage = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  previousPage = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  firstPage = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  lastPage = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  pageSizeChange = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  beforePaging = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  afterPaging = new EventEmitter<SohoPagerPagingInfo>();

  @Output()
  beforeRowActivated = new EventEmitter<SohoDataGridRowActivated>();

  @Output()
  rowActivated = new EventEmitter<SohoDataGridRowActivated>();

  @Output()
  rowDeactivated = new EventEmitter<SohoDataGridRowActivated>();

  @Output()
  rowClicked = new EventEmitter<SohoDataGridRowClicked>();

  @Output()
  rowDoubleClicked = new EventEmitter<SohoDataGridRowClicked>();

  @Output()
  contextMenu = new EventEmitter<SohoDataGridRowClicked>();

  @Output()
  rowReordered = new EventEmitter<SohoDataGridRowReorderedEvent>();

  @Output()
  openFilterRow = new EventEmitter<SohoDataGridOpenFilterRowEvent>();

  @Output()
  closeFilterRow = new EventEmitter<SohoDataGridCloseFilterRowEvent>();

  @Output()
  settingsChanged = new EventEmitter<SohoDataGridSettingsChangedEvent>();

  @Output()
  rendered = new EventEmitter<SohoDataGridRenderedEvent>();

  @Output()
  afterRender = new EventEmitter<SohoDataGridAfterRenderEvent>();

  @Output()
  verticalScroll = new EventEmitter<SohoDataGridScrollEvent>();

  @Output()
  filteroperatorchanged = new EventEmitter<SohoDataGridFilterOperatorChangedEvent>();
  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  // Set the enable / disabled class (not working)
  @HostBinding('class.is-disabled')
  isDisabled = false;

  /**
   * Sets the role for the grid.
   */
  @HostBinding('attr.role')
  get datagridRole() {
    if (this._gridOptions.treeGrid) {
      return 'treegrid';
    } else {
      return 'datagrid';
    }
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the Soho datagrid control api.
  private datagrid?: SohoDataGridStatic | null;

  // Reference to the grid's data.
  private gridData?: any[];

  // The source type for the grid.
  private datagridType?: string;

  // An internal gridOptions object that gets updated by using
  // the component's Inputs()
  private _gridOptions: SohoDataGridOptions = {
    stretchColumn: 'last',
    enableTooltips: false
  };

  // Provides hints to the component after the next refresh.
  private refreshHint: RefreshHintFlags = RefreshHintFlags.None;

  // List of option names changed (for debugging).
  private changedOptions: any[] = [];

  // List of dynamic formatter components - keyed by the original args.
  private cellComponents: any[] = [];

  // List of dynamic rowtemplate components - keyed by the original args.
  private rowTemplateComponents: any[] = [];

  /**
   * Constructor.
   *
   * @param ngZone - the angular zone for this component.
   * @param elementRef - the element matching the component's selector.
   * @param changeDetector - the component's change detector.
   * @param resolver - component factory resolver (for editors/formatters).
   * @param injector - dynamic component injector (for editors/formatters).
   * @param datagridService - service for obtaining data (optional)
   */
  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private app: ApplicationRef,
    @Optional() protected datagridService: SohoDataGridService) {

  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  getColumnGroup(idx: number): string {
    return (this.datagrid as any).getColumnGroup(idx);
  }

  getColumnById(idx: number): string {
    return (this.datagrid as any).getColumnGroup(idx);
  }

  /**
   * Overrides the sort function used by the datagrid,
   * can only be used once the grid has been created.
   *
   * @todo this should made lazy.
   */
  setSortFunction(sortFunction: SohoDataGridSortFunction): void {
    if (this.datagrid) {
      this.datagrid.sortFunction = sortFunction;
    } else {
      throw new Error('datagrid not initialized.');
    }
  }

  /**
   * Sets the column and direction to sort the dataset on.
   *
   * Can only be used once the grid has been initialised, otherwise
   * an error is thrown.
   *
   * @param columnId the id of the column to sort on; must be non-null.
   * @param ascending if true sort ascending, otherwise descending.  If not supplied the setting is toggled.
   */
  setSortColumn(columnId: string, ascending?: boolean): void {
    if (this.datagrid) {
      this.ngZone.runOutsideAngular(() => {
        (this.datagrid as any).setSortColumn(columnId, ascending);
      });
    } else {
      throw new Error('datagrid not initialized');
    }
  }

  /**
   * Used to set the sort indicator on a column when disableClientSort is set to true.
   */
  setSortIndicator(columnId: string, ascending: boolean | undefined | null): void {
    this.ngZone.runOutsideAngular(() => {
      (this.datagrid as any).setSortIndicator(columnId, ascending);
    });
  }

  pageSize(): number | undefined {
    return this.datagrid?.pagerAPI.settings.pagesize;
  }

  updatePagingInfo(pageInfo: SohoPagerPagingInfo): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.pagerAPI.updatePagingInfo(pageInfo);
    });
  }

  enable(): void {
    this.isDisabled = false;
  }

  disable(): void {
    this.isDisabled = true;
  }

  updateRow(idx: number, row: any): void {
    ArgumentHelper.checkNotNull('row', row);

    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.updateRow(idx, row);
    });
  }

  hideColumn(id: any) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.hideColumn(id);
    });
  }

  showColumn(id: any) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.showColumn(id);
    });
  }

  columnById(id: string): Array<any> {
    return (this.datagrid as any).columnById(id);
  }

  getColumns(): Array<any> {
    return (this.datagrid as any).settings.columns;
  }

  getColumnGroups(): SohoDataGridColumnGroup[] {
    return (this.datagrid as any).settings.columnGroups;
  }

  /** Get the column index from the col's id */
  columnIdxById(columnId: string): number {
    return (this.datagrid as any).columnIdxById(columnId);
  }

  getHeaderRowColumn(fld: any) {
    return (this.datagrid as any).getHeaderRowColumn(fld);
  }

  /**
   * Adds a row of data to the datagrid at the given optional location.
   *
   * @param data the row of data to add.
   * @param location the optional location, 'top' or 'bottom' or a number.
   */
  addRow(data: any, location?: 'top' | 'bottom' | number) {
    this.ngZone.runOutsideAngular(() => {
      (this.datagrid as any).addRow(data, location);
    });
  }

  /**
   * Adds multiple rows of data to the datagrid at the given optional location.
   * @param data Array of data to add.
   * @param location the optional location, 'top' or 'bottom' or a number.
   */
  addRows(data: any[], location?: 'top' | 'bottom' | number) {
    this.ngZone.runOutsideAngular(() => {
      (this.datagrid as any).addRows(data, location);
    });
  }

  /**
   * Removes a row matching the rowIndex passed in from the data and grid.
   *
   * @param rowIndex the index of the row to remove.
   */
  removeRow(rowIndex: number, noSync?: boolean, noTrigger?: boolean) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.removeRow(rowIndex, noSync, noTrigger);
    });
  }

  /**
   * Returns an array of the dirty rows in the grid.
   *
   * @return an array of the dirty rows in the grid.
   */
  dirtyRows(): Array<any> {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).dirtyRows();
    });
  }

  /**
   * Returns an array of the dirty cells in the grid.
   *
   * @return an array of the dirty cells in the grid.
   */
  dirtyCells(): Array<any> {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).dirtyCells();
    });
  }

  /**
   * Clear all dirty cells.
   */
  clearDirty(): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.clearDirty();
    });
  }

  /**
   * Commit the cell that's currently in edit mode.
   */
  commitCellEdit(): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.commitCellEdit();
    });
  }

  /**
   * Clear all dirty cells in given row.
   *
   * @param row - the row number (idx) of the row.
   */
  clearDirtyRow(row: number): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.clearDirtyRow(row);
    });
  }

  /**
   * Clear dirty on given cell.
   *
   * @param row - the row number (idx) of the row
   * @param cell - the cell number (idx) of the cell
   */
  clearDirtyCell(row: number, cell: number): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.clearDirtyCell(row, cell);
    });
  }

  /**
   * Clear all error for a given cell in a row
   *
   * @param row The row index.
   * @param cell The cell index.
   */
  clearAllCellError(row: number, cell: number): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.clearAllCellError(row, cell));
  }

  /**
   * Clear a cell with an error of a given type
   *
   * @param row The row index.
   * @param cell The cell index.
   * @param type of error.
   */
  clearCellError(row: number, cell: number, type: any): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.clearCellError(row, cell, type));
  }

  /**
   * Clear a row level all errors, alerts, info messages
   *
   * @param row The row index.
   */
  clearRowError(row: number): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.clearRowError(row));
  }

  /**
   * Clear all errors, alerts and info messages in entire datagrid.
   */
  clearAllErrors(): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.clearAllErrors());
  }

  /** Validate all rows and cells in the entire grid if they have validation on the column */
  showRowError(row: number, message: string, type: SohoAlertType): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.showRowError(row, message, type));
  }

  /** Validate all cells in a specific row */
  validateRow(row: number): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.validateRow(row));
  }

  /**
   * Set and show a message/error on the given row.
   */
  validateAll(): void {
    this.ngZone.runOutsideAngular(() => this.datagrid?.validateAll());
  }

  /**
   * Sets the status of a given row in the grid.
   *
   * @param idx - the row number (idx) of the row
   * @param status - status class name e.g. 'error'
   * @param tooltip - string value for tooltip message e.g. 'Error'
   */
  rowStatus(idx: number, status: string, tooltip: string): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.rowStatus(idx, status, tooltip);
    });
  }

  /**
   * Return an array containing all of the currently modified rows, the type of modification
   * and the cells that are dirty and the data.
   *
   * @returns An keyed object showing the dirty row info.
   */
  getModifiedRows(): SohoDataGridModifiedRows {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).getModifiedRows();
    });
  }

  /**
   * Set a cell to dirty and add the dirty icon visually.
   *
   * @param row The row index
   * @param cell The cell index
   * @param toggle True to set it and false to remove it
   * @param data Adds dirty data to the internal tracker
   */
  setDirtyIndicator(row: number, cell: number, toggle: boolean, data?: object): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.setDirtyIndicator(row, cell, toggle, data);
    });
  }

  /**
   * Removes all selected rows
   */
  removeSelected() {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.removeSelected();
    });
  }

  /**
   * Toggles the display of the filter row.
   */
  toggleFilterRow(): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.toggleFilterRow();
    });
  }

  /**
   * Accept conditions from outside or pull from filter row
   */
  applyFilter(conditions?: Array<SohoDataGridFilterCondition>): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.applyFilter(conditions);
    });
  }

  /**
   * Set the filter row from passed data / settings
   */
  setFilterConditions(conditions: Array<SohoDataGridFilterCondition>): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.setFilterConditions(conditions);
    });
  }

  /**
   * Get filter conditions in array form from the UI
   */
  filterConditions(): Array<SohoDataGridFilterCondition> {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).filterConditions();
    });
  }

  /**
   * Clears any filter defined, for this datagrid.
   */
  clearFilter(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.datagrid) {
        this.datagrid.clearFilter();
      }
    });
  }

  /**
   * Returns the rows currently selected on the data grid.
   *
   * @return an array of SohoDataGridSelectedRow instances.
   * @deprecated use selectedRows instead.
   */
  getSelectedRows(): SohoDataGridSelectedRow[] {
    return this.ngZone.runOutsideAngular(() => this.selectedRows());
  }

  /**
   * Returns the rows currently selected on the data grid.
   *
   * @return an array of SohoDataGridSelectedRow instances.
   */
  selectedRows(): SohoDataGridSelectedRow[] {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).selectedRows();
    });
  }

  /**
   * Selects all the rows in the grid.
   */
  selectAllRows() {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.selectAllRows();
    });
  }

  /**
   * Unselects all the rows in the grid.
   */
  unSelectAllRows() {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.unSelectAllRows();
    });
  }

  /**
   * Sets the selected status of the specified row in the data grid.
   *
   * @param idx - the row number (idx) of the row to select.
   * @deprecated - use selectRows instead.
   */
  selectRow(idx: number) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.selectRow(idx);
    });
  }

  /**
   * Deselects the specified row in the data grid.
   *
   * @param idx - the row number (idx) of the row to deselect.
   */
  unselectRow(idx: number) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.unselectRow(idx);
    });
  }

  /**
   * Selects a range of rows based on the provided row indexes.
   *
   * @param start - the start index
   * @param end - then end index
   */
  selectRange(start: number, end: number) {
    const range: number[] = [start, end];
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.selectRowsBetweenIndexes(range);
    });
  }

  /**
   * Set the selected rows by passing the row index or an array of row indexes
   */
  selectRows(row: number | number[]) {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.selectRows(row);
    });
  }

  /**
   * Set the status of the checkbox on the header.
   *
   * @param state 'all', 'partial' or 'all'.
   */
  public setHeaderCheckboxState(state: SohoDataGridHeaderCheckboxState) {
    const headerCheckbox = this.jQueryElement?.find('.datagrid-header').find('.datagrid-checkbox');
    if (headerCheckbox) {
      if (state === 'partial') {
        headerCheckbox.data('selected', 'partial')
          .addClass('is-checked is-partial');
      }

      if (state === 'all') {
        headerCheckbox.data('selected', 'all')
          .addClass('is-checked').removeClass('is-partial');
      }

      if (state === 'none') {
        headerCheckbox.data('selected', 'none')
          .removeClass('is-checked is-partial');
      }
    }
  }

  /**
   * Activate the row of the passed-in idx.
   * NOTE: valid only when selection mode is 'mixed'
   */
  activateRow(idx: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.activateRow(idx);
    });
  }

  /**
   * Deactivate the currently activated row.
   *
   * NOTE: valid only when selection mode is 'mixed'
   */
  deactivateRow(): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.deactivateRow();
    });
  }

  /**
   * Get the currently activated row.
   * NOTE: valid only when selection mode is 'mixed'
   */
  activatedRow(): SohoDataGridRowActivated {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).activatedRow();
    });
  }

  /**
   * Sets the active cell.
   *
   * @param idx The index of the row of the cell to set active.
   * @param idx2 The index of the cell to set active.
   */
  public setActiveCell(idx: number, idx2: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.setActiveCell(idx, idx2);
    });
  }

  /**
   * Gets the active cell info
   */
  public getActiveCell(): any {
    return this.ngZone.runOutsideAngular(() => {
      return this.datagrid?.activeCell;
    });
  }


  /**
   * Scrolls the row at <b>idx</b> into view in the view port.
   *
   * @param idx The index of the row to scroll into view.
   */
  public scrollRowIntoView(idx: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.setActiveCell(idx, 0);
    });
  }

  /**
   * Returns an array of row numbers for the rows containing the value for the specified field.
   *
   * @param fieldName The field name to search.
   * @param value The value to use in search.
   */
  findRowsByValue(fieldName: string, value: any): number[] {
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).findRowsByValue(fieldName, value);
    });
  }

  /**
   * Programmatically trigger a call to the datagrid.settings.source
   * function with the given pagerType.
   *
   * @param pagerType - a valid pager type.
   */
  triggerSource(pagerType: SohoDataGridTriggerSourcePagerType, callback?: Function): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.triggerSource(pagerType, callback);
    });
  }

  /**
   * Trigger export of grid data to Excel.
   *
   * @param fileName The prefix name to be used for the exported file.
   * @param worksheetName The name to be used for the worksheet.
   * @param customDs A datasource to override the default (deprecated)
   */
  exportToExcel(fileName: string, worksheetName?: string | undefined, customDs?: Object[]): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.exportToExcel(fileName, (worksheetName as any), (customDs as any));
    });
  }

  /**
   * Trigger export of grid data to CSV formatted file.
   *
   * @param fileName The prefix name to be used for the exported file.
   * @param customDs A datasource to override the default.
   * @param separator The separator to use in the cvs file, defaults to 'sep=,'
   * @param format if true, date and number values will be formatted based on the locale
   */
  exportToCsv(fileName: string, customDs?: Object[], separator: string = 'sep=,', format?: boolean): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.exportToCsv(fileName, (customDs as any), separator, format);
    });
  }

  /**
   * Updates the columns and columnGroups displayed on the grid.
   *
   * @param columns The datagrid columns to update.
   * @param columnGroups The column groups to update.
   */
  updateColumns(columns: SohoDataGridColumn[], columnGroups: SohoDataGridColumnGroup[]): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.updateColumns(columns, columnGroups);
    });
  }

  /**
   * Parse a JSON array with columns and return the column object.
   *
   * @param columnStr The json represntation of the column object.
   * @return  The array of columns.
   */
  columnsFromString(columns: string): Object { // @todo typings for return value
    return this.ngZone.runOutsideAngular(() => {
      return (this.datagrid as any).columnsFromString(columns);
    });
  }

  /**
   * Reset columns to their defaults (used on restore menu item).
   */
  resetColumns(): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.resetColumns();
    });
  }

  /**
   * Open the personalize dialog.
   */
  personalizeColumns(): void {
    return this.ngZone.runOutsideAngular(() => {
      this.datagrid?.personalizeColumns();
    });
  }

  /**
   * Restore the user settings from local Storage or as passed in.
   *
   * @param settings The object containing the settings to use.
   */
  restoreUserSettings(settings: any): void {
    this.ngZone.runOutsideAngular(() => {
      this.datagrid?.restoreUserSettings(settings);
    });
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handle a request to load the data for the grid from the service.
   *
   * @todo paging - not yet fully implemented?
   */
  private onDataRequest(request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) {
    // The request for data is made by the datagrid, so jump back into the angular zone ...
    this.ngZone.run(() =>
      // ... request the data from the service ...
      this.datagridService.getData(request)
        .subscribe((results: Object[]) => {
          // .. on receipt, pass the data back to the datagrid but
          // outside the angular zone.
          this.ngZone.runOutsideAngular(() => response(results, request));
        }));
  }

  /**
   * Event fired after a child row has been expanded.
   */
  private onExpandRowHandler(args: SohoDataGridRowExpandEvent) {
    const event = { grid: this, ...args };
    if (this.gridOptions.rowTemplateComponent) {
      this.buildRowTemplateComponent(event);
    }
    this.ngZone.run(() => {
      this.expandrow.next(event);
    });
  }

  /**
   * Build component for rowTemplate
   */
  private buildRowTemplateComponent(event: any) {

    if (!this.gridOptions.rowTemplateComponent) {
      return;
    }

    const componentFactory = this.resolver.resolveComponentFactory(
      this.gridOptions.rowTemplateComponent
    );

    // Remove component if it exists
    const idx = this.rowTemplateComponents.findIndex((c) => event.row === c.row);
    if (idx > -1) {
      this.rowTemplateComponents[idx].component.destroy();
      this.rowTemplateComponents.splice(idx, 1);
    }

    const containerParent = event.detail[0].querySelector('.datagrid-row-detail-padding');
    containerParent.innerHTML = '<div class="datagrid-cell-layout"></div>';
    const container = containerParent.querySelector('.datagrid-cell-layout');
    container.innerHTML = '';

    let dataComponent: any;
    if (event.item.hasOwnProperty(this.gridOptions.rowTemplateField)) {
      dataComponent = event.item[(this.gridOptions.rowTemplateField as any)];
    } else {
      dataComponent = undefined;
    }

    const injector = Injector.create({
      providers: [
        {
          provide: 'args',
          useValue: { inputsData: this.gridOptions.rowTemplateComponentInputs, data: dataComponent, ...event },
        }
      ],
      parent: this.injector,
    });

    // Create the component, in the container.
    const component = componentFactory.create(injector, [], container);
    event['rowTemplateComponent'] = component;

    // ... attach to the app ...
    this.app.attachView(component.hostView);

    // ... update for changes ...
    component.changeDetectorRef.detectChanges();

    // ... finally store the created component for later, we'll delete it when
    // requested, or when the grid is destroyed.
    this.rowTemplateComponents.push({ row: event.row, component });

  }

  /**
   * Event fired after a context menu is opened
   */
  private onKeyDownHandler(e: JQuery.Event, args: SohoDataGridKeyDownArgs, response: Function) {
    const event = { e, args, response };
    this.ngZone.run(() => {
      this.keydown.next(event);
    });

    if (e.key === 'F10' && e.shiftKey) {
      $((e as any).currentTarget).trigger('contextmenu');
    }
  }

  /**
   * Event fired after a child row has been expanded.
   *
   * @param idProperty string id
   */
  @Input() set onBeforeSelect(beforeSelectFunction: SohoDataGridBeforeSelectFunction | undefined) {
    this._gridOptions.onBeforeSelect = beforeSelectFunction;
    if (this.datagrid) {
      (this.datagrid as any).settings.onBeforeSelect = beforeSelectFunction;
      this.markForRefresh('onBeforeSelect', RefreshHintFlags.Rebuild);
    }
  }
  get onBeforeSelect(): SohoDataGridBeforeSelectFunction | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.onBeforeSelect;
    }
    return this._gridOptions.onBeforeSelect;
  }

  /**
   *  Makes it possible to save selections when changing pages on server side paging.
   *  You may want to also use showSelectAllCheckBox: false
   */
  @Input() set allowSelectAcrossPages(allowSelectAcrossPages: boolean | undefined) {
    this._gridOptions.allowSelectAcrossPages = allowSelectAcrossPages;
    if (this.datagrid) {
      this.datagrid.settings.allowSelectAcrossPages = allowSelectAcrossPages;
      this.markForRefresh('allowSelectAcrossPages', RefreshHintFlags.None);
    }
  }
  get allowSelectAcrossPages(): boolean | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.allowSelectAcrossPages;
    }
    return this._gridOptions.allowSelectAcrossPages;
  }

  /**
   *  Select all will effect only on current page and its for client side paging only.
   */
  @Input() set selectAllCurrentPage(selectAllCurrentPage: boolean | undefined) {
    this._gridOptions.selectAllCurrentPage = selectAllCurrentPage;
    if (this.datagrid) {
      this.datagrid.settings.selectAllCurrentPage = selectAllCurrentPage;
      this.markForRefresh('selectAllCurrentPage', RefreshHintFlags.None);
    }
  }
  get selectAllCurrentPage(): boolean | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.selectAllCurrentPage;
    }
    return this._gridOptions.selectAllCurrentPage;
  }

  /**
   * An array of column IDs used to define aria descriptors for selection checkboxes.
   */
  @Input() set columnIds(columnIds: Array<String | Number> | undefined) {
    this._gridOptions.columnIds = columnIds;
    if (this.datagrid) {
      this.datagrid.settings.columnIds = columnIds;
      this.markForRefresh('columnIds', RefreshHintFlags.None);
    }
  }
  get columnIds(): Array<String | Number> | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.columnIds;
    }
    return this._gridOptions.columnIds;
  }

  /**
   *If true, the new row indicator will display after adding a row
   *
   * @param showNewRowIndicator boolean show new indicator setting
   */
  @Input() set showNewRowIndicator(showNewRowIndicator: boolean | undefined) {
    this._gridOptions.showNewRowIndicator = showNewRowIndicator;
    if (this.datagrid) {
      this.datagrid.settings.showNewRowIndicator = showNewRowIndicator;
      this.markForRefresh('showNewRowIndicator', RefreshHintFlags.None);
    }
  }
  get showNewRowIndicator(): boolean | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.showNewRowIndicator;
    }
    return this._gridOptions.showNewRowIndicator;
  }

  @Input() set onExpandChildren(expandChildrenFunction: SohoDataGridExpandChildrenFunction | undefined) {
    this._gridOptions.onExpandChildren = expandChildrenFunction;
    if (this.datagrid) {
      this.datagrid.settings.onExpandChildren = expandChildrenFunction;
      this.markForRefresh('onExpandChildren', RefreshHintFlags.Rebuild);
    }
  }

  get onExpandChildren(): SohoDataGridExpandChildrenFunction | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.onExpandChildren;
    }
    return this._gridOptions.onExpandChildren;
  }

  @Input() set onCollapseChildren(collapseChildrenFunction: SohoDataGridCollapseChildrenFunction | undefined) {
    this._gridOptions.onCollapseChildren = collapseChildrenFunction;
    if (this.datagrid) {
      this.datagrid.settings.onCollapseChildren = collapseChildrenFunction;
      this.markForRefresh('onCollapseChildren', RefreshHintFlags.Rebuild);
    }
  }

  get onCollapseChildren(): SohoDataGridCollapseChildrenFunction | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.onCollapseChildren;
    }
    return this._gridOptions.onCollapseChildren;
  }

  @Input() set onPostRenderCell(onPostRenderCell: SohoDataGridPostRenderCellFunction) {
    const postRenderCell = (e: JQuery<HTMLElement>, args: SohoDataGridPostRenderCellArgs) => {
      this.onPostRenderCellHandler(e, args);
      onPostRenderCell(e, args);
    };

    this._gridOptions.onPostRenderCell = postRenderCell;

    if (this.datagrid) {
      this.datagrid.settings.onPostRenderCell = postRenderCell;
    }
  }

  @Input() set onDestroyCell(onDestroyCell: SohoDataGridPostRenderCellFunction) {
    const destroyCell = (e: JQuery<HTMLElement>, args: SohoDataGridPostRenderCellArgs) => {
      this.onDestroyCellHandler(args);
      onDestroyCell(e, args);
    };

    this._gridOptions.onDestroyCell = destroyCell;

    if (this.datagrid) {
      this.datagrid.settings.onDestroyCell = destroyCell;
    }
  }

  @Input() set onEditCell(onEditCell: SohoDataGridEditCellFunction) {
    const editCell = (editor: ExtendedSohoDataGridCellEditor) => {
      this.onEditCellHandler(editor);
      onEditCell(editor);
    };

    this._gridOptions.onEditCell = editCell;

    if (this.datagrid) {
      this.datagrid.settings.onEditCell = editCell;
    }
  }

  @Input() set onKeyDown(onKeyDown: SohoDataGridKeyDownFunction) {
    const keyDown = (e: JQuery.Event, args: SohoDataGridKeyDownArgs, response: Function) => {
      this.onKeyDownHandler(e, args, response);
      onKeyDown(e, args, response);
    };

    this._gridOptions.onKeyDown = keyDown;

    if (this.datagrid) {
      this.datagrid.settings.onKeyDown = keyDown;
    }
  }

  @Input() set onExpandRow(onExpandRow: SohoDataGridExpandRowFunction) {
    this._gridOptions.onExpandRow = onExpandRow;

    if (this.datagrid) {
      this.datagrid.settings.onExpandRow = onExpandRow;
    }
  }

  /* Icon name for fallbacks if the image does not load */
  @Input() set fallbackImage(fallbackImage: string | undefined) {
    this._gridOptions.fallbackImage = fallbackImage;
    if (this.datagrid) {
      this.datagrid.settings.fallbackImage = fallbackImage;
      this.markForRefresh('fallbackImage', RefreshHintFlags.Rebuild);
    }
  }

  get fallbackImage(): string | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.fallbackImage;
    }
    return this._gridOptions.fallbackImage;
  }

  /* Tooltip to show if it the fallback appears */
  @Input() set fallbackTooltip(fallbackTooltip: SohoFallbackTooltipOptions | undefined) {
    this._gridOptions.fallbackTooltip = fallbackTooltip;
    if (this.datagrid) {
      this.datagrid.settings.fallbackTooltip = fallbackTooltip;
      this.markForRefresh('fallbackTooltip', RefreshHintFlags.Rebuild);
    }
  }

  get fallbackTooltip(): SohoFallbackTooltipOptions | undefined {
    if (this.datagrid) {
      return (this.datagrid as any).settings.fallbackTooltip;
    }
    return this._gridOptions.fallbackTooltip;
  }

  /**
   * Event fired after edit mode is activated on an editor.
   *
   * @param args the event arguments
   */
  private onExitEditMode(args: SohoDataGridEditModeEvent) {
    const event = { grid: this, ...args };
    this.ngZone.run(() => {
      this.exiteditmode.next(event);
    });
  }

  /**
   * Event fired before edit mode is activated on an editor.
   *
   * @param args the event arguments
   */
  private onBeforeEnterEditMode(args: SohoDataGridEditModeEvent) {
    const event = { grid: this, ...args };
    this.ngZone.run(() => {
      this.beforeentereditmode.next(event);
    });
  }

  /**
   * Event fired when edit mode is activated on an editor.
   *
   * @param args the event arguments
   */
  private onEnterEditMode(args: SohoDataGridEditModeEvent) {
    const event = { grid: this, ...args };
    this.ngZone.run(() => {
      this.entereditmode.next(event);
    });
  }

  /**
   * Event fired after a child row has been collapsed.
   */
  private onCollapseRow(args: SohoDataGridRowCollapseEvent) {
    const event = { grid: this, ...args };
    this.ngZone.run(() => {
      this.collapserow.next(event);
    });
  }

  /**
   * Event fired when a row has been added.
   */
  private onRowAdd(args: SohoDataGridAddRowEvent) {
    this.ngZone.run(() => {
      this.rowAdd.next(args);
    });
  }

  /**
   * Event fired when a cell has changed.
   */
  private onCellChange(args: SohoDataGridCellChangeEvent) {
    this.ngZone.run(() => {
      this.cellchange.next(args);
    });
  }

  /**
   * Event fired when a row has been clicked.
   */
  private onRowClicked(args: SohoDataGridRowClicked) {
    this.ngZone.run(() => {
      this.rowClicked.next(args);
    });
  }

  /**
   * Event fired when the filter row is closed.
   */
  private onCloseFilterRow(args: SohoDataGridCloseFilterRowEvent) {
    this.ngZone.run(() => {
      this.closeFilterRow.next(args);
    });
  }

  /**
   * Event fired when a context menu is is clicked.
   */
  private onContextMenu(args: SohoDataGridRowClicked) {
    this.ngZone.run(() => {
      this.contextMenu?.next(args);
    });
  }

  /**
   * Event fired when a context menu is is clicked.
   */
  private onDoubleClick(args: SohoDataGridRowClicked) {
    this.ngZone.run(() => {
      this.rowDoubleClicked.next(args);
    });
  }

  /**
   * Event fired when the data is filtered.
   */
  private onFiltered(args: SohoDataGridFilteredEvent) {
    this.ngZone.run(() => {
      this.filtered.next(args);
    });
  }

  /**
   * Event fired when filter row opened.
   */
  private onOpenFilterRow(args: SohoDataGridOpenFilterRowEvent) {
    this.ngZone.run(() => {
      this.openFilterRow.next(args);
    });
  }

  /**
   * Event fired when a row is removed.
   */
  private onRowRemove(args: SohoDataGridRowRemoveEvent) {
    this.ngZone.run(() => {
      this.rowRemove.next(args);
    });
  }

  /**
   * Event fired when the data is rendered
   */
  private onRendered(args: SohoDataGridRenderedEvent) {
    this.ngZone.run(() => {
      this.rendered.next(args);
    });
  }

  /**
   * Event fired when the data is filtered.
   */
  private onAfterRender(args: SohoDataGridAfterRenderEvent) {
    this.ngZone.run(() => {
      this.afterRender.next(args);
    });
  }

  /**
   * Event fired before a row is activated.
   */
  private onBeforeRowActivated(args: SohoDataGridRowActivatedEvent) {
    this.ngZone.run(() => {
      this.beforeRowActivated.next(args);
    });
  }

  /**
   * Event fired when a row is activated.
   */
  private onRowActivated(args: SohoDataGridRowActivatedEvent) {
    this.ngZone.run(() => {
      this.rowActivated.next(args);
    });
  }

  /**
   * Event fired when a row is deactivated.
   */
  private onRowDeactivated(args: SohoDataGridRowDeactivatedEvent) {
    this.ngZone.run(() => {
      this.rowDeactivated.next(args);
    });
  }

  /**
   * Event fired when a row is reordered.
   */
  private onRowReordered(args: SohoDataGridRowReorderedEvent) {
    this.ngZone.run(() => {
      this.rowReordered.next(args);
    });
  }

  /**
   * Event fired when a row is selected or deselected.
   */
  private onSelected(args: SohoDataGridSelectedEvent) {
    this.ngZone.run(() => {
      this.selected.next(args);
    });
  }

  /**
   * Event fired when settings are changed on the grid.
   */
  private onSettingsChanged(args: SohoDataGridSettingsChangedEvent) {
    this.ngZone.run(() => {
      this.settingsChanged.next(args);
    });
  }

  /**
   * Event fired when the data is sorted.
   */
  private onSorted(args: SohoDataGridSortedEvent) {
    this.ngZone.run(() => {
      this.sorted.next(args);
    });
  }

  /**
   * Event fired when using built-in pager to next page.
   */
  private onNextPage(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.nextPage.next(args);
    });
  }

  /**
     * Event fired when using built-in pager to previous page.
     */
  private onPreviousPage(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.previousPage.next(args);
    });
  }

  /**
     * Event fired when using built-in pager to first page.
     */
  private onFirstPage(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.firstPage.next(args);
    });
  }

  /**
     * Event fired when using built-in pager to last page.
     */
  private onLastPage(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.lastPage.next(args);
    });
  }

  /**
   * Event fired on paging size change
   */
  private onPageSizeChange(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.pageSizeChange.next(args);
    });
  }

  /**
   * Event fired before paging
   */
  private onBeforePaging(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.beforePaging.next(args);
    });
  }

  /**
   * Event fired after paging
   */
  private onAfterPaging(args: SohoPagerPagingInfo) {
    this.ngZone.run(() => {
      this.afterPaging.next(args);
    });
  }

  /**
   * Event fired after vertical scroll
   */
  private onVerticalScroll(args: SohoDataGridScrollEvent) {
    this.ngZone.run(() => {
      this.verticalScroll.next(args);
    })
  }

  /**
   * Event fired after vertical scroll
   */
  private onFilterOperatorChanged(args: SohoDataGridFilterOperatorChangedEvent) {
    this.ngZone.run(() => {
      this.filteroperatorchanged.next(args);
    })
  }

  /**
   * Returns the row dom jQuery node.
   *
   * @param  row The row index.
   * @param  includeGroups If true groups are taken into account.
   * @return The dom jQuery node
   */
  rowNode(row: number, includeGroups: boolean): any {
    return this.ngZone.runOutsideAngular(() => {
      return this.datagrid?.rowNode(row, includeGroups);
    });
  }

  /**
   * Returns the cell dom node.
   *
   * @param  row The row index.
   * @param  cell The cell index.
   * @param  includeGroups If true groups are taken into account.
   * @return The dom node
   */
  cellNode(row: number, cell: number, includeGroups: boolean): any {
    return this.ngZone.runOutsideAngular(() => {
      return this.datagrid?.cellNode(row, cell, includeGroups);
    });
  }

  /**
   * Expand Detail Row Or Tree Row
   * @param {number} dataRowIndex The row to toggle
   */
  toggleRowDetail(dataRowIndex: number): void {
    return this.ngZone.runOutsideAngular(() => {
      return this.datagrid?.toggleRowDetail(dataRowIndex);
    });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  /**
   * Initialize the component after Angular initializes the data-bound input properties.
   */
  ngOnInit() {
    this.updateSource(this._gridOptions.source);
  }

  /**
   * Called after Angular projects external content into its view.
   */
  ngAfterViewInit() {
    // Once the view is created and ready, initiaise the data grid component.
    this.buildDataGrid();
  }

  /**
   *
   */
  ngAfterViewChecked() {
    if (this.refreshHint !== RefreshHintFlags.None) {
      this.updated(this._gridOptions)
    }
  }

  /**
   * Cleanup just before Angular destroys the component.
   *
   * Unsubscribe observables, detach event handlers and remove other resources to avoid memory leaks.
   */
  ngOnDestroy() {
    this.destroyDataGrid();
  }

  // -------------------------------------------
  // Private Members
  // -------------------------------------------

  /**
   * Destroys the jQuery control (and any other resources)
   * associated with this component.
   */
  private destroyDataGrid(): void {
    // Remove any remaining dynamic components.
    this.cellComponents.forEach((c) => {
      c.component.destroy();
    });

    // Clear the cache.
    this.cellComponents = [];

    // Remove rowTemplate dynamic components.
    if (this.rowTemplateComponents && this.rowTemplateComponents.length > 0) {
      this.rowTemplateComponents.forEach((c) => {
        c.component.destroy();
      });
      this.rowTemplateComponents = [];
    }

    // Now destroy the grid.
    if (this.datagrid) {
      if (this.datagrid.destroy) {
        this.ngZone.runOutsideAngular(() => {
          this.datagrid?.destroy();
        });
      }
      this.datagrid = null;
    }
  }

  /**
   * Handles the 'postCellRender' event.
   *
   * @param container the container to host the element.
   * @param args the formatter arguments.
   */
  private onPostRenderCellHandler(container: JQuery, args: SohoDataGridPostRenderCellArgs) {
    // Pre-conditions
    if (!args.col.component) {
      return; // throw Error(`Missing 'component' in column ${args.col.id}`);
    }
    // Get the factory for the component specified on the column.
    const factory = this.resolver.resolveComponentFactory(args.col.component);

    // Create an injector that will provide the arguments for the
    // component.
    // const injector = ReflectiveInjector.resolveAndCreate([{ provide: 'args', useValue: args }], this.injector);
    const injector = Injector.create({ providers: [{ provide: 'args', useValue: args }], parent: this.injector });

    // Create the component, in the container.
    const component = factory.create(injector, [], container);

    // Copy into it any column level Inputs, these are optional but allow
    // column specific overrides to be defined.
    Object.assign((component as any).instance, args.col.componentInputs);

    // ... attach to the app ...
    this.app.attachView(component.hostView);

    // ... update for changes ...
    component.changeDetectorRef.detectChanges();

    // Do this at the end?

    // ... finally store the created component for later, we'll delete it when
    // requested, or when the grid is destroyed.
    this.cellComponents.push(
      { row: args.row, cell: args.cell, component }
    );
  }

  /**
   * Handles the 'destroyCell' event.
   *
   * @param container the container.
   * @param args the args
   */
  private onDestroyCellHandler(args: SohoDataGridPostRenderCellArgs) {
    const idx = this.cellComponents.findIndex((c) => args.row === c.row && args.cell === c.cell);
    if (idx > -1) {
      this.cellComponents[idx].component.destroy();
      this.cellComponents.splice(idx, 1);
    }
  }

  private onEditCellHandler(editor: ExtendedSohoDataGridCellEditor) {
    // Pre-conditions
    if (!editor.component) {
      return; // throw Error(`Missing 'component' in column ${args.col.id}`);
    }
    // Get the factory for the component specified on the column.
    const factory = this.resolver.resolveComponentFactory(editor.component);

    // Create an injector that will provide the arguments for the
    // component.
    // const i = ReflectiveInjector.resolveAndCreate([{ provide: 'args', useValue: editor.args }], this.injector);
    const i = Injector.create({
      providers: [{ provide: 'args', useValue: editor.args }],
      parent: this.injector
    });

    // Warning!! the dynamic component is not added inside the container,
    // but as a sibling, so when it's destroyed it takes any siblings  with
    // it.  It is not clear why this - so to work around this issue, add
    // a single child to the cell container.
    const transientContainer = $('<div></div>').appendTo(editor.args.container);

    // Create the component, in the container.
    const componentRef = factory.create(i, [], transientContainer[0]) as ComponentRef<SohoDataGridCellEditor>;

    // Copy into it any column level Inputs, these are optional but allow
    // column specific overrides to be defined.
    Object.assign(componentRef.instance, editor.args.col.editorComponentInputs);

    // ... attach to the app ...
    this.app.attachView(componentRef.hostView);

    // ... update for changes ...
    componentRef.changeDetectorRef.detectChanges();

    // Give the component to the editor.
    editor.init(componentRef);
  }

  private buildDataGrid(): void {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Add the onPostCellRenderer
      if (!this._gridOptions.onPostRenderCell) {
        this._gridOptions.onPostRenderCell = (c, args: SohoDataGridPostRenderCellArgs) => {
          this.onPostRenderCellHandler(c, args);
        };
      }

      // Add the destroy cell callback.
      if (!this._gridOptions.onDestroyCell) {
        this._gridOptions.onDestroyCell = (_, args: SohoDataGridPostRenderCellArgs) => {
          this.onDestroyCellHandler(args);
        };
      }

      // Add the edit cell callback.
      if (!this._gridOptions.onEditCell) {
        this._gridOptions.onEditCell = (editor: ExtendedSohoDataGridCellEditor) => {
          this.onEditCellHandler(editor);
        };
      }

      // Add the keydown callback.
      if (!this._gridOptions.onKeyDown) {
        this._gridOptions.onKeyDown = (e: JQuery.Event, args: SohoDataGridKeyDownArgs, response: Function) => {
          this.onKeyDownHandler(e, args, response);
        };
      }

      // Initialise any event handlers.
      this.jQueryElement
        .on('addrow', (_e: any, args: SohoDataGridAddRowEvent) => this.onRowAdd(args))
        .on('cellchange', (_e: any, args: SohoDataGridCellChangeEvent) => this.onCellChange(args))
        .on('click', (_e: any, args: SohoDataGridRowClicked) => this.onRowClicked(args))
        .on('closefilterrow', (_e: any, args: SohoDataGridCloseFilterRowEvent) => this.onCloseFilterRow(args))
        .on('collapserow', (_e: any, args: SohoDataGridRowCollapseEvent) => this.onCollapseRow(args))
        .on('contextmenu', (_e: any, args: SohoDataGridRowClicked) => this.onContextMenu(args))
        .on('dblclick', (_e: JQuery.TriggeredEvent, args: SohoDataGridRowClicked) => this.onDoubleClick(args))
        .on('beforeentereditmode', (_e: any, args: SohoDataGridEditModeEvent) => this.onBeforeEnterEditMode(args))
        .on('exiteditmode', (_e: any, args: SohoDataGridEditModeEvent) => this.onExitEditMode(args))
        .on('entereditmode', (_e: any, args: SohoDataGridEditModeEvent) => this.onEnterEditMode(args))
        .on('expandrow', (_e: any, args: SohoDataGridRowExpandEvent) => this.onExpandRowHandler(args))
        .on('filtered', (_e: any, args: SohoDataGridFilteredEvent) => this.onFiltered(args))
        .on('openfilterrow', (_e: any, args: SohoDataGridOpenFilterRowEvent) => this.onOpenFilterRow(args))
        .on('rowremove', (_e: any, args: SohoDataGridRowRemoveEvent) => this.onRowRemove(args))
        .on('rendered', (_e: any, args: SohoDataGridRenderedEvent) => this.onRendered(args))
        .on('afterrender', (_e: any, args: SohoDataGridAfterRenderEvent) => this.onAfterRender(args))
        .on('beforerowactivated', (_e: any, args: SohoDataGridRowActivatedEvent) => this.onBeforeRowActivated(args))
        .on('rowactivated', (_e: any, args: SohoDataGridRowActivatedEvent) => this.onRowActivated(args))
        .on('rowdeactivated', (_e: any, args: SohoDataGridRowDeactivatedEvent) => this.onRowDeactivated(args))
        .on('rowreorder', (_e: any, args: SohoDataGridRowReorderedEvent) => this.onRowReordered(args))
        .on('selected',
          (e: any, args: SohoDataGridSelectedRow[], type?: SohoDataGridSelectedEventType, rowData?: SohoDataGridSelectedRow[] | SohoDataGridSelectedRow) =>
            this.onSelected({ e, rows: args, type, rowData }))
        .on('settingschanged', (_e: any, args: SohoDataGridSettingsChangedEvent) => this.onSettingsChanged(args))
        .on('sorted', (_e: any, args: SohoDataGridSortedEvent) => this.onSorted(args))
        .on('beforepaging', (_e: any, args: SohoPagerPagingInfo) => this.onBeforePaging(args))
        .on('afterpaging', (_e: any, args: SohoPagerPagingInfo) => this.onAfterPaging(args))
        .on('scroll', (_e: any, args: SohoDataGridScrollEvent) => this.onVerticalScroll(args))
        .on('filteroperatorchanged', (_e: any, args: SohoDataGridFilterOperatorChangedEvent) => this.onFilterOperatorChanged(args))
        .on('nextpage', (_e: any, args: SohoPagerPagingInfo) => this.onNextPage(args))
        .on('previouspage', (_e: any, args: SohoPagerPagingInfo) => this.onPreviousPage(args))
        .on('firstpage', (_e: any, args: SohoPagerPagingInfo) => this.onFirstPage(args))
        .on('lastpage', (_e: any, args: SohoPagerPagingInfo) => this.onLastPage(args))
        .on('pagesizechange', (_e: any, args: SohoPagerPagingInfo) => this.onPageSizeChange(args))
    });

    // Initialise the SohoXi control.
    this.jQueryElement?.datagrid(this._gridOptions);
    this.jQueryElement?.removeAttr('role');

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'datagrid'.
    this.datagrid = this.jQueryElement?.data('datagrid');

    // If "auto" and there's a service, get the columns from it.
    // (may want to check if columns have already been set? Error?)
    if (this.datagridType === SohoDataGridComponent.AUTO && this.datagridService) {
      // Bootstrap from service, note this is not async.
      this.columns = this.datagridService.getColumns();
      // Once the columns are set, request the data (paging?)
      this.datagridService.getData(null)
        .subscribe((data: any[]) => {
          this.ngZone.runOutsideAngular(() => {
            this.datagrid?.loadData(data);
          });
        });
    } else if (this.gridData) {
      // Not using a service, so use the pre-loaded data.
      this.ngZone.runOutsideAngular(() => {
        this.datagrid?.loadData((this.gridData as any));
      });
    }
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   *
   * @todo possible add hints? Rebuild, Update, SetOption
   *
   * @param optionName - the option that was updated, (allowing specific handling)
   * @param hint - the type of refresh required, update?.
   */
  private markForRefresh(optionName: string, hint: RefreshHintFlags) {

    // Merge in the hint.
    this.refreshHint |= hint; // eslint-disable-line

    // ... so we can use it later
    this.changedOptions.push(optionName);

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.changeDetector.markForCheck();
  }

  /**
   * Stop gap method to update the current datagrid and rebuild it again.
   *
   * This is required whilst there is no method found that can update the view
   * for a particular input.
   */
  public updated(settings?: SohoDataGridOptions) {
    if (settings) {
      this._gridOptions = Soho.utils.mergeSettings((this.elementRef as any)[0], settings, this._gridOptions);
    }

    this.ngZone.runOutsideAngular(() => {
      if (!this.refreshHint) {
        this.datagrid?.updated(this._gridOptions);
      } else if (settings && this.refreshHint & RefreshHintFlags.Rebuild) {
        this.datagrid?.updated(this._gridOptions);
      } else if (this.refreshHint & RefreshHintFlags.Rebuild) {
        this.datagrid?.renderHeader();
        this.datagrid?.renderRows();
      } else if (this.refreshHint & RefreshHintFlags.RenderHeader) { // eslint-disable-line
        this.datagrid?.renderHeader();
      } else if (this.refreshHint & RefreshHintFlags.RenderRows) { // eslint-disable-line
        this.datagrid?.renderRows();
      }
    });
    // Reset the flags.
    this.refreshHint = RefreshHintFlags.None;
    this.changedOptions = [];
  }

  /**
   * Updates the source setting/function to use source input if set.
   * Otherwise use dataGridService if that is set.
   *
   * @param source the function
   */
  private updateSource(source: SohoDataGridSourceFunction | undefined): void {
    // If a source property has not been defined, and a service has
    // use the data service to load the data dynamically for paging.
    if (!source && this.datagridService) {
      this._gridOptions.source = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
        this.onDataRequest(request, response);
      };
    } else if (source && typeof source === 'function') {
      this._gridOptions.source = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
        this.ngZone.run(() => source(request, response));
      };
    }
  }

  private checkForComponentEditors() {
    // Add an adapter for all the columns using an component as an editor.
    (this._gridOptions as any).columns.forEach((c: any) => {
      if (c.editorComponent) {
        // Use a `function expression` rather than an `arrow function` as the editor is used
        // as constructor.
        // teslint-disable-next-line max-len
        c.editor = function (row?: any, cell?: any, value?: any, container?: JQuery, col?: SohoDataGridColumn | undefined, e?: any, api?: any, item?: any) {
          // @ts-ignore
          return new SohoAngularEditorAdapter(c.editorComponent, { row, cell, value, container: (container as any)[0], col, e, api, item });
        };
      }
    });
  }

  private checkForSummaryRowSettings() {
    if (!this._gridOptions.summaryRowColumns || this._gridOptions.summaryRowColumns.length === 0) {
      (this._gridOptions as any).columns.forEach((c: any) => {
        c.summaryRowFormatter = undefined;
        c.summaryText = undefined;
        c.aggregator = undefined;
        c.summaryTextPlacement = undefined;
      });
    } else {
      this._gridOptions.summaryRowColumns.forEach((sc) => {
        const column = (this._gridOptions as any).columns.find((c: any) => c.field === sc.field);
        (column as any).summaryRowFormatter = sc.summaryRowFormatter;
        (column as any).summaryText = sc.summaryText;
        (column as any).aggregator = sc.aggregator;
        (column as any).summaryTextPlacement = sc.summaryTextPlacement;
      });
    }
  }

}

/**
 * Details of the 'expandrow' and 'collapserow' events.
 */
export interface SohoDataGridToggleRowEvent extends SohoDataGridRowExpandEvent {
  // The data grid component originating the call.
  grid: SohoDataGridComponent;
  args?: any;
}

/**
 * Details of the 'keydown' event
 */
export interface SohoDataGridKeyDownEvent {
  // The data grid component originating the call.
  e: JQuery.Event;
  args?: SohoDataGridKeyDownArgs;
  response?: Function;
}
