import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ArgumentHelper } from '../../utils';

import { SohoDataGridService } from './datagrid.service';

import {
  SohoGridOptions,
  SohoGridColumn,
  SohoSourceRequest,
  SohoDataGridCellChangeEvent,
  SohoDataGridSelectedEvent,
  SohoDataGridSelectedRow,
  SohoDataGridRowRemoveEvent,
  SohoDataGridAddRowEvent,
  SohoToolbarOptions,
  PageInfo
} from './datagrid.model';

export type SohoDataGridType = 'auto' | 'content-only';

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
 *
 * @todo paging
 */
@Component({
  selector: '[soho-datagrid]',
  template: ' <ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoDataGridComponent implements OnInit, AfterViewInit, OnDestroy {

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
   * Set the data grid options on a single call with the datagrid options object.
   *
   * @param gridOptions.
   */
  @Input() set gridOptions(gridOptions: SohoGridOptions) {
    ArgumentHelper.checkNotNull('gridOptions', gridOptions);

    this._gridOptions = gridOptions;
    if (this.jQueryElement) {
      this.rebuild();
    }
  }

  get gridOptions(): SohoGridOptions {
    return this._gridOptions;
  }

  /**
   * Defines which property in the data rows is to be used as the id of each
   * row sets.
   * of the data.
   *
   * @param idProperty string id
   */
  @Input() set idProperty(idProperty: string) {
    this.gridOptions.idProperty = idProperty;
    if (this.jQueryElement) {
      this.datagrid.settings.idProperty = idProperty;
      // todo: update soho data grids view?
    }
  }

  get idProperty(): string {
    return this.gridOptions.idProperty;
  }

  /**
   *
   * @param cellNavigation
   */
  @Input() set cellNavigation(cellNavigation: boolean) {
    this.gridOptions.cellNavigation = cellNavigation;
    if (this.jQueryElement) {
      this.datagrid.settings.cellNavigation = cellNavigation;
      this.datagrid.renderRows();
    }
  }

  get cellNavigation(): boolean {
    return this.gridOptions.cellNavigation;
  }

  /**
   * Changes the row navigation setting of the data grid. If rowNavigation
   * is "false” then a border is not displayed around the row.
   *
   * Defaults to true.
   *
   * @param rowlNavigation i "false” then grid will NOT show a border around the row.
   */
  @Input() set rowNavigation(rowlNavigation: boolean) {
    this.gridOptions.rowNavigation = rowlNavigation;
    if (this.jQueryElement) {
      this.datagrid.settings.rowlNavigation = rowlNavigation;
      this.datagrid.renderRows();
    }
  }

  get rowNavigation(): boolean {
    return this.gridOptions.rowNavigation;
  }

  /**
   *
   * @param alternateRowShading
   */
  @Input() set alternateRowShading(alternateRowShading: boolean) {
    this.gridOptions.alternateRowShading = alternateRowShading;
    if (this.jQueryElement) {
      this.datagrid.settings.alternateRowShading = alternateRowShading;
      this.datagrid.renderRows();
    }
  }

  get alternateRowShading(): boolean {
    return this.gridOptions.alternateRowShading;
  }

  /**
   *
   * @param dataset
   */
  @Input() set dataset(dataset: Array<any>) {
    this.gridOptions.dataset = dataset;
    if (this.jQueryElement) {
      this.datagrid.settings.dataset = dataset;
      this.datagrid.updateDataset(dataset);
    }
  }

  /**
   *
   * @param columnReorder
   */
  @Input() set columnReorder(columnReorder: boolean) {
    this.gridOptions.columnReorder = columnReorder;
    if (this.jQueryElement) {
      this.datagrid.settings.columnReorder = columnReorder;
      this.datagrid.renderHeader();
    }
  }

  get columnReorder(): boolean {
    return this.gridOptions.columnReorder;
  }

  /**
   *
   * @param editable
   */
  @Input() set editable(editable: boolean) {
    this.gridOptions.editable = editable;
    if (this.jQueryElement) {
      this.datagrid.settings.editable = editable;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  get editable(): boolean {
    return this.gridOptions.editable;
  }

  /**
   *
   * @param isList
   */
  @Input() set isList(isList: boolean) {
    this.gridOptions.isList = isList;
    if (this.jQueryElement) {
      this.datagrid.settings.isList = isList;
      // todo: update soho data grids view

      // causes new isLsit rows to be appended to the current view
      // this.datagrid.render();

      // doesn't seem to update the view at all.
      // this.datagrid.renderRows();
      // this.datagrid.renderHeader();

      // calling rebuilt as a brute force way of udpating the view.
      this.rebuild();
    }
  }

  get isList(): boolean {
    return this.gridOptions.isList;
  }

  /**
   *
   * @param menuId
   */
  @Input() set menuId(menuId: any) {
    this.gridOptions.menuId = menuId;
    if (this.jQueryElement) {
      this.datagrid.settings.menuId = menuId;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param rowHeight - 'normal' | 'medium' | 'short'
   */
  @Input() set rowHeight(rowHeight: 'normal' | 'medium' | 'short') {
    this.gridOptions.rowHeight = rowHeight;
    if (this.jQueryElement) {
      this.datagrid.settings.rowHeight = rowHeight;
      this.datagrid.rowHeight(rowHeight);
    }
  }

  /**
   * Whether selection is enabled.
   *
   * @param selectable valid values are: 'multiple', 'single', and false.
   */
  @Input() set selectable(selectable: boolean | 'single' | 'multiple') {
    this.gridOptions.selectable = selectable;
    if (this.jQueryElement) {
      // Just changing the datagrid.settings.selectable updates the datagrid view.
      this.datagrid.settings.selectable = selectable;
      this.datagrid.renderRows();
    }
  }

  get selectable(): boolean | 'single' | 'multiple' {
    return this.gridOptions.selectable;
  }

  /**
   *
   * @param clickToSelect
   */
  @Input() set clickToSelect(clickToSelect: boolean) {
    this.gridOptions.clickToSelect = clickToSelect;
    if (this.jQueryElement) {
      this.datagrid.settings.clickToSelect = clickToSelect;
      this.datagrid.renderRows();
    }
  }

  get clickToSelect(): boolean {
    return this.gridOptions.clickToSelect;
  }

  /**
   *
   * @param toolbar
   */
  @Input() set toolbar(toolbar: SohoToolbarOptions) {
    this.gridOptions.toolbar = toolbar;
    if (this.jQueryElement) {
      this.datagrid.settings.toolbar = toolbar;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param paging
   */
  @Input() set paging(paging: boolean) {
    this.gridOptions.paging = paging;
    if (this.jQueryElement) {
      this.datagrid.settings.paging = paging;

      // todo: update soho data grids view - this.updatePagingInfo()?
      this.rebuild();
    }
  }
  get paging(): boolean {
    return this.gridOptions.paging;
  }

  /**
   *
   * @param pagesize
   */
  @Input() set pagesize(pagesize: number) {
    this.gridOptions.pagesize = pagesize;
    if (this.jQueryElement) {
      this.datagrid.settings.pagesize = pagesize;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param pagesizes
   */
  @Input() set pagesizes(pagesizes: Array<number>) {
    this.gridOptions.pagesizes = pagesizes;
    if (this.jQueryElement) {
      this.datagrid.settings.pagesizes = pagesizes;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param indeterminate
   */
  @Input() set indeterminate(indeterminate: boolean) {
    this.gridOptions.indeterminate = indeterminate;
    if (this.jQueryElement) {
      this.datagrid.settings.indeterminate = indeterminate;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param actionableMode
   */
  @Input() set actionableMode(actionableMode: boolean) {
    this.gridOptions.actionableMode = actionableMode;
    if (this.jQueryElement) {
      this.datagrid.settings.actionableMode = actionableMode;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  get actionableMode(): boolean {
    return this.gridOptions.actionableMode;
  }

  /**
   *
   * @param saveColumns
   */
  @Input() set saveColumns(saveColumns: boolean) {
    this.gridOptions.saveColumns = saveColumns;
    if (this.jQueryElement) {
      this.datagrid.settings.saveColumns = saveColumns;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param source
   */
  @Input() set source(source: any) {
    this.updateSource(source);
    // this.gridOptions.source = source;
    if (this.jQueryElement) {
      this.datagrid.settings.source = source;
      // todo: update soho data grids view
      this.rebuild();
    }
  }

  /**
   *
   * @param filterable
   */
  @Input() set filterable(filterable: boolean) {
    this.gridOptions.filterable = filterable;
    if (this.jQueryElement) {
      this.datagrid.settings.filterable = filterable;
      // todo: update soho data grids view
      this.rebuild();
    }
  }
  get filterable(): boolean {
    return this.gridOptions.filterable;
  }

  /**
   * If true the datagrid is displayed as a tree, otherwise
   * the grid is displayed as flat rows.
   */
  @Input() set treeGrid(treeGrid: boolean) {
    this.gridOptions.treeGrid = treeGrid;

    // If the jQuery control has been initialised, update it.
    if (this.jQueryElement) {
      this.datagrid.settings.treeGrid = treeGrid;
      this.rebuild();
    }
  }

  get treeGrid(): boolean {
    return this.gridOptions.treeGrid;
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
  @Input() set columns(columns: SohoGridColumn[]) {
    this.gridOptions.columns = columns || [];
    if (columns && this.jQueryElement) {
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

  // @todo
  // 'activecellchange', [{node: this.activeCell.node, row: this.activeCell.row, cell: this.activeCell.cell}]);
  // 'collapserow', [{grid: self, row: rowIndex, detail: detail, item: item}]);
  // 'expandrow', [{ grid: self, row: rowIndex, detail: detail, item: item }]);
  // 'sorted', [this.sortColumn]);
  // 'columnchange', [{ type: 'updatecolumns', columns: this.settings.columns }]);

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
    if (this.gridOptions.treeGrid) {
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
  private datagrid: any;

  // Reference to the grid's data.
  private gridData: any[];

  // The source type for the grid.
  private datagridType: string;

  // an internal gridOptions object that gets update by using
  // the components Inputs()
  private _gridOptions: SohoGridOptions = new SohoGridOptions();

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   * @param datagridService - service for obtaining data (optional)
   */
  constructor(
    private elementRef: ElementRef,
    @Optional() protected datagridService: SohoDataGridService) {}

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  getColumnGroup(idx: number): string {
    return this.datagrid.getColumnGroup(idx);
  }

  getColumnById(idx: number): string {
    return this.datagrid.getColumnGroup(idx);
  }

  setSortFunction(sortFunction: Function): void {
    this.datagrid.sortFunction = sortFunction;
  }

  setSortIndicator(columnId: string, isAscending: boolean): void {
    this.datagrid.setSortIndicator(columnId, isAscending);
  }

  pageSize(): any {
    return this.datagrid.settings.pagesize;
  }

  updatePagingInfo(pageInfo: PageInfo): void {
    this.datagrid.updatePagingInfo(pageInfo);
  }

  enable(): void {
    this.isDisabled = false;
  }

  disable(): void {
    this.isDisabled = true;
  }

  show(): void {
    // TODO show datagrid
  }

  hide(): void {
    // TODO hide datagrid
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
   * Unselects all selected rows
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
    // return this.datagrid._selectedRows;
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
   * Stop gap method to destroy the current datagrid and rebuilt it again.
   * This is required when there is no method found that can update the view
   * for a particular input.
   */
  rebuild(): void {
    console.log('destroy');
    if (this.datagrid) {
      if (this.datagrid.destroy) {
        this.datagrid.destroy();
      }
      this.datagrid = null;

      this.buildDataGrid();
    }
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handle a request to load the data for the grid from the service.
   *
   * @todo paging.
   */
  onDataRequest(req: SohoSourceRequest, response: (data: any) => void) {
    this.datagridService.getData(req)
      .subscribe((data: any) => {
        response(data);
      });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngOnInit() {
    this.updateSource(this.gridOptions.source);
  }

  ngAfterViewInit() {
    this.buildDataGrid();
  }

  buildDataGrid() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the SohoXi control.
    this.jQueryElement.datagrid(this.gridOptions);

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
      .on('selected', (e: any, args: SohoDataGridSelectedRow[]) => this.selected.next({ rows: args }))
      .on('cellchange', (e: any, args: SohoDataGridCellChangeEvent[]) => this.cellchange.next(args))
      .on('removerow', (e: any, args: SohoDataGridRowRemoveEvent) => { this.rowRemove.next(args); })
      .on('addrow', (e: any, args: SohoDataGridAddRowEvent) => { this.rowAdd.next(args); })
      .on('filtered', (e: any, args: any) => { this.filtered.next(args); });
  }

  /**
   * Destroy the control when the component is destroyed.
   */
  ngOnDestroy() {
    if (this.datagrid) {
      if (this.datagrid.destroy) {
        this.datagrid.destroy();
      }
      this.datagrid = null;
    }
  }

  /**
   * Updates the source setting/function to use source input if set.
   * Otherwise use dataGridService if that is set.
   *
   * @param source the function
   */
  private updateSource(source: Function) {
    // If a source property has not been defined, and a service has
    // use the data service to load the data dynamically for paging.
    if (!source && this.datagridService) {
      this.gridOptions.source = (args: any, response: any) => this.onDataRequest(args, response);
    } else {
      this.gridOptions.source = source;
    }
  }
}
