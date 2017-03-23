import {
  Component,
  ViewChild,
  AfterViewInit
 } from '@angular/core';

import { SohoDataGridComponent } from '@infor/sohoxi-angular';

// tslint:disable

export const EDITORS_DATA: any[] = [
  {
    id:          0,
    productId:   214220,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    1,
    price:       210.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          1,
    productId:   214221,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    1.5,
    price:       209.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
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
    action:      'Action'
  },
  {
    id:          3,
    productId:   214223,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    2.5,
    price:       207.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
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
    action:      'Action'
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
    action:      'Action'
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
    action:      'Action'
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
    action:      'Action'
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
    action:      'Action'
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
    action:      'Action'
  }
];

function FIELD_FN(row: any, field, grid) {
   return row.status;
}

function MATCH_FN (value, row: any, field, grid) {
   return (row.status === value);
}

export const LOOKUP_COLUMNS = [
    {
      id: 'status',
      name: 'Status',
      field: 'status',
      formatter: Formatters.Text,
      sortable: false
    },
    {
      id: 'description',
      name: 'Description',
      field: 'description',
      formatter: Formatters.Text,
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
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    sortable: false,
    filterType: 'integer',
    width: 100,
    formatter: Formatters.Readonly
  },

  {
    id: 'status',
    name: 'Status',
    field: 'status',
    sortable: false,
    filterType: 'text',
    width: 100,
    formatter: Formatters.Lookup,
    editor: Editors.Lookup,
    editorOptions: STATUS_LOOKUP_OPTIONS
  },

  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    sortable: false,
    filterType: 'number',
    width: 105,
    editor: Editors.Input
  },

  //{ id: 'productName', name: 'Product Name', field: 'productName', sortable: false, filterType: 'text',    width: 150, formatter: Formatters.Hyperlink },
  //{ id: 'activity',    name: 'Activity',     field: 'activity',    sortable: false, filterType: 'text',    width: 150, formatter: Formatters.Text, editor: Editors.Lookup, editorOptions: LOOKUP_OPTIONS },
  //{ id: 'price',       name: 'Price',        field: 'price',       sortable: false, filterType: 'decimal', width: 125, formatter: Formatters.Decimal },
  //{ id: 'orderDate',   name: 'Order Date',   field: 'orderDate',   sortable: false, filterType: 'date',                formatter: Formatters.Date, dateFormat: 'M/d/yyyy' }
];

@Component({
  selector: 'soho-datagrid-editors',
  templateUrl: './datagrid-editors.demo.html'
})
export class DataGridEditorsDemoComponent implements AfterViewInit {

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor() { }

  ngAfterViewInit(): void {

    this.sohoDataGridComponent.gridOptions = {
      columns: EDITORS_COLUMNS,
      dataset: EDITORS_DATA,
      selectable: 'single',
      idProperty: 'productId',
      editable: true,
      rowHeight: 'short',
      filterable: true,
    };
  }

  export (e: any) {
    this.sohoDataGridComponent.exportToExcel('', '', null);
  }

}
