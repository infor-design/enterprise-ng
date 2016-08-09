import { Component } from '@angular/core';

import { SohoLookupComponent, GridColumn } from '../../components';
import { singleSelectColumns, singleSelectData} from './mock.data';

@Component({
  moduleId: module.id,
  selector: 'soho-lookup-demo',
  templateUrl: 'lookup.demo.html',
  directives: [ SohoLookupComponent ],
})
export class LookupDemoComponent {
  private columns_single: GridColumn[];
  private columns_multi: GridColumn[];
  private columns_async: GridColumn[];

  private data_single: any[];
  private data_multi: any[];
  private data_async: any[];

  constructor() {
    this.setupSingleSelect();
    this.setupMultiSelect();
    this.setupAsyncSingleSelect();
  }
  requestData() {
    // return
  }
  setupSingleSelect() {
    this.columns_single = [];
    this.data_single = [];

    // Some Sample Data
    singleSelectData.forEach( data => {
      this.data_single.push(data);
    });
    // this.data_single.push({
    //   id: 1,
    //   productId: 2142201,
    //   productName: 'Compressor',
    //   activity:  'Assemble Paint',
    //   quantity: 1,
    //   price: 210.99,
    //   status: 'OK',
    //   orderDate: new Date(2014, 12, 8),
    //   action: 'Action',
    // });
    // this.data_single.push({
    //   id: 2,
    //   productId: 2241202,
    //   productName: 'Different Compressor',
    //   activity:  'Inspect and Repair',
    //   quantity: 2,
    //   price: 210.99,
    //   status: '',
    //   orderDate: new Date(2015, 7, 3),
    //   action: 'On Hold',
    // });
    // this.data_single.push({
    //   id: 3,
    //   productId: 2342203,
    //   productName: 'Compressor',
    //   activity:  'Inspect and Repair',
    //   quantity: 1,
    //   price: 120.99,
    //   status: null,
    //   orderDate: new Date(2014, 6, 3),
    //   action: 'Action',
    // });
    // this.data_single.push({
    //   id: 4,
    //   productId: 2445204,
    //   productName: 'Another Compressor',
    //   activity:  'Assemble Paint',
    //   quantity: 3,
    //   price: 210.99,
    //   status: 'OK',
    //   orderDate: new Date(2015, 3, 3),
    //   action: 'Action',
    // });
    // this.data_single.push({
    //   id: 5,
    //   productId: 2542205,
    //   productName: 'I Love Compressors',
    //   activity:  'Inspect and Repair',
    //   quantity: 4,
    //   price: 210.99,
    //   status: 'OK',
    //   orderDate: new Date(2015, 5, 5),
    //   action: 'On Hold',
    // });
    // this.data_single.push({
    //   id: 5,
    //   productId: 2642205,
    //   productName: 'Air Compressors',
    //   activity:  'Inspect and Repair',
    //   quantity: 41,
    //   price: 120.99,
    //   status: 'OK',
    //   orderDate: new Date(2014, 6, 9),
    //   action: 'On Hold',
    // });
    // this.data_single.push({
    //   id: 6,
    //   productId: 2642206,
    //   productName: 'Some Compressor',
    //   activity:  'inspect and Repair',
    //   quantity: 41,
    //   price: 123.99,
    //   status: 'OK',
    //   orderDate: new Date(2014, 6, 9),
    //   action: 'On Hold',
    // });

    // Define Columns for the Grid.
    singleSelectColumns.forEach(column => {
      this.columns_single.push(column);
    });
    // this.columns_single.push({
    //   id: 'selectionCheckbox',
    //   sortable: false,
    //   resizable: false,
    //   width: 50,
    //   formatter: Formatters.SelectionCheckbox,
    //   align: 'center',
    // });
    // this.columns_single.push({
    //   id: 'productId',
    //   name: 'Product Id',
    //   field: 'productId',
    //   width: 140,
    //   formatter: Formatters.Readonly,
    // });
    // this.columns_single.push({
    //   id: 'productName',
    //   name: 'Product Name',
    //   sortable: false,
    //   field: 'productName',
    //   width: 250,
    //   formatter: Formatters.Hyperlink,
    // });
    // this.columns_single.push({
    //   id: 'activity',
    //   hidden: true,
    //   name: 'Activity',
    //   field: 'activity',
    //   width: 125,
    // });
    // this.columns_single.push({
    //   id: 'quantity',
    //   name: 'Quantity',
    //   field: 'quantity',
    //   width: 125,
    // });
    // this.columns_single.push({
    //   id: 'price',
    //   name: 'Price',
    //   field: 'price',
    //   width: 125,
    //   formatter: Formatters.Decimal,
    // });
    // this.columns_single.push({
    //   id: 'orderDate',
    //   name: 'Order Date',
    //   field: 'orderDate',
    //   formatter: Formatters.Date,
    //   dateFormat: 'M/d/yyyy',
    // });
  }
  setupMultiSelect() {

  }
  setupAsyncSingleSelect() {

  }
}
