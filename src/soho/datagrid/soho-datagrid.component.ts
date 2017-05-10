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
  OnDestroy
} from '@angular/core';

import { ArgumentHelper } from '../utils';

import { SohoDataGridService } from './soho-datagrid.service';

export type SohoDataGridType = 'auto' | 'content-only';

/**
 * Internal refresh hints used to determine what type of "refresh" is
 * required after the change detection process has completed and the
 * AfterViewChecked method is called.
 */
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
  selector: '[soho-datagrid]', // tslint:disable-line
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

  // 'content-only' where table elements are usedto define the
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
    if (this.jQueryElement) {
      // No need to set the 'settings' as the Rebuild will create
      // a new control with the _gridOptions.
      this.markForRefresh('gridOptions', RefreshHintFlags.Rebuild);
    }
  }
  get gridOptions(): SohoDataGridOptions {
      return this._gridOptions;
  }

  /**
   * Defines which property in the data rows is to be used as the id of each
   * row of the data.
   *
   * @param idProperty string id
   */
  @Input() set idProperty(idProperty: string) {
    this._gridOptions.idProperty = idProperty;
    if (this.datagrid) {
      this.datagrid.settings.idProperty = idProperty;
      this.markForRefresh('idProperty', RefreshHintFlags.Rebuild);
    }
  }

  get idProperty(): string {
    return this._gridOptions.idProperty;
  }

  /**
   *
   * @param cellNavigation
   */
  @Input() set cellNavigation(cellNavigation: boolean) {
    this._gridOptions.cellNavigation = cellNavigation;
    if (this.jQueryElement) {
      this.datagrid.settings.cellNavigation = cellNavigation;
      this.markForRefresh('cellNavigation', RefreshHintFlags.RenderRows);
    }
  }

  get cellNavigation(): boolean {
    return this._gridOptions.cellNavigation;
  }

  /**
   * Changes the row navigation setting of the data grid. If rowNavigation
   * is "false” then a border is not displayed around the row.
   *
   * Defaults to true.
   *
   * @param rowlNavigation i "false” then grid will NOT show a border around the row.
   */
  @Input() set rowNavigation(rowNavigation: boolean) {
    this._gridOptions.rowNavigation = rowNavigation;
    if (this.jQueryElement) {
      this.datagrid.settings.rowNavigation = rowNavigation;
      this.markForRefresh('rowNavigation', RefreshHintFlags.RenderRows);
    }
  }

  get rowNavigation(): boolean {
    return this._gridOptions.rowNavigation;
  }

  /**
   *
   * @param alternateRowShading
   */
  @Input() set alternateRowShading(alternateRowShading: boolean) {
    this._gridOptions.alternateRowShading = alternateRowShading;
    if (this.jQueryElement) {
      this.datagrid.settings.alternateRowShading = alternateRowShading;
      this.markForRefresh('alternateRowShading', RefreshHintFlags.RenderRows);
    }
  }

  get alternateRowShading(): boolean {
    return this._gridOptions.alternateRowShading;
  }

  /**
   * The data to be displayed provided as an array
   * of json objects compatible with the column meta
   * data provided.
   *
   * @param dataset - array of json objects
   */
  @Input() set dataset(dataset: Array<any>) {
    this._gridOptions.dataset = dataset;
    if (this.jQueryElement) {
      this.datagrid.settings.dataset = dataset;

      // @todo do we need hints as this may be bundled up with other changes.
      this.datagrid.updateDataset(dataset);
    }
  }

  /**
   * Return the dataset currently displayed by the datagrid.
   *
   * @return an array of objects.
   */
  get dataset(): any[] {

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
   *
   * @param columnReorder
   */
  @Input() set columnReorder(columnReorder: boolean) {
    this._gridOptions.columnReorder = columnReorder;
    if (this.datagrid) {
      this.datagrid.settings.columnReorder = columnReorder;
      this.markForRefresh('columnReorder', RefreshHintFlags.RenderHeader);
    }
  }

  get columnReorder(): boolean {
    return this._gridOptions.columnReorder;
  }

  /**
   *
   * @param editable
   */
  @Input() set editable(editable: boolean) {
    this._gridOptions.editable = editable;
    if (this.datagrid) {
      this.datagrid.settings.editable = editable;
      this.markForRefresh('editable', RefreshHintFlags.Rebuild);
    }
  }

  get editable(): boolean {
    return this._gridOptions.editable;
  }

  /**
   *
   * @param isList
   */
  @Input() set isList(isList: boolean) {
    this._gridOptions.isList = isList;
    if (this.jQueryElement) {
      this.datagrid.settings.isList = isList;

      // causes new isLsit rows to be appended to the current view
      // this.datagrid.render();

      // doesn't seem to update the view at all.
      // this.datagrid.renderRows();
      // this.datagrid.renderHeader();

      // calling rebuild as a brute force way of udpating the view.
      this.markForRefresh('isList', RefreshHintFlags.Rebuild);
    }
  }

  get isList(): boolean {
    return this._gridOptions.isList;
  }

  /**
   *
   * @param menuId
   */
  @Input() set menuId(menuId: any) {
    this._gridOptions.menuId = menuId;
    if (this.jQueryElement) {
      this.datagrid.settings.menuId = menuId;
      this.markForRefresh('menuId', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Set's the row height for the grid, to be one of the supported options.
   *
   * @param rowHeight - 'normal' | 'medium' | 'short'
   */
  @Input() set rowHeight(rowHeight: SohoDataGridRowHeight) {
    this._gridOptions.rowHeight = rowHeight;
    if (this.jQueryElement) {
      this.datagrid.settings.rowHeight = rowHeight;

      // @todo add hints as this may be bundled up with other changes.
      this.datagrid.rowHeight(rowHeight);
    }
  }

  /**
   * Whether selection is enabled.
   *
   * @param selectable valid values are: 'multiple', 'single', 'mixed', and false.
   */
  @Input() set selectable(selectable: any) {
    this._gridOptions.selectable = selectable;
    if (this.jQueryElement) {
      // Just changing the datagrid.settings.selectable updates the datagrid view.
      this.datagrid.settings.selectable = selectable;
      this.markForRefresh('selectable', RefreshHintFlags.RenderRows);
    }
  }

  get selectable(): any {
    return this._gridOptions.selectable;
  }

  /**
   *
   * @param clickToSelect
   */
  @Input() set clickToSelect(clickToSelect: boolean) {
    this._gridOptions.clickToSelect = clickToSelect;
    if (this.jQueryElement) {
      this.datagrid.settings.clickToSelect = clickToSelect;
      this.markForRefresh('clickToSelect', RefreshHintFlags.RenderRows);
    }
  }

  get clickToSelect(): boolean {
    return this._gridOptions.clickToSelect;
  }

  /**
   *
   * @param toolbar
   */
  @Input() set toolbar(toolbar: SohoToolbarOptions) {
    this._gridOptions.toolbar = toolbar;
    if (this.jQueryElement) {
      this.datagrid.settings.toolbar = toolbar;
      this.markForRefresh('toolbar', RefreshHintFlags.Rebuild);
    }
  }

  /**
   *
   * @param paging
   */
  @Input() set paging(paging: boolean) {
    this._gridOptions.paging = paging;
    if (this.jQueryElement) {
      this.datagrid.settings.paging = paging;

      // todo: update soho data grids view - this.updatePagingInfo()?
      this.markForRefresh('paging', RefreshHintFlags.Rebuild);
    }
  }
  get paging(): boolean {
    return this._gridOptions.paging;
  }

  /**
   *
   * @param pagesize
   */
  @Input() set pagesize(pagesize: number) {
    this._gridOptions.pagesize = pagesize;
    if (this.jQueryElement) {
      this.datagrid.settings.pagesize = pagesize;
      this.markForRefresh('pagesize', RefreshHintFlags.Rebuild);
    }
  }

  /**
   *
   * @param pagesizes
   */
  @Input() set pagesizes(pagesizes: Array<number>) {
    this._gridOptions.pagesizes = pagesizes;
    if (this.jQueryElement) {
      this.datagrid.settings.pagesizes = pagesizes;
      this.markForRefresh('pagesizes', RefreshHintFlags.Rebuild);
    }
  }

  /**
   *
   * @param indeterminate
   */
  @Input() set indeterminate(indeterminate: boolean) {
    this._gridOptions.indeterminate = indeterminate;
    if (this.jQueryElement) {
      this.datagrid.settings.indeterminate = indeterminate;
      this.markForRefresh('indeterminate', RefreshHintFlags.Rebuild);
    }
  }

  /**
   *
   * @param actionableMode
   */
  @Input() set actionableMode(actionableMode: boolean) {
    this._gridOptions.actionableMode = actionableMode;
    if (this.jQueryElement) {
      this.datagrid.settings.actionableMode = actionableMode;
      this.markForRefresh('actionableMode', RefreshHintFlags.Rebuild);
    }
  }

  get actionableMode(): boolean {
    return this._gridOptions.actionableMode;
  }

  /**
   *
   * @param saveColumns
   */
  @Input() set saveColumns(saveColumns: boolean) {
    this._gridOptions.saveColumns = saveColumns;
    if (this.jQueryElement) {
      this.datagrid.settings.saveColumns = saveColumns;
      this.markForRefresh('saveColumns', RefreshHintFlags.Rebuild);
    }
  }

  /**
   *
   * @param source
   */
  @Input() set source(source: any) {
    this.updateSource(source);
    if (this.jQueryElement) {
      this.datagrid.settings.source = source;
      this.markForRefresh('source', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * Enables or disables the filter bar on the grid.
   *
   * @param filterable if true, the filter bar is displayed; otherwise no filter bar is displayed.
   */
  @Input() set filterable(filterable: boolean) {
    this._gridOptions.filterable = filterable;
    if (this.jQueryElement) {
      this.datagrid.settings.filterable = filterable;
      this.markForRefresh('filterable', RefreshHintFlags.Rebuild);
    }
  }
  get filterable(): boolean {
    return this._gridOptions.filterable;
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
  @Input() set treeGrid(treeGrid: boolean) {
    if (treeGrid !== this._gridOptions.treeGrid) {
      this._gridOptions.treeGrid = treeGrid;

      // If the jQuery control has been initialised, update it.
      if (this.jQueryElement) {
        this.datagrid.settings.treeGrid = treeGrid;
        this.markForRefresh('treeGrid', RefreshHintFlags.Rebuild);
      }
    }
  }

  get treeGrid(): boolean {
    return this._gridOptions.treeGrid;
  }

  /**
   * Returns the unqiue identifier; which may be undefined.
   */
  get uniqueId(): string {
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
  @Input() set uniqueId(uniqueId: string) {
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
  get rowReorder(): boolean {
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
  @Input() set rowReorder(value: boolean) {
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
  get showDirty(): boolean {
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
  @Input() set showDirty(value: boolean) {
    this._gridOptions.showDirty = value;
    if (this.datagrid) {
      this.datagrid.settings.showDirty = value;

      // Force all a full rebuild of the control.
      this.markForRefresh('showDirty', RefreshHintFlags.Rebuild);
    }
  }

  /**
   * The value of the virtualized flag - returns the requested value if the control has not been created yet.
   */
  // get virtualized(): boolean {
  //   if (this.datagrid) {
  //     return this.datagrid.settings.virtualized;
  //   }

  //   // ... we've been called before the component has completed
  //   // initialisation, so return the current value from the
  //   // options.
  //   return this._gridOptions.virtualized;
  // }

  // /**
  //  * Sets the virtualized flag - will force a grid rebuild if the component has already been
  //  * created.
  //  *
  //  * @param virtualized - if true then the grid will be virtualized; otherwise it will not.
  //  */
  // @Input() set virtualized(value: boolean) {
  //   this._gridOptions.virtualized = value;
  //   if (this.datagrid) {
  //     this.datagrid.settings.virtualized = value;

  //     // Force all a full rebuild of the control.
  //     this.markForRefresh('virtualized', RefreshHintFlags.Rebuild);
  //   }
  // }

  /**
   * The value of the virtualRowBuffer option - returns the requested value if the control has not been created yet.
   */
  // get virtualRowBuffer(): number {
  //   if (this.datagrid) {
  //     return this.datagrid.settings.virtualRowBuffer;
  //   } else {
  //     return this._gridOptions.virtualRowBuffer;
  //   }
  // }

  // /**
  //  * Sets the virtualRowBuffer number - will force a grid rebuild
  //  * if the component has already been created.
  //  *
  //  * @param virtualRowBuffer - how many extra rows top and bottom to allow as a buffer.
  //  */
  // @Input() set virtualRowBuffer(value: number) {
  //   this._gridOptions.virtualRowBuffer = value;
  //   if (this.datagrid) {
  //     this.datagrid.settings.virtualRowBuffer = value;

  //     // Force all a full rebuild of the control.
  //     this.markForRefresh('virtualRowBuffer', RefreshHintFlags.Rebuild);
  //   }
  // }

  /**
   * The value of the groupable option - returns the requested
   * value if the control has not been created yet.
   */
  get groupable(): SohoDataGridGroupable {
    if (this.datagrid) {
      return this.datagrid.settings.groupable;
    } else {
      return this._gridOptions.groupable;
    }
  }

  /**
   * Sets the groupable settings - will force a grid rebuild if the component has already been
   * created.
   *
   * @param groupable - the groupable settings.
   */
  @Input() set groupable(value: SohoDataGridGroupable) {
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
  @Input() set data(data: any[]) {
    this.gridData = data;
    if (data && this.jQueryElement) {

      // @todo add hints for this too, as other changes may force a rebuild?
      this.datagrid.loadData(data);
    }
  }

  /**
   * The array of columns to display in the grid.
   *
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */
  @Input() set columns(columns: SohoDataGridColumn[]) {
    this._gridOptions.columns = columns || [];
    if (columns && this.jQueryElement) {

      // @todo add hints for this too, as other changes may force a rebuild?
      this.datagrid.updateColumns(columns);
    }
  }

  /**
   * Defines the source type of the grid, either:
   *
   * - "content-only" where table elements are provided in the body.
   * - "auto" where columns and rows are obtained for an
   *   injected service (if defined) or via the Inputs if not.
   */
  @Input('soho-datagrid') set sohoDatagrid(datagridType: SohoDataGridType) {
    this.datagridType = datagridType ? datagridType : SohoDataGridComponent.AUTO;
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
  filtered = new EventEmitter<SohoDataGridAddRowEvent>();

  // This event is fired when a row in the grid is expanded.
  @Output()
  expandrow = new EventEmitter<SohoDataGridRowEvent>();

  // This event is fired when a row in the grid is collapsed.
  @Output()
  collapserow = new EventEmitter<SohoDataGridRowEvent>();

  @Output()
  sorted = new EventEmitter<SohoDataGridSortedEvent>();

  @Output()
  rowActivated = new EventEmitter<SohoDataGridRowActivated>();

  @Output()
  rowDeactivated = new EventEmitter<SohoDataGridRowActivated>();

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
  private jQueryElement: any;

  // Reference to the Soho datagrid control api.
  private datagrid: SohoDataGridStatic;

  // Reference to the grid's data.
  private gridData: any[];

  // The source type for the grid.
  private datagridType: string;

  // An internal gridOptions object that gets updated by using
  // the component's Inputs()
  private _gridOptions: SohoDataGridOptions = {};

  // Provides hints to the component after the next refresh.
  private refreshHint: RefreshHintFlags = RefreshHintFlags.None;

  // List of option names changed (for debugging).
  private changedOptions = [];

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   * @param changeDetector - the component's change detector.
   * @param datagridService - service for obtaining data (optional)
   */
  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    @Optional() protected datagridService: SohoDataGridService) {

  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  getColumnGroup(idx: number): string {
    return this.datagrid.getColumnGroup(idx);
  }

  getColumnById(idx: number): string {
    return this.datagrid.getColumnGroup(idx);
  }

  /**
   * Overrides the sort function used by the datagrid,
   * can only be used once the grd has been created.
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
   * Used to set the sort indicator on a column when disableClientSort is set to true.
   */
  setSortIndicator(columnId: string, ascending: boolean): void {
    this.datagrid.setSortIndicator(columnId, ascending);
  }

  pageSize(): number {
    return this.datagrid.pager.settings.pagesize;
  }

  updatePagingInfo(pageInfo: SohoPagerPagingInfo): void {
    this.datagrid.updatePagingInfo(pageInfo);
  }

  enable(): void {
    this.isDisabled = false;
  }

  disable(): void {
    this.isDisabled = true;
  }

  updateRow(idx: number, row: any): void {
    ArgumentHelper.checkNotNull('row', row);

    this.datagrid.updateRow(idx, row);
  }

  hideColumn(id: any) {
    this.datagrid.hideColumn(id);
  }

  showColumn(id: any) {
    this.datagrid.showColumn(id);
  }

  columnById(id: string): Array<any> {
    return this.datagrid.columnById(id);
  }

  getColumns(): Array<any> {
    return this.datagrid.settings.columns;
  }

  getColumnIndex(columnId: string): number {
    return this.datagrid.getColumnIndex(columnId);
  }

  getHeaderRowColumn(fld: any) {
    return this.datagrid.getHeaderRowColumn(fld);
  }

  addRow(data: any, location: any) {
    this.datagrid.addRow(data, location);
  }

  removeRow(data: any) {
    this.datagrid.removeRow(data);
  }

  getDirtyRows(commitEdits?: boolean): Array<any> {
    return []; // this.datagrid.getDirtyRows(commitEdits);
  }

  /**
   * Removes all selected rows
   */
  removeSelected() {
    this.datagrid.removeSelected();
  }

  /**
   * Clears any filter defined, for this datagrid.
   */
  clearFilter(): void {
    this.datagrid.clearFilter();
  }

  /**
   * The rows currently selected on the data grid.
   *
   * @return an array of SohoDataGridSelectedRow instances.
   */
  getSelectedRows(): SohoDataGridSelectedRow[] {
    return this.datagrid.selectedRows();
  }

  /**
   * Selects all the rows in the grid.
   */
  selectAllRows() {
    this.datagrid.selectAllRows();
  }

  /**
   * Unselects all the rows in the grid.
   */
  unSelectAllRows() {
    this.datagrid.unSelectAllRows();
  }

  /**
   * Sets the selected status of the specified row in the data grid.
   *
   * @param idx - the row number (idx) of the row to select.
   */
  selectRow(idx: number) {
    this.datagrid.selectRow(idx);
  }

  /**
   * Deselects the specified row in the data grid.
   *
   * @param idx - the row number (idx) of the row to deselect.
   */
  unselectRow(idx: number) {
    this.datagrid.unselectRow(idx);
  }

  /**
   * Selects a range of rows based on the provided row indexes.
   *
   * @param start - the start index
   * @param end - then end index
   */
  selectRange(start: number, end: number) {
    const range: number[] = [start, end];
    this.datagrid.selectRowsBetweenIndexes(range);
  }

  /**
   * Selects a range of rows based on the provided row indexes.
   *
   * @param start - the start index
   * @param end - then end index
   */
  selectRows(rows: number[]) {
    this.datagrid.selectedRows(rows);
  }

  /**
   * Activate the row of the passed-in idx.
   * NOTE: valid only when selection mode is 'mixed'
   */
  activateRow(idx: number): void {
    this.datagrid.activateRow(idx);
  }

  /**
   * Deactivate the currently activated row.
   * NOTE: valid only when selection mode is 'mixed'
   */
  deactivateRow(): void {
    this.datagrid.deactivateRow();
  }

  /**
   * Get the currently activated row.
   * NOTE: valid only when selection mode is 'mixed'
   */
  activatedRow(): SohoDataGridRowActivated {
    return this.datagrid.activatedRow();
  }

  /**
   * Toggles the display of the filter row.
   */
  toggleFilterRow(): void {
    this.datagrid.toggleFilterRow();
  }

  /**
   * Scrolls the row at <b>idx</b> into view in the view port.
   * @param idx The index of the row to scroll into view.
   */
  public scrollRowIntoView(idx: number): void {
    this.datagrid.setActiveCell(idx, 0);
  }

  /**
   * Programmatically trigger a call to the datagrid.settings.source
   * function with the given pagerType.
   * @param pagerType - a valid pager type.
   */
  triggerSource(pagerType: 'initial' | 'refresh' | 'filtered' | string): void {
    this.datagrid.triggerSource(pagerType);
  }

  /**
   * Trigger export of grid data to Excel.
   * @param fileName The prefix name to be used for the exported file.
   * @param worksheetName The name to be used for the worksheet.
   * @param customDs A datasource to override the default.
   */
  exportToExcel(fileName: string, worksheetName: string, customDs: Object[]): void {
    this.datagrid.exportToExcel(fileName, worksheetName, customDs);
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
    this.datagridService.getData(request)
      .subscribe((results: Object[]) => {
        response(results, request);
      });
  }

  /**
   * Event fired after a child row has been expanded.
   *
   * @todo arguments.
   */
  private onExpandRow(args: any) {
    const event = { grid: this, row: args.row, detail: args.detail, item: args.item, rowData: args.rowData };
    this.expandrow.next(event);
  }

  /**
   * Event fired after a child row has been collapsed.
   *
   * @todo arguments.
   */
  private onCollapseRow(args: any) {
    this.collapserow.next({
      grid: this,
      row: args.row,
      detail: args.detail,
      item: args.item,
      rowData: args.rowData
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
      this.updateControl();
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
   * Destroys the jQuery control associated with this component.
   */
  private destroyDataGrid(): void {
    if (this.datagrid) {
      if (this.datagrid.destroy) {
        this.datagrid.destroy();
      }
      this.datagrid = null;
    }
  }

  private buildDataGrid(): void {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the SohoXi control.
    this.jQueryElement.datagrid(this._gridOptions);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'datagrid'.
    this.datagrid = this.jQueryElement.data('datagrid');

    // If "auto" and there's a service, get the columns from it.
    // (may want to check if columns have already been set? Error?)
    if (this.datagridType === SohoDataGridComponent.AUTO && this.datagridService) {
      // Bootstrap from service, note this is not async.
      this.columns = this.datagridService.getColumns();
      // Once the columns are set, request the data (paging?)
      this.datagridService.getData(null)
        .subscribe((data: any[]) => {
          this.datagrid.loadData(data);
        });
    } else if (this.gridData) {
      // Not using a service, so use the pre-loaded data.
      this.datagrid.loadData(this.gridData);
    }

    // Initialise any event handlers.
    this.jQueryElement
      .on('selected', (e: JQueryEventObject, args: SohoDataGridSelectedRow[]) => this.selected.next({ e, rows: args }))
      .on('cellchange', (e: JQueryEventObject, args: SohoDataGridCellChangeEvent[]) => this.cellchange.next(args))
      .on('removerow', (e: JQueryEventObject, args: SohoDataGridRowRemoveEvent) => { this.rowRemove.next(args); })
      .on('addrow', (e: JQueryEventObject, args: SohoDataGridAddRowEvent) => { this.rowAdd.next(args); })
      .on('filtered', (e: JQueryEventObject, args: any) => { this.filtered.next(args); })
      .on('sorted', (e: JQueryEventObject, args: any) => { this.sorted.next(args); })
      .on('expandrow', (e: JQueryEventObject, args: any) => { this.onExpandRow(args); })
      .on('collapserow', (e: JQueryEventObject, args: any) => { this.onCollapseRow(args); })
      .on('rowactivated', (e: JQueryEventObject, args: any) => { this.rowActivated.next(args); })
      .on('rowdeactivated', (e: JQueryEventObject, args: any) => { this.rowDeactivated.next(args); });
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   *
   * @todo possible add hints? Rebuild, Update, SetOption
   *
   * @param optionName - the option that was updated, (allowing specific handling)
   */
  private markForRefresh(optionName: string, hint: RefreshHintFlags) {

    // Merge in the hint.
    this.refreshHint |= hint; // tslint:disable-line

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
  private updateControl(): void {
    if (this.refreshHint & RefreshHintFlags.Rebuild) { // tslint:disable-line
      this.destroyDataGrid();
      this.buildDataGrid();

      // Assume a rebuild trumps all other candidates ...
    } else {
      // @todo verify if calling these separately makes sense.
      if (this.refreshHint & RefreshHintFlags.RenderHeader) { // tslint:disable-line
        this.datagrid.renderHeader();
      }
      if (this.refreshHint & RefreshHintFlags.RenderRows) { // tslint:disable-line
        this.datagrid.renderRows();
      }
    }

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
  private updateSource(source: SohoDataGridSourceFunction): void {
    // If a source property has not been defined, and a service has
    // use the data service to load the data dynamically for paging.
    if (!source && this.datagridService) {
      this._gridOptions.source
        = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => this.onDataRequest(request, response);
    } else {
      this._gridOptions.source = source;
    }
  }
}

/**
 * Enumeration of the Soho Datagrid FilterTypes.
 * Note: integer, percent and lookup are not yet implemented the soho datagrid.js
 * See http://stackoverflow.com/questions/15490560/create-an-enum-with-string-values-in-typescript
 * for more details about creating an enum of strings.
 */
export enum SohoGridColumnFilterTypes {
  Text     = <any> 'text',
  Checkbox = <any> 'checkbox',
  Contents = <any> 'contents',
  Date     = <any> 'date',
  Decimal  = <any> 'decimal',
  Integer  = <any> 'integer',
  Lookup   = <any> 'lookup',
  Percent  = <any> 'percent',
  Select   = <any> 'select'
};

/**
 * Details of the 'expandrow' and 'collapserow' events.
 */
export interface SohoDataGridRowEvent {
  // The data grid component originating the call.
  grid: SohoDataGridComponent;

  // The index of the row number that has been expanded/collapsed.
  row: number;

  // The owning header.
  detail: any;

  // The detail row thas has been expanded..
  item: any;

  // Data associated with row
  rowData: any;
}
