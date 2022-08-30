import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDataGridModule } from './soho-datagrid.module';
import { SohoDataGridComponent } from './soho-datagrid.component';

/* eslint-disable */
const COLUMNS: SohoDataGridColumn[] = [
  {
    id: 'selectionCheckbox',
    sortable: false,
    resizable: false,
    width: 50,
    formatter: Soho.Formatters.SelectionCheckbox,
    align: 'center',
    exportable: false,
    minWidth: 100,
    maxWidth: 200
  },
  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    sortable: false,
    filterType: 'integer',
    width: 140,
    formatter: Soho.Formatters.Readonly
  },
  {
    id: 'productName',
    name: 'Product Name',
    field: 'productName',
    sortable: false,
    filterType: 'text',
    filterConditions: ['equals', 'contains'],
    width: 150,
    formatter: Soho.Formatters.Hyperlink
  },
  {
    id: 'activity',
    name: 'Activity',
    field: 'activity',
    sortable: false,
    filterType: 'text',
    width: 125,
    hidden: true
  },
  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    sortable: false,
    width: 125
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    sortable: false,
    filterType: 'decimal',
    width: 125,
    formatter: Soho.Formatters.Decimal
  },
  {
    id: 'orderDate',
    name: 'Order Date',
    field: 'orderDate',
    sortable: false,
    filterType: 'date',
    headerAlign: 'right',
    formatter: Soho.Formatters.Date,
    dateFormat: 'M/d/yyyy'
  }
];
/* eslint-enable */

/* eslint-disable */
const DATA: any[] = [
  {
    id: 0,
    productId: 214220,
    productName: 'Compressor 1',
    activity: 'Assemble Paint',
    quantity: 1,
    price: 210.99,
    status: 'Active',
    orderDate: '2015-01-01T06:00:00.000Z',
    action: 'Action',
    rated: 0.32
  },
  {
    id: 1,
    productId: 214221,
    productName: 'Compressor 2',
    activity: 'Assemble Paint',
    quantity: 1.5,
    price: 209.99,
    status: 'Late',
    orderDate: '2015-01-02T06:00:00.000Z',
    action: 'Action',
    rated: 0.76
  },
  {
    id: 2,
    productId: 214222,
    productName: 'Compressor 3',
    activity: 'Assemble Paint',
    quantity: 2,
    price: 208.99,
    status: 'Active',
    orderDate: '2015-01-03T06:00:00.000Z',
    action: 'Action',
    rated: 0.32
  },
  {
    id: 3,
    productId: 214223,
    productName: 'Compressor 4',
    activity: 'Assemble Paint',
    quantity: 2.5,
    price: 207.99,
    status: 'Inactive',
    orderDate: '2015-01-04T06:00:00.000Z',
    action: 'Action',
    rated: 0.53
  },
  {
    id: 4,
    productId: 214224,
    productName: 'Compressor 5',
    activity: 'Assemble Paint',
    quantity: 3,
    price: 206.99,
    status: 'Inactive',
    orderDate: '2015-01-05T06:00:00.000Z',
    action: 'Action',
    rated: 0.42
  },
  {
    id: 5,
    productId: 214225,
    productName: 'Compressor 6',
    activity: 'Assemble Paint',
    quantity: 3.5,
    price: 205.99,
    status: 'Inactive',
    orderDate: '2015-01-06T06:00:00.000Z',
    action: 'Action',
    rated: 0.88
  },
  {
    id: 6,
    productId: 214226,
    productName: 'Compressor 7',
    activity: 'Assemble Paint',
    quantity: 4,
    price: 204.99,
    status: 'Active',
    orderDate: '2015-01-07T06:00:00.000Z',
    action: 'Action',
    rated: 0.54
  }
];
/* eslint-enable */

describe('Soho DataGrid Unit Tests', () => {
  let comp: SohoDataGridComponent;
  let fixture: ComponentFixture<SohoDataGridComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDataGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SohoDataGridComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Empty Content', () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root1');
    // expect(el.hasAttribute('soho-datagrid')).toBeTruthy();
    expect(el.classList).toContain('datagrid-container');
  });

  it('Check With Content', () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root2');
    // expect(el.hasAttribute('soho-datagrid')).toBeTruthy();
    expect(el.classList).toContain('datagrid-container');
  });

  it('Check default value of dataset is []', () => {
    fixture.detectChanges();

    expect(comp.dataset).toEqual([]);
  });

  xit('check inputs', () => {
    const pageSizes = [10, 20, 30];
    const toolbar = {};
    const saveUserSettings = {};
    let frozenColumns: SohoDataGridFrozenColumns = {};

    comp.data = DATA;
    comp.columns = COLUMNS;

    comp.uniqueId = 'id1';
    comp.idProperty = 'id1';
    comp.frozenColumns = frozenColumns;
    comp.cellNavigation = false;
    comp.rowNavigation = false;
    comp.alternateRowShading = false;
    comp.columnReorder = false;
    comp.editable = false;
    comp.isList = false;
    comp.menuId = 'id1';
    comp.rowHeight = 'small';
    comp.selectable = false;
    comp.clickToSelect = false;
    comp.toolbar = toolbar;
    comp.saveUserSettings = saveUserSettings;
    comp.paging = false;
    comp.pagesize = 10;
    comp.pagesizes = pageSizes;
    comp.indeterminate = false;
    comp.actionableMode = false;
    comp.saveColumns = false;
    // comp.source = null;
    comp.filterable = false;
    comp.disableClientFilter = false;
    comp.disableClientSort = false;
    comp.treeGrid = false;
    comp.rowReorder = false;
    comp.showDirty = false;
    comp.disableRowDeactivation = false;
    comp.stretchColumn = 'productName';
    comp.stretchColumnOnChange = true;
    comp.userObject = {};

    expect(comp.uniqueId).toEqual('id1');
    expect(comp.idProperty).toEqual('id1');
    expect(comp.frozenColumns).toEqual(frozenColumns);
    expect(comp.cellNavigation).toEqual(false);
    expect(comp.rowNavigation).toEqual(false);
    expect(comp.alternateRowShading).toEqual(false);
    expect(comp.columnReorder).toEqual(false);
    expect(comp.editable).toEqual(false);
    expect(comp.isList).toEqual(false);
    expect(comp.selectable).toEqual(false);
    expect(comp.clickToSelect).toEqual(false);
    expect(comp.paging).toEqual(false);
    expect(comp.actionableMode).toEqual(false);
    expect(comp.filterable).toEqual(false);
    expect(comp.disableClientFilter).toEqual(false);
    expect(comp.disableClientSort).toEqual(false);
    expect(comp.treeGrid).toEqual(false);
    expect(comp.rowReorder).toEqual(false);
    expect(comp.showDirty).toEqual(false);
    expect(comp.disableRowDeactivation).toEqual(false);
    expect(comp.stretchColumn).toEqual('productName');
    expect(comp.stretchColumnOnChange).toEqual(true);
    expect(comp.userObject).toEqual({});
    expect((comp as any)._gridOptions.menuId).toEqual('id1'); // no getter
    expect((comp as any)._gridOptions.toolbar).toEqual(toolbar);
    expect((comp as any)._gridOptions.saveUserSettings).toEqual(
      saveUserSettings
    );
    expect((comp as any)._gridOptions.pagesize).toEqual(10);
    expect((comp as any)._gridOptions.pagesizes).toEqual(pageSizes);
    expect((comp as any)._gridOptions.indeterminate).toEqual(false);
    expect((comp as any)._gridOptions.saveColumns).toEqual(false);

    expect((comp as any).refreshHint).toEqual(0);

    fixture.detectChanges();
    expect(comp['datagrid']).toBeDefined('datagrid should be defined');

    frozenColumns = {
      left: ['selectionCheckbox'],
      right: ['orderDate']
    };

    // change some values and verify value getters
    comp.data = DATA;
    comp.columns = COLUMNS;
    comp.frozenColumns = frozenColumns;
    comp.uniqueId = 'id2';
    comp.idProperty = 'id2';
    comp.cellNavigation = true;
    comp.rowNavigation = true;
    comp.alternateRowShading = true;
    comp.columnReorder = true;
    comp.editable = true;
    comp.isRowDisabled = i => i % 2 === 0;
    comp.isList = true;
    comp.menuId = 'id2';
    comp.rowHeight = 'medium';
    comp.fixedRowHeight = 70;
    comp.selectable = true;
    comp.clickToSelect = true;
    comp.clickToSelect = true;
    comp.toolbar = Object.assign({}, toolbar);
    comp.saveUserSettings = Object.assign({}, saveUserSettings);
    comp.paging = true;
    comp.pagesize = 20;
    comp.pagesizes = [...pageSizes];
    comp.indeterminate = true;
    comp.actionableMode = true;
    comp.saveColumns = true;
    comp.filterable = true;
    comp.disableClientFilter = true;
    comp.disableClientSort = true;
    comp.treeGrid = true;
    comp.rowReorder = true;
    comp.showDirty = true;
    comp.disableRowDeactivation = true;
    comp.userObject = {};
    comp.showSelectAllCheckBox = false;

    expect(comp.uniqueId).toEqual('id2');
    expect(comp.idProperty).toEqual('id2');
    expect(comp.frozenColumns).toEqual(frozenColumns);
    expect(comp.cellNavigation).toEqual(true);
    expect(comp.rowNavigation).toEqual(true);
    expect(comp.alternateRowShading).toEqual(true);
    expect(comp.columnReorder).toEqual(true);
    expect(comp.editable).toEqual(true);
    expect(comp.isRowDisabled).toBeDefined();
    expect(comp.isList).toEqual(true);
    expect(comp.selectable).toEqual(true);
    expect(comp.clickToSelect).toEqual(true);
    expect(comp.paging).toEqual(true);
    expect(comp.actionableMode).toEqual(true);
    expect(comp.filterable).toEqual(true);
    expect(comp.disableClientFilter).toEqual(true);
    expect(comp.disableClientSort).toEqual(true);
    expect(comp.treeGrid).toEqual(true);
    expect(comp.rowReorder).toEqual(true);
    expect(comp.showDirty).toEqual(true);
    expect(comp.disableRowDeactivation).toEqual(true);
    expect(comp.userObject).toEqual({});
    expect((comp as any).showSelectAllCheckBox).toBeFalsy();
    expect((comp as any).datagrid.settings.menuId).toEqual('id2'); // no getter
    expect((comp as any).datagrid.settings.toolbar).toEqual(toolbar);
    expect((comp as any).datagrid.settings.saveUserSettings).toEqual(
      saveUserSettings
    );
    expect((comp as any).datagrid.settings.pagesize).toEqual(20);
    expect((comp as any).datagrid.settings.pagesizes).toEqual(pageSizes);
    expect((comp as any).datagrid.settings.indeterminate).toEqual(true);
    expect((comp as any).datagrid.settings.saveColumns).toEqual(true);
    expect((comp as any).datagrid.settings.showSelectAllCheckBox).toBeFalsy();
    expect((comp as any).refreshHint).toBeGreaterThan(0);

    // run detectChanges and verify refreshHint flag has been reset.
    fixture.detectChanges();
    expect((comp as any).refreshHint).toEqual(0);
  });

  it('check uniqueId', () => {
    fixture.detectChanges();

    // gridOptions.uniqueId has the default of null
    expect(comp.gridOptions.uniqueId).toBeNull();

    // The control has the default of null.
    expect(comp.uniqueId).toBeNull();

    comp.uniqueId = 'MyApp';

    expect(comp.uniqueId).toEqual('MyApp');
    expect(comp.gridOptions.uniqueId).toEqual('MyApp');
  });

  it('check resetColumns', () => {
    fixture.detectChanges();

    const spy = spyOn((comp as any).datagrid, 'resetColumns');

    comp.resetColumns();

    expect(spy).toHaveBeenCalled();
  });

  it('check rowReorder', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.rowReorder).toBeFalsy();
    expect(comp.rowReorder).toBeFalsy();

    comp.rowReorder = true;

    expect(comp.gridOptions.rowReorder).toBeTruthy();
    expect(comp.rowReorder).toBeTruthy();
  });

  it('check showDirty', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.showDirty).toBeFalsy();
    expect(comp.showDirty).toBeFalsy();

    comp.showDirty = true;

    expect(comp.gridOptions.showDirty).toBeTruthy();
    expect(comp.showDirty).toBeTruthy();
  });

  it('check getModifiedRows', () => {
    fixture.detectChanges();

    const spy = spyOn((comp as any).datagrid, 'getModifiedRows');

    comp.getModifiedRows();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check setDirtyIndicator', () => {
    fixture.detectChanges();

    const spy = spyOn((comp as any).datagrid, 'setDirtyIndicator');

    comp.setDirtyIndicator(0, 4, true);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check groupable', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.groupable).toBeNull();
    expect(comp.groupable).toBeNull();

    comp.groupable = { fields: ['accountType'], aggregator: 'sum' };

    expect(comp.gridOptions.groupable).toEqual({
      fields: ['accountType'],
      aggregator: 'sum'
    });
    expect(comp.groupable).toEqual({
      fields: ['accountType'],
      aggregator: 'sum'
    });
  });

  it('check stretchColumn', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.stretchColumn).toEqual('last');
    expect(comp.stretchColumn).toBe('last');

    comp.stretchColumn = 'accountType';

    expect(comp.gridOptions.stretchColumn).toEqual('accountType');
    expect(comp.stretchColumn).toEqual('accountType');
  });

  it('check enableTooltips', () => {
    fixture.detectChanges();

    // The default in the grid is false.
    expect(comp.gridOptions.enableTooltips).toBeFalsy();
    expect(comp.enableTooltips).toBeFalsy();

    comp.enableTooltips = true;

    expect(comp.gridOptions.enableTooltips).toBeTruthy();
    expect(comp.enableTooltips).toBeTruthy();
  });

  it('check commitCellEdit', () => {
    fixture.detectChanges();
    const spy = spyOn((comp as any).datagrid, 'commitCellEdit');

    comp.commitCellEdit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `
    <div
      soho-datagrid
      [columns]="columns"
      [dataset]="data"
      selectable="multiple"
      filterable="true"
    ></div>
  `
})
class SohoDataGridTestComponent {
  @ViewChild(SohoDataGridComponent)
  datagrid?: SohoDataGridComponent | null;
  _columns?: SohoDataGridColumn[];
  _data?: Object[];
  public get columns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = COLUMNS;
    }
    return this._columns;
  }

  public get data(): any[] {
    if (!this._data) {
      this._data = DATA.slice();
    }
    return this._data;
  }
}

describe('Soho DataGrid Render', () => {
  let component: SohoDataGridTestComponent;
  let fixture: ComponentFixture<SohoDataGridTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDataGridTestComponent],
      imports: [FormsModule, SohoDataGridModule]
    });

    fixture = TestBed.createComponent(SohoDataGridTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-datagrid]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
  });

  it('setting the dataset updates the grid', () => {
    fixture.detectChanges();

    const testData = [['d1', 'd2'], ['a1', 'a2']];
    (component as any).datagrid.dataset = testData;

    expect((component as any).datagrid.dataset).toBe(testData);
  });

  it('check exiteditmode', done => {
    fixture.detectChanges();

    (component as any).datagrid.exiteditmode.subscribe(
      (exiteditedEvent: SohoDataGridEditModeEvent) => {
        expect(exiteditedEvent.cell).toEqual(2);
        done();
      }
    );

    // Emulate the jQuery component firing the 'exiteditmode' event.
    (component.datagrid as any).jQueryElement.triggerHandler('exiteditmode', [
      {
        row: 1,
        cell: 2,
        item: {},
        target: null,
        value: 'value',
        oldValue: null,
        column: {},
        editor: null
      }
    ]);
  });

  it('check beforentereditmode', done => {
    fixture.detectChanges();

    (component as any).datagrid.beforeentereditmode.subscribe(
      (editModeEvent: SohoDataGridEditModeEvent) => {
        expect(editModeEvent.cell).toEqual(2);
        done();
      }
    );

    // Emulate the jQuery component firing the 'exiteditmode' event.
    (component.datagrid as any).jQueryElement.triggerHandler(
      'beforeentereditmode',
      [
        {
          row: 1,
          cell: 2,
          item: {},
          target: null,
          value: 'value',
          oldValue: null,
          column: {},
          editor: null
        }
      ]
    );
  });

  it('check entereditmode', done => {
    fixture.detectChanges();

    (component as any).datagrid.entereditmode.subscribe(
      (editModeEvent: SohoDataGridEditModeEvent) => {
        expect(editModeEvent.cell).toEqual(2);
        done();
      }
    );

    // Emulate the jQuery component firing the 'exiteditmode' event.
    (component.datagrid as any).jQueryElement.triggerHandler('entereditmode', [
      {
        row: 1,
        cell: 2,
        item: {},
        target: null,
        value: 'value',
        oldValue: null,
        column: {},
        editor: null
      }
    ]);
  });

  it('check setColumnSort(id, descending)', done => {
    (component as any).datagrid.sorted.subscribe(
      (sortedEvent: SohoDataGridSortedEvent) => {
        expect(sortedEvent.sortId).toEqual('desc');
        expect(sortedEvent.sortAsc).toBeTruthy();
        expect(sortedEvent.sortField).toEqual('desc');
        done();
      }
    );

    fixture.detectChanges();

    (component as any).datagrid.setSortColumn('desc', true);

    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('check afterrender', () => {
    (component as any).datagrid.afterRender.subscribe(
      (afterRenderEvent: SohoDataGridAfterRenderEvent) => {
        expect(afterRenderEvent).not.toBeNull();
      }
    );

    fixture.detectChanges();

    (component as any).datagrid.setSortColumn('desc', true);

    fixture.detectChanges();
  });

  it('check setColumnSort(id, ascending)', done => {
    (component as any).datagrid.sorted.subscribe(
      (sortedEvent: SohoDataGridSortedEvent) => {
        expect(sortedEvent.sortId).toEqual('desc');
        expect(sortedEvent.sortAsc).toBeFalsy();
        expect(sortedEvent.sortField).toEqual('desc');
        done();
      }
    );

    fixture.detectChanges();

    (component as any).datagrid.setSortColumn('desc', false);
  });

  it('check setColumnSort(id)', done => {
    (component as any).datagrid.sorted.subscribe(
      (sortedEvent: SohoDataGridSortedEvent) => {
        expect(sortedEvent.sortId).toEqual('desc');
        expect(sortedEvent.sortAsc).toBeTruthy();
        expect(sortedEvent.sortField).toEqual('desc');
        done();
      }
    );

    fixture.detectChanges();

    (component as any).datagrid.setSortColumn('desc');
  });

  it('check selected event', done => {
    (component as any).datagrid.selected.subscribe(
      (event: SohoDataGridSelectedEvent) => {
        expect(event.rows[0].data).toEqual(component.data[1]);
        done();
      }
    );

    fixture.detectChanges();

    (component as any).datagrid.selectRows([1]);
  });

  it('fires `addrow` when a new row is added', done => {
    fixture.detectChanges();

    const newRow = {
      id: 7,
      productId: 895640,
      productName: 'Cannondale SuperSix',
      activity: 'Assembly',
      quantity: 1,
      price: 3499.99,
      status: 'Active',
      orderDate: '2018-09-17T08:10:00.000Z',
      action: 'Action',
      rated: 0.8
    };

    (component as any).datagrid.rowAdd.subscribe((event: SohoDataGridAddRowEvent) => {
      expect(event.row).toEqual(0);
      expect(event.cell).toEqual(0);
      expect(event.value).toEqual(newRow, 'addrow');
      expect(event.oldValue).toEqual({});
      done();
    });

    (component as any).datagrid.addRow(newRow, 'top');
  });

  it('fires `cellchange` when a cell is edited', done => {
    fixture.detectChanges();

    (component as any).datagrid.cellchange.subscribe(
      (event: SohoDataGridCellChangeEvent) => {
        expect(event.row).toEqual(0);
        expect(event.cell).toEqual(2);
        expect(event.value).toEqual('Cannondale SuperSix 22');
        // expect(event.oldValue).toEqual('Compressor 1');
        done();
      }
    );

    // This is the easiest way to cause the above event to fire.
    (component.datagrid as any).datagrid.updateCellNode(
      0,
      2,
      'Cannondale SuperSix 22',
      false
    );
  });

  it('fires `rowclicked` when a cell clicked', done => {
    fixture.detectChanges();

    (component as any).datagrid.rowClicked.subscribe((event: SohoDataGridRowClicked) => {
      expect(event.row).toEqual(0);
      expect(event.cell).toEqual(2);
      expect(event.item).toEqual('');
      done();
    });
    done();
  });
});
