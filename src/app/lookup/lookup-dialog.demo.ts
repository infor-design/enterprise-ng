import { Component } from '@angular/core';
// @ts-ignore
import { SohoDataGridSelectedEvent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-lookup-dialog',
    templateUrl: './lookup-dialog.demo.html',
    standalone: false
})
export class LookupDialogDemoComponent {

  columns = [
    {
      id: 'productName',
      name: 'Product Name',
      field: 'productName'
    },
    {
      id: 'price',
      name: 'Price',
      field: 'price',
      formatter: Soho.Formatters.Integer
    }
  ];

  data = [
    { id: 1, price: 1, productName: 'Foo' },
    { id: 2, price: 2, productName: 'Bar' },
    { id: 3, price: 3, productName: 'Car' },
  ];

  selected = [];

  onSelected(e: SohoDataGridSelectedEvent) {
    this.selected = e.rows;
  }
}
