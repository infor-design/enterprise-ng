import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import {
  DataGridService,
  GridRequest,
  GridColumn
} from '../../components/datagrid';

declare var Formatters: any;

@Injectable()
export class DataGridDemoService extends DataGridService {

  private columns: Array<GridColumn> = Array<GridColumn>();
  private data: Array<any> = Array<any>();

  getColumns(): Array<GridColumn> {
    return this.columns;
  }

  getData(req: GridRequest): Observable<Array<any>> {
    return Observable.of(this.data);
  }

  constructor() {
    super();
/* tslint:disable */
    this.columns.push({id: 'selectionCheckbox', sortable: false, resizable: false, width: 50, formatter: 'SelectionCheckbox', align: 'center'});
    this.columns.push({id: 'drillDown', name: 'Drill In', field: '', formatter: Formatters.Drilldown, cssClass: 'l-center-text', click: function (e: any, args: any) { console.log('clicked', args); }});
    this.columns.push({id: 'productId', hidden: true, name: 'Product Id', field: 'productId', formatter: Formatters.Readonly });
    this.columns.push({id: 'productDesc', name: 'Product Desc', sortable: false, field: 'productName', formatter: Formatters.Hyperlink, click: function (e: any, args: any) { console.log('link was clicked', args); }});
    this.columns.push({id: 'activity', name: 'Activity', field: 'activity' });
    this.columns.push({id: 'quantity', name: 'Quantity', field: 'quantity' });
    this.columns.push({id: 'activity', name: 'Password', field: 'activity', formatter: Formatters.Password, inputType: 'password' });
    this.columns.push({id: 'price1', name: 'Actual long Price', field: 'price', formatter: Formatters.Decimal });
    this.columns.push({id: 'price2', name: 'Actual long Price', align: 'right', field: 'price', formatter: Formatters.Decimal });
    this.columns.push({id: 'price2', name: 'Price', field: 'price', formatter: Formatters.Integer });
    this.columns.push({id: 'orderDate', name: 'Order Date', field: 'orderDate', formatter: Formatters.DateTime, dateFormat: 'yy/MM/dd'});
    this.columns.push({id: 'status', name: 'Status', field: 'status', formatter: Formatters.Text });
    this.columns.push({id: 'alert', name: 'Alert', field: 'quantity', formatter: Formatters.Alert, ranges: [{ 'min': 0, 'max': 8, 'classes': 'info', 'text': ' ' }, { 'min': 9, 'max': 1000, 'classes': 'error', 'text': 'value' }] });
    this.columns.push({id: 'ordered', name: 'Ordered', field: 'ordered', formatter: Formatters.Checkbox });
    this.columns.push({id: '', name: 'Actions', field: '', formatter: Formatters.Actions, menuId: 'grid-actions-menu', selected: function (e: any, a: any) { console.log(e, a); }});
    this.columns.push({ id: 'nested', name: 'Nested Prop', field: 'setting.optionOne', formatter: Formatters.Text });
    this.columns.push({ id: 'comment', name: 'Comment', field: 'comment', formatter: Formatters.TextArea, width: 100 });

    this.data.push({id: 1, productId: 2142201, productName: 'Compressor', activity: 'Assemble Paint', quantity: 1, price: 210.99, status: 'OK', orderDate: new Date(2014, 12, 8), action: 'Action', ordered: 1, setting: { optionOne: 'One', optionTwo: 'One' }});
    this.data.push({id: 2, productId: 2241202, productName: 'Different Compressor', activity: 'Inspect and Repair', quantity: 2, price: 210.99, status: '', orderDate: new Date(2015, 7, 3), action: 'On Hold', ordered: true, setting: { optionOne: 'One', optionTwo: 'One' }});
    this.data.push({id: 3, productId: 2342203, productName: 'Compressor', activity: 'Inspect and Repair', quantity: 1, price: 120.99, status: null, orderDate: new Date(2014, 6, 3), action: 'Action', ordered: true, comment: 'Dynamic harness out-of-the-box /n syndicate models deliver. Disintermediate, technologies /n scale deploy social streamline, methodologies, killer podcasts innovate. Platforms A-list disintermediate, value visualize dot-com /n tagclouds platforms incentivize interactive vortals disintermediate networking, webservices envisioneer; tag share value-added, disintermediate, revolutionary.'});
    this.data.push({ id: 4, productId: 2445204, productName: 'Another Compressor', activity: 'Assemble Paint', quantity: 9, price: 210.99, status: 'OK', orderDate: new Date(2015, 3, 3), action: 'Action', ordered: true });
    this.data.push({ id: 5, productId: 2542205, productName: 'I Love Compressors', activity: 'Inspect and Repair', quantity: 4, price: 18.00, status: 'OK', orderDate: new Date(2015, 5, 5), action: 'On Hold', ordered: false });
    this.data.push({ id: 5, productId: 2642205, productName: 'Air Compressors', activity: 'Inspect and Repair', quantity: 18, price: 9, status: 'OK', orderDate: new Date(2014, 6, 9), action: 'On Hold', comment: 'B2C ubiquitous communities maximize B2C synergies extend dynamic revolutionize, world-class robust peer-to-peer. Action-items semantic technologies clicks-and-mortar iterate min' });
    this.data.push({ id: 6, productId: 2642206, productName: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: 123.99, status: 'OK', orderDate: new Date(2014, 6, 9), action: 'On Hold', ordered: 0 });
    this.data.push({ id: 7, productId: 2642206, productName: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: '100.99', status: 'OK', orderDate: new Date(2014, 6, 9, 12, 12, 12), action: 'On Hold', ordered: 0 });
/* tslint:enable */
  }
}
