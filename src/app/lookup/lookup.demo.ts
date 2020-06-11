import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoLookupComponent } from 'ids-enterprise-ng';
import { TemplateService } from './template.service';
import { Asset } from './asset';

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
  selector: 'app-lookup-demo',
  templateUrl: 'lookup.demo.html',
})
export class LookupDemoComponent implements OnInit {
  @ViewChild('templateId', { static: true }) sohoLookupComponent: SohoLookupComponent;
  @ViewChild('toggleButtons', { static: true }) sohoLookupRef: SohoLookupComponent;

  public columns_product: SohoDataGridColumn[];
  public columns_multi: SohoDataGridColumn[];
  public entityIds: string;
  public data_product: any[];
  public customButtons: SohoModalButton[] = [
    {
      text: 'Enable', click: () => {
        const api = this.sohoLookupRef.modal.buttonsetAPI;
        api.at(2).disabled = false;
        api.at(3).disabled = false;
      }
    },
    {
      text: 'Disable', click: () => {
        const api = this.sohoLookupRef.modal.buttonsetAPI;
        api.at(2).disabled = true;
        api.at(3).disabled = true;
      }
    },
    { text: 'Cancel', click: () => { this.sohoLookupRef.modal.close(); } },
    { text: 'Submit', click: () => { this.sohoLookupRef.modal.close(); }, isDefault: true }
  ];
  public model: any = {
    single: null,
    singleexists: '1212121',
    singleobject: null,
    singleobjectexists: {
      id: 1,
      productId: 2142201,
      productName: 'Compressor',
      activity: 'Assemble Paint',
      quantity: 1,
      price: 210.99,
      status: 'OK',
      orderDate: new Date(2014, 12, 8),
      action: 'Action',
    },
    multi: null,
    multiexists: ['2445204', '2342203'],
    multiobject: null,
    multiobjectexists: [{
      id: 1,
      productId: 2142201,
      productName: 'Compressor',
      activity: 'Assemble Paint',
      quantity: 1,
      price: 210.99,
      status: 'OK',
      orderDate: new Date(2014, 12, 8),
      action: 'Action',
    }, {
      id: 4,
      productId: 2142204,
      productName: 'Another Compressor',
      activity: 'Assemble Paint',
      quantity: 3,
      price: 210.99,
      status: 'OK',
      orderDate: new Date(2014, 12, 8),
      action: 'Action',
    }],
    async: null,
    asyncexists: '2342203',
  };
  public showModel = false;
  public templates: Array<Asset>;

  // So we can bind 'this' to the source function passed to the lookup control
  public context = this;

  constructor(private service: TemplateService) {
    this.setupProducts();
  }

  ngOnInit(): void {
    const lookupOptions = {
      columns: this.getAssetColumns(),
      sortable: false,
      alternateRowShading: false,
      selectable: 'multiple',
      clickToSelect: true,
      paging: true,
      toolbar: {
        results: true,
        dateFilter: false,
        keywordFilter: true,
        advancedFilter: false,
        actions: false,
        views: true,
        rowHeight: true,
        collapsibleFilter: false,
        fullWidth: false,
      }
    } as SohoDataGridOptions;
    this.sohoLookupComponent.options = lookupOptions;
    this.service.getAvailableTemplates().subscribe(result => {
      this.templates = result.data;
    });
  }

  private getAssetColumns(): Array<SohoDataGridColumn> {
    const columns = [
      {
        id: 'selectionCheckbox',
        sortable: false,
        formatter: Soho.Formatters.SelectionCheckbox,
        align: 'center'
      },
      {
        id: 'templateId',
        sortable: false,
        field: 'templateId'
      },
      {
        id: 'templateDisplayName',
        name: 'Template',
        field: 'displayName',
        sortable: false
      }];
    const sohoGridColumns: Array<SohoDataGridColumn> = [];
    columns.forEach(column => {
      const sohoGridColumn = {
        name: column.name,
        field: column.field,
        formatter: column.formatter,
        sortable: column.sortable,
        id: column.id,
      } as SohoDataGridColumn;
      sohoGridColumns.push(sohoGridColumn);
    });
    return sohoGridColumns;
  }

  requestData(filter?: string, page?: number, pagesize?: number): Promise<FakeResponse> {
    // This acts as a fake response from the server, therefore all computations
    // would be done server-side
    return new Promise((resolve) => {
      let dataResult = productsData;

      if (filter) {
        // Server filtering
        dataResult = productsData.filter(data => {
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
    productsData.forEach(data => {
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

  /**
   * If source is used for a datagrid, then the datagrid is expected to be paged.
   * This means we need to pass an options of 'paged: true' to the datagrid, this
   * can be supplemented with modifying the page sizes and current page size (can be
   * a set user configuration within the application).
   */
  source(req: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) {
    const filter = req.filterExpr && req.filterExpr[0] && req.filterExpr[0].value;
    this.requestData(filter, req.activePage, req.pagesize).then(result => {
      req.total = result.total;
      response(result.data, req);
    });
  }

  // Example of calling before show to cancel the opening by returning false
  onBeforeShow = (api: any, response: any) => {
    console.log(api, response);
    // 1. Do something like an ajax call.

    // 2. if no rows and you dont want to open
    // return false; // and we will never open

    // 3. If there was rows (in this example we dont show this)
    // 4. Set the dynamic columns and _dataset
    // api.settings.options.columns = data[0].columns;
    // api.settings.options.dataset = data[0].dataset;
    // 5. And the response which will open the dialog
    response();
  }

  // Example of custom displaying
  onField = (row: any, field: any, grid: any) => {
    console.log(row, field, grid, this);
    return row.productId + '|' + row.productName;
  }

  // Example of custom matching
  onMatch(value: any, row: any, field: any, grid: any) {
    console.log(row, field, grid);
    return ((row.productId + '|' + row.productName) === value);
  }

  onDirty(event: SohoTrackDirtyEvent) {
    console.log('lookup.onDirty', event);
  }

  onPristine(event: SohoTrackDirtyEvent) {
    console.log('lookup.onPristine', event);
  }

  onChange(event: any) {
    console.log('lookup.onchange', event);
  }

  onAfterOpen(event: any) {
    console.log('lookup.onafteropen', event);
  }

  onBeforeOpen(event: any) {
    console.log('lookup.onbeforeopen', event);
  }
}
