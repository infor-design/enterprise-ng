// Copyright (c) 2016 Infor. All rights reserved. www.infor.com
// 
// NOTICE 
// 
// THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS
// CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES
// OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR
// WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND
// ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH
// THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.
// ALL OTHER RIGHTS RESERVED.
//
// (c) COPYRIGHT 2016 INFOR.  ALL RIGHTS RESERVED.
// THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE
// TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR
// AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS
// RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE
// THE PROPERTY OF THEIR RESPECTIVE OWNERS. 

//
// Author: Theo Harper (theo.harper@infor.com)
//

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

import {
  DataGridService
} from './datagrid.service';

import {
  GridOptions,
  GridColumn,
  ToolbarOptions,
  GridRequest,
  DataGridCellChangeEvent,
  DataGridSelectedEvent
} from './datagrid.model';

export const DATAGRID_TYPES = {
  // Determines the type to use based on the presence of a service.
  AUTO: 'auto',

  // Use the components content.
  CONTENT_ONLY: 'content-only'
}

/**
 * Angular Wrapper for the SoHo Data Grid Component.
 * 
 * This component searches for a div (or table) with the attribute 
 * 'soho-datagrid' in the parent's DOM tree, initialising it with 
 * the SoHo datagrid control. 
 * 
 * The data is provided either by a component input or an implementation
 * of the DataGridService interface, by specifying an implementation 
 * on the hosting component, i.e.
 * 
 * providers: [ provide: DataGridService, useClass: DataGridDemoService} ]
 * 
 * TODO: using embedded table (content-only)
 * addRow()
 * removeRow()
 * removeSelected()
 * paging
 * tooltips?
 * updaterow()
 * showColumn()
 * hideColumn()
 * ...
 * headers/footers/toolbars/menus
 */
@Component({
  moduleId: module.id,
  selector: '[soho-datagrid]', // ... or use div[soho-datagrid]?
  template: ' <ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoHoDataGridComponent implements OnInit, AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  @Input() idProperty: string;
  @Input() cellNavigation: boolean = true;
  @Input() alternateRowShading: boolean = false;
  @Input() dataset: Array<any>;
  @Input() columnReorder: boolean = false;
  @Input() editable: boolean = false;
  @Input() isList: boolean = false;
  @Input() menuId: any = null;
  @Input() rowHeight: 'normal' | 'medium' | 'small' = 'normal';
  @Input() selectable: boolean = false;
  @Input() clickToSelect: boolean = true;
  @Input() toolbar: boolean | ToolbarOptions;
  @Input() paging: boolean = false;
  @Input() pagesize: number = 25;
  @Input() pagesizes: Array<number> = [10, 25, 50, 75];
  @Input() indeterminate: boolean = false;
  @Input() actionableMode: boolean = false;
  @Input() saveColumns: boolean = false;
  @Input() source: any = null;

  /**
   * The array of data to display in the grid.
   * 
   * As this method can be called before the control is
   * initialised, stash the data for later, and only
   * call loadData on the control api if ready.
   */ 
  @Input() set data(data: any[]) {
    this.gridData = data;
    if (data && this.jQueryControl) {
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
  @Input() set columns(columns: GridColumn[]) {
    this.gridColumns = columns || [];
    if (columns && this.jQueryControl) {
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
  @Input('soho-datagrid') set sohoDatagrid(datagridType: string) {
    if (datagridType) {
      this.dataGridType = datagridType;
    } else {
      this.dataGridType = DATAGRID_TYPES.AUTO;
    }
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // This event is fired when a row (or rows) are selected.
  @Output() selected = new EventEmitter<DataGridSelectedEvent>();

  // This event is fired when a cell is changed.
  @Output() cellchange = new EventEmitter<DataGridCellChangeEvent>();

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  // Set the enable / disabled class (not working)
  @HostBinding('class.is-disabled') isDisabled = false;

  // Sets the class of the grid appropriately.
  @HostBinding('class') datagridClass = 'datagrid';

  @HostBinding('attr.role') datagridRole = 'datagrid';

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryControl: any;

  // Reference to the SoHo datagrid control api.
  private datagrid: any;

  // Reference to the grid's columns.    
  private gridColumns: GridColumn[];

  // Reference to the grid's data.
  private gridData: any[];

  // The source type for the grid.
  private dataGridType: string;

  /**
   * Constructor.
   * 
   * @param elementRef - the element matching the component's selector.
   * @param log - generic logger interface.
   * @param datagridService - service for obtaining data (optional)
   */
  constructor(
    private elementRef: ElementRef,
    @Optional() protected datagridService: DataGridService) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  getColumnGroup(idx: number): string {
    return this.datagrid.getColumnGroup(idx);
  }

  enable(): void {
    this.datagrid.enable();
  }

  disable(): void {
    this.datagrid.disable();
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

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handle a request to load the data for the grid from the service.
   * 
   * @todo paging.
   */
  onDataRequest(req: GridRequest, response: (data: any) => void) {
    this.datagridService.getData(req)
      .subscribe((data: any) => {
        response(data);
      });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryControl = $(this.elementRef.nativeElement);

    // Grid options ...
    let gridOptions: GridOptions = {
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

    // Initialise the SoHoXi control.
    this.jQueryControl.datagrid(gridOptions);

    // Once the control is initialised, extract the control 
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'datagrid'.
    this.datagrid = this.jQueryControl.data('datagrid');

    // If "auto" and there's a service, get the columns from it.
    // (may want to check if columns have already been set? Error?)
    if (this.dataGridType === DATAGRID_TYPES.AUTO && this.datagridService) {
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
    this.jQueryControl.on('selected', (e: any, args: DataGridSelectedEvent) => {
      this.selected.next(args);
    }).on('cellchange', (e: any, args: DataGridCellChangeEvent) => {
      this.cellchange.next(args);
    }).on('exiteditmode', (e: any, args: any) => {
      // ... more ...
    });
  }

  ngOnDestroy() {
    if (this.jQueryControl) {
      this.jQueryControl.destroy();
      this.jQueryControl = null;
    }
  }
}
