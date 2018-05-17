
import { of,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  SohoDataGridService,
  SohoGridColumnFilterTypes
} from '../../soho/datagrid';

declare var Formatters: any;

@Injectable()
export class DataGridDemoService extends SohoDataGridService {

  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  public data: Array<any> = Array<any>();

  public addColumn(column: SohoDataGridColumn) {
    this.getColumns().unshift(column);
  }

  getColumns(): Array<SohoDataGridColumn> {
    if (this.columns.length === 0) {
      this.init();
    }
    return this.columns;
  }

  getData(req: SohoDataGridSourceRequest): Observable<Array<any>> {
    return of(this.data);
  }

  constructor() {
    super();
  }

  init() {
    /* tslint:disable */
    this.columns.push({
      id: 'selectionCheckbox',
      sortable: false,
      resizable: false,
      width: 50,
      formatter: Soho.Formatters.SelectionCheckbox,
      align: 'center'
    });

    this.columns.push({
      id: 'drilldown',
      hidden: true,
      name: 'Drill In',
      field: '',
      formatter: Soho.Formatters.Drilldown,
      cssClass: 'l-center-text',
      click: (e: any, args: any) => { console.log('clicked', args); },
      reorderable: false
    });

    this.columns.push(
      {
        id: 'productId',
        hidden: true,
        name: 'Product Id',
        field: 'productId',
        formatter: Soho.Formatters.Readonly
      });

    /*
      It is possible to use the card here but its not the prefered approach.

      this.columns.push({
        id: 'productDesc',
        filterType: <any>SohoGridColumnFilterTypes.Text,
        name: 'Product Desc',
        sortable: false,
        field: 'productName',
        formatter: Soho.Formatters.Template,
        template: '<p class="datagrid-row-heading">{{productId}}</p><p class="datagrid-row-subheading">{{productName}}</p>',
        click: (e: any, args: any) => { console.log('link was clicked', args); }
      });

    */

    this.columns.push({
      id: 'productDesc',
      filterType: <any>SohoGridColumnFilterTypes.Text,
      name: 'Product Desc',
      sortable: false,
      field: 'productName',
      formatter: Soho.Formatters.Text,
    });

    this.columns.push({
      id: 'productDesc',
      filterType: <any>SohoGridColumnFilterTypes.Text,
      name: 'Product Desc',
      sortable: false,
      field: 'productName',
      formatter: Soho.Formatters.Template,
      template: '<p class="datagrid-row-heading">{{productId}}</p><p class="datagrid-row-subheading">{{productName}}</p>',
      click: (e: any, args: any) => { console.log('link was clicked', args); }
    });

    this.columns.push({
      id: 'activity',
      name: 'Activity',
      filterType: <any>SohoGridColumnFilterTypes.Text,
      field: 'activity'
    });

    this.columns.push({
      id: 'quantity',
      name: 'Quantity',
      filterType: <any>SohoGridColumnFilterTypes.Text,
      field: 'quantity'
    });

    this.columns.push({
      id: 'activity',
      hidden: true,
      name: 'Password',
      field: 'activity',
      formatter: Soho.Formatters.Password,
      inputType: 'password'
    });

    this.columns.push({
      id: 'price1',
      name: 'Actual long Price',
      filterType: <any>SohoGridColumnFilterTypes.Decimal,
      field: 'price',
      formatter: Soho.Formatters.Decimal
    });

    this.columns.push({
      id: 'price2', hidden: true, name: 'Actual long Price', align: 'right', field: 'price', formatter: Soho.Formatters.Decimal
    });

    this.columns.push({
      id: 'price2', hidden: true, name: 'Price', field: 'price', formatter: Soho.Formatters.Integer
    });

    this.columns.push({
      id: 'price4',
      hidden: true,
      name: 'Price - special formatted',
      filterType: <any>SohoGridColumnFilterTypes.Decimal,
      field: 'price',
      formatter: Soho.Formatters.Decimal,
      numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 6 }
    });

    this.columns.push({
      id: 'orderDate',
      width: 300,
      name: 'Order Date',
      filterType: <any>SohoGridColumnFilterTypes.Date,
      field: 'orderDate',
      formatter: Soho.Formatters.Date,
      dateFormat: Soho.Locale.calendar().dateFormat.datetime // @todo
    });

    this.columns.push({
      id: 'status',
      name: 'Status',
      filterType: <any>SohoGridColumnFilterTypes.Select,
      options: [{ value: "ok", label: "OKAY" }, { value: "OK", label: "BIG OKAY" }, { value: "error", label: "ERROR" }, { value: "success", label: "SUCCESS" }],
      field: 'status',
      formatter: Soho.Formatters.Dropdown
    });

    this.columns.push(
      {
        id: 'alert',
        hidden: true,
        name: 'Alert',
        field: 'quantity',
        formatter: Soho.Formatters.Alert,
        ranges: [{ 'min': 0, 'max': 8, 'classes': 'info', 'text': ' ' }, { 'min': 9, 'max': 1000, 'classes': 'error', 'text': 'value' }]
      });

    this.columns.push({ id: 'ordered', hidden: true, name: 'Ordered', field: 'ordered', formatter: Soho.Formatters.Checkbox });
    this.columns.push({ id: '', hidden: false, name: 'Actions', field: '',
      formatter: Soho.Formatters.Actions, menuId: 'grid-actions-menu', selected: (e, a) => { this.onActionHandler(a); } });
    this.columns.push({ id: 'nested', hidden: true, name: 'Nested Prop', field: 'setting.optionOne', formatter: Soho.Formatters.Text });
    this.columns.push({ id: 'comment', hidden: true, name: 'Comment', field: 'comment', formatter: Soho.Formatters.Textarea, width: 100 });

    this.data.push({ id: 1, productId: 2142201, productName: 'Compressor', activity: 'Assemble Paint', quantity: 1, price: 210.99, status: 'ok', orderDate: new Date(2014, 12, 8), action: 'Action', ordered: 1, setting: { optionOne: 'One', optionTwo: 'One' } });
    this.data.push({ id: 2, productId: 2241202, productName: 'Different Compressor', activity: 'Inspect and Repair', quantity: 2, price: 210.99, status: '', orderDate: new Date(2015, 7, 3), action: 'On Hold', ordered: true, setting: { optionOne: 'One', optionTwo: 'One' } });
    this.data.push({ id: 3, productId: 2342203, productName: 'Compressor', activity: 'Inspect and Repair', quantity: 1, price: 120.99, status: null, orderDate: new Date(2014, 6, 3), action: 'Action', ordered: true, comment: 'Dynamic harness out-of-the-box /n syndicate models deliver. Disintermediate, technologies /n scale deploy social streamline, methodologies, killer podcasts innovate. Platforms A-list disintermediate, value visualize dot-com /n tagclouds platforms incentivize interactive vortals disintermediate networking, webservices envisioneer; tag share value-added, disintermediate, revolutionary.' });
    this.data.push({ id: 4, productId: 2445204, productName: 'Another Compressor', activity: 'Assemble Paint', quantity: 9, price: 210.99, status: 'error', orderDate: new Date(2015, 3, 3), action: 'Action', ordered: true });
    this.data.push({ id: 5, productId: 2542205, productName: 'I Love Compressors', activity: 'Inspect and Repair', quantity: 4, price: 18.00, status: 'OK', orderDate: new Date(2015, 5, 5), action: 'On Hold', ordered: false });
    this.data.push({ id: 5, productId: 2642205, productName: 'Air Compressors', activity: 'Inspect and Repair', quantity: 18, price: 9, status: 'OK', orderDate: new Date(2014, 6, 9), action: 'On Hold', comment: 'B2C ubiquitous communities maximize B2C synergies extend dynamic revolutionize, world-class robust peer-to-peer. Action-items semantic technologies clicks-and-mortar iterate min' });
    this.data.push({ id: 6, productId: 2642206, productName: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: 123.99, status: 'OK', orderDate: new Date(2014, 6, 9), action: 'On Hold', ordered: 0 });
    this.data.push({ id: 7, productId: 2642206, productName: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: '100.99', status: 'OK', orderDate: new Date(2014, 6, 9, 12, 12, 12), action: 'On Hold', ordered: 0 });
    /* tslint:enable */
  }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}
