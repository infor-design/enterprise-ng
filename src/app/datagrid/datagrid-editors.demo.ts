import {
  Component,
  ViewChild,
  OnInit
 } from '@angular/core';

// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

export const EDITORS_DATA: any[] = [
  {
    id:          0,
    productId:   214220,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    1,
    price:       210.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    favorite:    true
  },
  {
    id:          1,
    productId:   214221,
    activity:    'Assemble Paint',
    price:       209.99,
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    favorite:    false
  },
  {
    id:          2,
    productId:   214222,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    2,
    price:       208.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    favorite:    true
  },
  {
    id:          3,
    productId:   214223,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    price:       207.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    favorite:    true
  },
  {
    id:          4,
    productId:   214224,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    3,
    price:       206.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    favorite:    false
  },
  {
    id:          5,
    productId:   214225,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    3.5,
    price:       205.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    favorite:    false
  },
  {
    id:          6,
    productId:   214226,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    4,
    price:       204.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    favorite:    true
  },
  {
    id:          7,
    productId:   214227,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    4.5,
    price:       203.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    favorite:    true
  },
  {
    id:          8,
    productId:   214228,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    5,
    price:       202.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    favorite:    false
  },
  {
    id:          9,
    productId:   214229,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    5.5,
    price:       201.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    favorite:    false
  }
];

function FIELD_FN(row: any, _field: any, _grid: any) {
   return row.status;
}

function MATCH_FN (value: any, row: any, _field: any, _grid: any) {
   return (row.status === value);
}

export const LOOKUP_COLUMNS = [
    {
      id: 'status',
      name: 'Status',
      field: 'status',
      formatter: Soho.Formatters.Text,
      sortable: false
    },
    {
      id: 'description',
      name: 'Description',
      field: 'description',
      formatter: Soho.Formatters.Text,
      sortable: false
    }
];

export const LOOKUP_DATA = [
  { status: 'Late', description: 'Item is late'},
  { status: 'Active', description: 'Active'},
  { status: 'Inactive', description: 'Inactive'},
  { status: 'On Hold', description: 'Item is currently on hold'},
  { status: '', description: 'Unknown'}
];

/* tslint:disable */
export const STATUS_LOOKUP_OPTIONS = {
   field: FIELD_FN,
   match: MATCH_FN,
   options: {
     field: 'status',
     columns: LOOKUP_COLUMNS,
     dataset: LOOKUP_DATA,
     selectable: 'single',
     toolbar: {title: 'Business Party', results: true, dateFilter: false, keywordFilter: false, advancedFilter: true, actions: true, views: true, rowHeight: true }
}};

export const EDITORS_COLUMNS: any[] = [
  {
    id: 'selectionCheckbox',
    sortable: false,
    resizable: false,
    formatter: Soho.Formatters.SelectionCheckbox,
    align: 'center'
  },

  {
    id: 'rowStatus',
    sortable: false,
    resizable: false,
    formatter: Soho.Formatters.Status,
    width: 10,
    align: 'center'
  },

  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    sortable: false,
    filterType: 'integer',
    width: 100,
    formatter: Soho.Formatters.Readonly
  },

  {
    id: 'productName',
    name: 'Product Name',
    field: 'productName',
    sortable: false,
    filterType: 'text',
    width: 150,
    formatter: Soho.Formatters.Hyperlink,
    required: true,
    validate: 'required'
  },

  {
    id: 'status',
    name: 'Status',
    field: 'status',
    sortable: false,
    filterType: 'text',
    width: 100,
    formatter: Soho.Formatters.Lookup,
    editor: Soho.Editors.Lookup,
    editorOptions: STATUS_LOOKUP_OPTIONS
  },

  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    sortable: false,
    filterType: 'number',
    width: 105,
    editor: Soho.Editors.Input,
    required: true,
    validate: 'required'
  },

  {
    id: 'favorite',
    name: 'Favorite',
    field: 'favorite',
    sortable: false,
    width: 105,
    showEmpty: true,
    formatter: Soho.Formatters.Favorite,
    editor: Soho.Editors.Favorite
  }

  //{ id: 'activity',    name: 'Activity',     field: 'activity',    sortable: false, filterType: 'text',    width: 150, formatter: Soho.Formatters.Text, editor: Soho.Editors.Lookup, editorOptions: LOOKUP_OPTIONS },
  //{ id: 'price',       name: 'Price',        field: 'price',       sortable: false, filterType: 'decimal', width: 125, formatter: Soho.Formatters.Decimal },
  //{ id: 'orderDate',   name: 'Order Date',   field: 'orderDate',   sortable: false, filterType: 'date',                formatter: Soho.Formatters.Date, dateFormat: 'M/d/yyyy' }
];

@Component({
  selector: 'soho-datagrid-editors',
  templateUrl: 'datagrid-editors.demo.html'
})
export class DataGridEditorsDemoComponent implements OnInit {

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions: any = null;

  ngOnInit(): void {
    this.gridOptions = {
      columns: EDITORS_COLUMNS,
      dataset: EDITORS_DATA,
      clickToSelect: false,
      selectable: 'multiple',
      idProperty: 'productId',
      editable: true,
      rowHeight: 'small',
      filterable: true,
      showDirty: true,
      stretchColumn: 'favorite'
    };
  }

  showErrors() {
    // show error on dirty rows
    // would be done when make a call to the back end and a row has
    // an error, want to use rowStatus to show the row in error
    // but this clears the dirtyRows
    let dirtyRows: Array<any> | undefined | null = this.sohoDataGridComponent?.dirtyRows();
    if (!dirtyRows) {
      return;
    }
    console.log('dirtyRows().length = ' + dirtyRows?.length);

    for (let i = 0, l = dirtyRows.length; i < l; i++) {
      var dirtyRow = (dirtyRows as any)[i];
      if (dirtyRow.rowStatus.icon === 'dirty') {
        this.sohoDataGridComponent?.rowStatus(dirtyRow.id, 'dirtyerror', 'Testing');
      } else {
        this.sohoDataGridComponent?.rowStatus(dirtyRow.id, 'error', 'Testing');
      }
    }
    dirtyRows = this.sohoDataGridComponent?.dirtyRows();
    console.log('dirtyRows().length = ' + dirtyRows?.length);
  }


  onActionSelected(event: SohoContextMenuEvent) {
    const action = event.args.attr('data-action');

    if (action === 'export') {
     this.export();
    }
    if (action === 'show-errors') {
     this.showErrors();
    }
    if (action === 'clear-status') {
     this.clearStatus();
    }
    if (action === 'show-row-error') {
     this.showRowError();
    }
    if (action === 'validate-row') {
     this.validateRow();
    }
    if (action === 'validate-all') {
     this.validateAll();
    }
  }

  showRowError () {
    this.sohoDataGridComponent?.showRowError(2, 'This row has a custom error message.', 'error');
  }

  validateRow() {
    this.sohoDataGridComponent?.validateRow(1);
  }

  validateAll() {
    this.sohoDataGridComponent?.validateAll();
  }

  clearStatus() {
    let dirtyRows: Array<any> | null | undefined = this.sohoDataGridComponent?.dirtyRows();
    let allRows: Array<any>  | null | undefined = this.sohoDataGridComponent?.dataset;

    if (!dirtyRows || !allRows) {
      return;
    }

    console.log('dirtyRows().length = ' + dirtyRows.length);
    for (let i = 0, l = allRows.length; i < l; i++) {
      var row = allRows[i];
      if (row.rowStatus && row.rowStatus.icon === 'dirtyerror') {
        this.sohoDataGridComponent?.rowStatus(row.id, 'dirty', '');
      } else {
        this.sohoDataGridComponent?.rowStatus(row.id, '', '');
      }
    }
    this.sohoDataGridComponent?.clearAllErrors();
  }

  export () {
    this.sohoDataGridComponent?.exportToExcel('', '');
  }

  public onBeforeEnterEditMode(event: SohoDataGridEditModeEvent) {
    console.log(event);
  }

  public onEnterEditMode(event: SohoDataGridEditModeEvent) {
    console.log(event);
  }

  public onExitEditMode(event:  SohoDataGridEditModeEvent) {
    console.log(event);
  }

  private cnt = 1;

  // Note: If we called this onKeyDown we would get the NG keydown firing as well.
  public onKeyDown(event: SohoDataGridKeyDownEvent) {
    if (event.e && event.e.which === 13 && this.sohoDataGridComponent &&
      this.sohoDataGridComponent.dataset &&
      this.sohoDataGridComponent.dataset.length &&
      this.sohoDataGridComponent.dataset.length - 1 === event.args.row &&
      event.args.cell === 4) {
      this.sohoDataGridComponent?.addRow({id: (parseInt('214229', 10) + this.cnt).toString() }, 'bottom');
      this.cnt++;
      return event.response(false);
    }
  }
}
