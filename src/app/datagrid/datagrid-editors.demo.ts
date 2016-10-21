import {
  Component,
  ViewChild,
  AfterViewInit
 } from '@angular/core';

import { SohoDataGridComponent } from '../../soho';

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
}

function FIELD_FN(row: any, field, grid) {
   return row.status;
}

function MATCH_FN (value, row: any, field, grid) {
   return (row.status === value);
}

export const LOOKUP_COLUMNS = [
    { id: 'status', name: 'Status', field: 'status', formatter: Formatters.Text, sortable: false },
    { id: 'description', name: 'Description', field: 'description', formatter: Formatters.Text, sortable: false }
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
  { id: 'productId',   name: 'Product Id',   field: 'productId',   sortable: false, filterType: 'integer', width: 100, formatter: Formatters.Readonly },
  { id: 'status',      name: 'Status',       field: 'status',      sortable: false, filterType: 'text',    width: 100, formatter: Formatters.Lookup,
    editor: Editors.Lookup,
    editorOptions: STATUS_LOOKUP_OPTIONS },
  { id: 'quantity',    name: 'Quantity',     field: 'quantity',    sortable: false, filterType: 'number',   width: 105 },
  //{ id: 'productName', name: 'Product Name', field: 'productName', sortable: false, filterType: 'text',    width: 150, formatter: Formatters.Hyperlink },
  //{ id: 'activity',    name: 'Activity',     field: 'activity',    sortable: false, filterType: 'text',    width: 150, formatter: Formatters.Text, editor: Editors.Lookup, editorOptions: LOOKUP_OPTIONS },
  //{ id: 'price',       name: 'Price',        field: 'price',       sortable: false, filterType: 'decimal', width: 125, formatter: Formatters.Decimal },
  //{ id: 'orderDate',   name: 'Order Date',   field: 'orderDate',   sortable: false, filterType: 'date',                formatter: Formatters.Date, dateFormat: 'M/d/yyyy' }
];

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
  },
  {
    id:          10,
    productId:   214230,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    6,
    price:       200.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          11,
    productId:   214231,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    6.5,
    price:       199.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          12,
    productId:   214232,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    7,
    price:       198.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          13,
    productId:   214233,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    7.5,
    price:       197.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          14,
    productId:   214234,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    8,
    price:       196.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          15,
    productId:   214235,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    8.5,
    price:       195.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          16,
    productId:   214236,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    9,
    price:       194.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          17,
    productId:   214237,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    9.5,
    price:       193.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          18,
    productId:   214238,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    10,
    price:       192.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          19,
    productId:   214239,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    10.5,
    price:       191.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          20,
    productId:   214240,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    11,
    price:       190.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          21,
    productId:   214241,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    11.5,
    price:       189.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          22,
    productId:   214242,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    12,
    price:       188.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          23,
    productId:   214243,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    12.5,
    price:       187.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          24,
    productId:   214244,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    13,
    price:       186.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          25,
    productId:   214245,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    13.5,
    price:       185.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          26,
    productId:   214246,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    14,
    price:       184.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          27,
    productId:   214247,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    14.5,
    price:       183.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          28,
    productId:   214248,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    15,
    price:       182.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          29,
    productId:   214249,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    15.5,
    price:       181.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          30,
    productId:   214250,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    16,
    price:       180.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          31,
    productId:   214251,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    16.5,
    price:       179.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          32,
    productId:   214252,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    17,
    price:       178.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          33,
    productId:   214253,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    17.5,
    price:       177.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          34,
    productId:   214254,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    18,
    price:       176.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          35,
    productId:   214255,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    18.5,
    price:       175.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          36,
    productId:   214256,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    19,
    price:       174.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          37,
    productId:   214257,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    19.5,
    price:       173.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          38,
    productId:   214258,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    20,
    price:       172.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          39,
    productId:   214259,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    20.5,
    price:       171.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          40,
    productId:   214260,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    21,
    price:       170.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          41,
    productId:   214261,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    21.5,
    price:       169.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          42,
    productId:   214262,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    22,
    price:       168.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          43,
    productId:   214263,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    22.5,
    price:       167.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          44,
    productId:   214264,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    23,
    price:       166.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          45,
    productId:   214265,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    23.5,
    price:       165.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          46,
    productId:   214266,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    24,
    price:       164.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          47,
    productId:   214267,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    24.5,
    price:       163.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          48,
    productId:   214268,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    25,
    price:       162.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          49,
    productId:   214269,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    25.5,
    price:       161.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          50,
    productId:   214270,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    26,
    price:       160.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          51,
    productId:   214271,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    26.5,
    price:       159.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          52,
    productId:   214272,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    27,
    price:       158.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          53,
    productId:   214273,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    27.5,
    price:       157.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          54,
    productId:   214274,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    28,
    price:       156.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          55,
    productId:   214275,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    28.5,
    price:       155.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          56,
    productId:   214276,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    29,
    price:       154.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          57,
    productId:   214277,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    29.5,
    price:       153.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          58,
    productId:   214278,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    30,
    price:       152.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          59,
    productId:   214279,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    30.5,
    price:       151.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          60,
    productId:   214280,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    31,
    price:       150.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          61,
    productId:   214281,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    31.5,
    price:       149.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          62,
    productId:   214282,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    32,
    price:       148.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          63,
    productId:   214283,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    32.5,
    price:       147.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          64,
    productId:   214284,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    33,
    price:       146.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          65,
    productId:   214285,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    33.5,
    price:       145.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          66,
    productId:   214286,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    34,
    price:       144.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          67,
    productId:   214287,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    34.5,
    price:       143.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          68,
    productId:   214288,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    35,
    price:       142.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          69,
    productId:   214289,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    35.5,
    price:       141.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          70,
    productId:   214290,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    36,
    price:       140.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          71,
    productId:   214291,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    36.5,
    price:       139.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          72,
    productId:   214292,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    37,
    price:       138.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          73,
    productId:   214293,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    37.5,
    price:       137.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          74,
    productId:   214294,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    38,
    price:       136.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          75,
    productId:   214295,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    38.5,
    price:       135.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          76,
    productId:   214296,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    39,
    price:       134.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          77,
    productId:   214297,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    39.5,
    price:       133.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          78,
    productId:   214298,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    40,
    price:       132.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          79,
    productId:   214299,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    40.5,
    price:       131.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          80,
    productId:   214300,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    41,
    price:       130.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          81,
    productId:   214301,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    41.5,
    price:       129.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          82,
    productId:   214302,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    42,
    price:       128.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          83,
    productId:   214303,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    42.5,
    price:       127.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          84,
    productId:   214304,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    43,
    price:       126.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          85,
    productId:   214305,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    43.5,
    price:       125.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          86,
    productId:   214306,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    44,
    price:       124.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          87,
    productId:   214307,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    44.5,
    price:       123.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          88,
    productId:   214308,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    45,
    price:       122.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          89,
    productId:   214309,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    45.5,
    price:       121.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          90,
    productId:   214310,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    46,
    price:       120.99000000000001,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          91,
    productId:   214311,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    46.5,
    price:       119.99000000000001,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          92,
    productId:   214312,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    47,
    price:       118.99000000000001,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          93,
    productId:   214313,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    47.5,
    price:       117.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          94,
    productId:   214314,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    48,
    price:       116.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          95,
    productId:   214315,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    48.5,
    price:       115.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          96,
    productId:   214316,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    49,
    price:       114.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          97,
    productId:   214317,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    49.5,
    price:       113.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          98,
    productId:   214318,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    50,
    price:       112.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action'
  },
  {
    id:          99,
    productId:   214319,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    50.5,
    price:       111.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action'
  }
];
