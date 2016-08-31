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

import {
  ArgumentHelper
} from '../../utils';

import { SohoDataGridService } from './datagrid.service';

import {
  SohoGridOptions,
  SohoGridColumn,
  SohoToolbarConfiguration,
  SohoSourceRequest,
  SohoDataGridCellChangeEvent,
  SohoDataGridSelectedEvent,
  SohoDataGridSelectedRow,
  SohoDataGridRowRemoveEvent,
  SohoDataGridAddRowEvent
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

  @Input()
  idProperty: string;
  @Input()
  cellNavigation = true;
  @Input()
  alternateRowShading = false;
  @Input()
  dataset: Array<any>;
  @Input()
  columnReorder = false;
  @Input()
  editable = false;
  @Input()
  isList = false;
  @Input()
  menuId: any = null;
  @Input()
  rowHeight: 'normal' | 'medium' | 'short' = 'normal';
  @Input()
  selectable: boolean | 'single' | 'multiple' = false;
  @Input()
  clickToSelect = true;
  @Input()
  toolbar: boolean | SohoToolbarConfiguration;
  @Input()
  paging = false;
  @Input()
  pagesize = 25;
  @Input()
  pagesizes: Array<number> = [10, 25, 50, 75];
  @Input()
  indeterminate = false;
  @Input()
  actionableMode = false;
  @Input()
  saveColumns = false;
  @Input()
  source: any = null;

  /**
   * The array of data to display in the grid.
   *
   * @param an array of objects matching the column definition.
   *
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */
  @Input()
  set data(data: any[]) {
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
  @Input()
  set columns(columns: SohoGridColumn[]) {
    this.gridColumns = columns || [];
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
  @Input('soho-datagrid')
  set sohoDatagrid(datagridType: SohoDataGridType) {
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

  // Sets the class of the grid appropriately.
  @HostBinding('class.datagrid')
  datagridClass = true;

  @HostBinding('attr.role')
  datagridRole = 'datagrid';

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: any;

  // Reference to the Soho datagrid control api.
  private datagrid: any;

  // Reference to the grid's columns.
  private gridColumns: SohoGridColumn[];

  // Reference to the grid's data.
  private gridData: any[];

  // The source type for the grid.
  private datagridType: string;

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

  pageSize(): any {
    return this.datagrid.settings.pagesize;
  }

  getDirtyRows(commitEdits?: boolean): Array<any> {
    return [];
  }

  getColumns(): Array<any> {
    return this.datagrid.settings.columns;
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

  addRow(data: any, location: any) {
    this.datagrid.addRow(data, location);
  }

  removeRow(data: any) {
    this.datagrid.removeRow(data);
  }

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
    return this.datagrid._selectedRows;
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

  ngOnInit() {}

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Grid options ...
    const gridOptions: SohoGridOptions = {
      idProperty: this.idProperty,
      cellNavigation: this.cellNavigation,
      alternateRowShading: this.alternateRowShading,
      columns: this.gridColumns,
      dataset: this.dataset,
      columnReorder: this.columnReorder,
      editable: this.editable,
      isList: this.isList,
      menuId: this.menuId,
      rowHeight: this.rowHeight,
      selectable: this.selectable,
      clickToSelect: this.clickToSelect,
      toolbar: this.toolbar,
      paging: this.paging,
      pagesize: this.pagesize,
      pagesizes: this.pagesizes,
      indeterminate: this.indeterminate,
      actionableMode: this.actionableMode,
      saveColumns: this.saveColumns,
      source: this.source
    };

    // If a source property has not been defined, and a service has
    // use the data service to load the data dynamically for paging.
    if (!this.source && this.datagridService) {
      gridOptions.source = (args: any, response: any) => this.onDataRequest(args, response);
    }

    // Initialise the SohoXi control.
    this.jQueryElement.datagrid(gridOptions);

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
    this.jQueryElement.on('selected',
        (e: any, args: SohoDataGridSelectedRow[]) => {
          this.selected.next({ rows: args });
        })
      .on('cellchange',
        (e: any, args: SohoDataGridCellChangeEvent) => {
          this.cellchange.next(args);
        })
      .on('removerow',
        (e: any, args: SohoDataGridRowRemoveEvent) => {
          this.rowRemove.next(args);
        })
      .on('addrow',
        (e: any, args: SohoDataGridAddRowEvent) => {
          this.rowAdd.next(args);
        });
  }

  ngOnDestroy() {
    if (this.datagrid) {
      if (this.datagrid.destroy) {
        this.datagrid.destroy();
      }
      this.datagrid = null;
    }
  }
}
