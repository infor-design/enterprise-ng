import { Component } from '@angular/core';

import { SohoLookupComponent, GridColumn } from '../../components';
import { productsColumns, productsData} from './mock.data';

@Component({
  moduleId: module.id,
  selector: 'soho-lookup-demo',
  templateUrl: 'lookup.demo.html',
  directives: [ SohoLookupComponent ],
})
export class LookupDemoComponent {
  private columns_product: GridColumn[];
  private columns_async: GridColumn[];

  private data_product: any[];
  private data_async: any[];

  constructor() {
    this.setupProducts();
    this.setupAsyncSingleSelect();
  }
  requestData() {
    // return
  }
  setupProducts() {
    this.columns_product = [];
    this.data_product = [];

    // Some Sample Data
    productsData.forEach( data => {
      this.data_product.push(data);
    });

    // Define Columns for the Grid.
    productsColumns.forEach(column => {
      this.columns_product.push(column);
    });
  }
  setupAsyncSingleSelect() {

  }
}
