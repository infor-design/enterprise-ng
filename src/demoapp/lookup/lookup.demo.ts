import { Component } from '@angular/core';

import {
  SohoGridColumn,
  SohoLookupComponent,
  SohoDatagridSource,
  SohoSourceRequest,
  SohoResponseFunction,
} from '../../components';

import {
  checkboxColumn,
  productsColumns,
  productsData
} from './mock.data';

export interface FakeResponse {
  response: number;
  total: number;
  data: Object[];
}

@Component({
  moduleId: module.id,
  selector: 'soho-lookup-demo',
  templateUrl: 'lookup.demo.html',
  directives: [ SohoLookupComponent ]
})
export class LookupDemoComponent implements SohoDatagridSource {
  private columns_product: SohoGridColumn[];
  private columns_multi: SohoGridColumn[];

  private data_product: any[];

  // So we can bind 'this' to the source function passed to the lookup control
  private context = this; // tslint:disable-line

  constructor() {
    this.setupProducts();
  }
  requestData(filter?: string, page?: number, pagesize?: number): Promise<FakeResponse> {
    // This acts as a fake response from the server, therefore all computations
    // would be done server-side
    return new Promise((resolve) => {
      let dataResult = productsData;

      if (filter) {
        // Server filtering
        dataResult = productsData.filter( data => {
          return data.id.toString().includes(filter) ||
            data.productName.toLowerCase().includes(filter);
        });
      }

      // Server supports paging
      const startIndex = (page - 1) * pagesize;
      const endIndex = page * pagesize;
      dataResult = dataResult.slice(startIndex, endIndex);

      // Set a timeout to simulate time for server to respond
      setTimeout(() => {
        resolve({
          response: 200,
          total: productsData.length,
          data: dataResult
        });
      }, 1000);
    });
  }
  setupProducts() {
    this.columns_product = [];
    this.columns_multi = [];
    this.data_product = [];

    // Some Sample Data
    productsData.forEach( data => {
      this.data_product.push(data);
    });

    // Add checkbox for multi select Grid
    this.columns_multi.push(checkboxColumn);

    // Define Columns for the Grid.
    productsColumns.forEach(column => {
      this.columns_product.push(column);
      this.columns_multi.push(column);
    });

  }
  /**
   * If source is used for a datagrid, then the datagrid is expected to be paged.
   * This means we need to pass an options of 'paged: true' to the datagrid, this
   * can be supplemented with modifying the page sizes and current page size (can be
   * a set user configuration within the application).
   */
  source(req: SohoSourceRequest, response: SohoResponseFunction) {
    const filter = req.filterExpr && req.filterExpr[0] && req.filterExpr[0].value;
    this.requestData(filter, req.activePage, req.pagesize).then( result => {
      req.total = result.total;
      response(result.data, req);
    });
  }
}
