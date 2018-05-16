import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

import {
  checkboxColumn,
  productsColumns,
  productsData
} from './mock.data';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SohoLookupComponent } from 'ids-enterprise-ng';

export interface FakeResponse {
  response: number;
  total: number;
  data: Object[];
}

@Component({
  selector: 'soho-lookup-demo',
  templateUrl: './lookup-validation.demo.html',
})
export class LookupValidationDemoComponent implements AfterViewInit {
  @ViewChildren(SohoLookupComponent) sohoLookups: QueryList<SohoLookupComponent>;

  public columns_product: SohoDataGridColumn[];
  public columns_multi: SohoDataGridColumn[];

  public data_product: any[];
  public model: any = {
    single: null,
    multi: null,
    async: null,
  };
  public showModel = false;

  // So we can bind 'this' to the source function passed to the lookup control
  public context = this;

  public form: FormGroup;
  private formGroup: { [key: string]: any } = {};

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(this.formGroup);
    this.form.addControl('product_single', new FormControl(''));
    this.form.addControl('product_multi', new FormControl([]));
    this.form.addControl('product_async', new FormControl(''));
    this.setupProducts();
  }

  ngAfterViewInit() {
    this.sohoLookups.last.writeValue('2142201');
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
  toggleModel() {
    this.showModel = !this.showModel;
  }

  clearModel() {
    this.model.single = '';
    this.model.multi = '';
    this.model.async = '';
  }

  /**
   * If source is used for a datagrid, then the datagrid is expected to be paged.
   * This means we need to pass an options of 'paged: true' to the datagrid, this
   * can be supplemented with modifying the page sizes and current page size (can be
   * a set user configuration within the application).
   */
  source(req: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) {
    const filter = req.filterExpr && req.filterExpr[0] && req.filterExpr[0].value;
    this.requestData(filter, req.activePage, req.pagesize).then( result => {
      req.total = result.total;
      response(result.data, req);
    });
  }

  onDirty(event: SohoTrackDirtyEvent) {
    console.log('lookup.onDirty');
  }

  onPristine(event: SohoTrackDirtyEvent) {
    console.log('lookup.onPristine');
  }
}
