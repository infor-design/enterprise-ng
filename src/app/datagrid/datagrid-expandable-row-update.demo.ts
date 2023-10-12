import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
  selector: 'app-datagrid-expandable-row-update-demo',
  templateUrl: 'datagrid-expandable-row-update.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridExpandableRowUpdateDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  constructor(
  ) { }

  gridOptions?: SohoDataGridOptions = undefined;

  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {
  }

  private buildGridOptions(): SohoDataGridOptions {
    const PAGING_COLUMNS = [{
      id: 'productId',
      name: 'Product Id',
      field: 'productId',
      sortable: false,
      filterType: 'text',
      formatter: Soho.Formatters.Expander,
    },
    {
      id: 'productName',
      name: 'Product Name',
      field: 'productName',
      sortable: false,
      filterType: 'text',
      filterConditions: ['equals', 'contains'],
      width: 150,
      formatter: Soho.Formatters.Hyperlink,
    },
    {
      id: 'activity',
      name: 'Activity',
      field: 'activity',
      sortable: false,
      filterType: 'text',
      hidden: true,
    },
    {
      id: 'quantity',
      name: 'Quantity',
      field: 'quantity',
      sortable: false,
      filterType: 'integer',
      formatter: Soho.Formatters.Integer,
      editor: Soho.Editors.Input
    },
    {
      id: 'price',
      name: 'Price',
      field: 'price',
      sortable: false,
      filterType: 'decimal',
      formatter: Soho.Formatters.Decimal,
      editor: Soho.Editors.Input
    },
    {
      id: 'orderDate',
      name: 'Order Date',
      field: 'orderDate',
      sortable: false,
      filterType: 'date',
      formatter: Soho.Formatters.Date,
      dateFormat: 'M/d/yyyy',
      hidden: true
    }];

    const PAGING_DATA = [
      {
        id: 0,
        productId: 214220,
        productName: 'Compressor 1',
        activity: 'Assemble Paint',
        quantity: 1,
        price: 210.99,
        status: 'Active',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.32,
      },
      {
        id: 1,
        productId: 214221,
        productName: 'Compressor 2',
        activity: 'Assemble Paint',
        quantity: 7,
        price: 209.99,
        status: 'Late',
        orderDate: '2015-01-02T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 2,
        productId: 214222,
        productName: 'Compressor 3',
        activity: 'Assemble Paint',
        quantity: 2,
        price: 208.99,
        status: 'Active',
        orderDate: '2015-01-03T06:00:00.000Z',
        action: 'Action',
        rated: 0.32,
      },
      {
        id: 3,
        productId: 214223,
        productName: 'Compressor 4',
        activity: 'Assemble Paint',
        quantity: 2.5,
        price: 207.99,
        status: 'Inactive',
        orderDate: '2015-01-04T06:00:00.000Z',
        action: 'Action',
        rated: 0.53,
      },
      {
        id: 4,
        productId: 214224,
        productName: 'Compressor 5',
        activity: 'Assemble Paint',
        quantity: 3,
        price: 206.99,
        status: 'Inactive',
        orderDate: '2015-01-05T06:00:00.000Z',
        action: 'Action',
        rated: 0.42,
      },
      {
        id: 5,
        productId: 214225,
        productName: 'Compressor 6',
        activity: 'Assemble Paint',
        quantity: 3.5,
        price: 205.99,
        status: 'Inactive',
        orderDate: '2015-01-06T06:00:00.000Z',
        action: 'Action',
        rated: 0.88,
      },
      {
        id: 6,
        productId: 214226,
        productName: 'Compressor 7',
        activity: 'Assemble Paint',
        quantity: 4,
        price: 204.99,
        status: 'Active',
        orderDate: '2015-01-07T06:00:00.000Z',
        action: 'Action',
        rated: 0.54,
      },
      {
        id: 7,
        productId: 214227,
        productName: 'Compressor 8',
        activity: 'Assemble Paint',
        quantity: 4.5,
        price: 203.99,
        status: 'On Hold',
        orderDate: '2015-01-08T06:00:00.000Z',
        action: 'Action',
        rated: 0.41,
      },
      {
        id: 8,
        productId: 214228,
        productName: 'Compressor 9',
        activity: 'Assemble Paint',
        quantity: 5,
        price: 202.99,
        status: 'On Hold',
        orderDate: '2015-01-09T06:00:00.000Z',
        action: 'Action',
        rated: 0.21,
      },
      {
        id: 9,
        productId: 214229,
        productName: 'Compressor 10',
        activity: 'Assemble Paint',
        quantity: 5.5,
        price: 201.99,
        status: 'Late',
        orderDate: '2015-01-10T06:00:00.000Z',
        action: 'Action',
        rated: 0.23,
      },
      {
        id: 10,
        productId: 214230,
        productName: 'Compressor 11',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      }
      ,
      {
        id: 11,
        productId: 214231,
        productName: 'Compressor 11',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 12,
        productId: 214232,
        productName: 'Compressor 12',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 13,
        productId: 214233,
        productName: 'Compressor 13',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 14,
        productId: 214234,
        productName: 'Compressor 14',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 15,
        productId: 214235,
        productName: 'Compressor 15',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 16,
        productId: 214236,
        productName: 'Compressor 16',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      },
      {
        id: 17,
        productId: 214237,
        productName: 'Compressor 17',
        activity: 'Assemble Paint',
        quantity: 6,
        price: 200.99,
        status: 'Late',
        orderDate: '2015-01-01T06:00:00.000Z',
        action: 'Action',
        rated: 0.76,
      }
    ];

    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: false,
      editable: true,
      summaryRow: true,
      summaryRowColumns: [
        { field: 'quantity', summaryRowFormatter: Soho.Formatters.SummaryRow, aggregator: 'sum', summaryText: ' ', summaryTextPlacement: 'after' },
        { field: 'price', summaryRowFormatter: Soho.Formatters.SummaryRow, aggregator: 'sum', summaryText: ' ', summaryTextPlacement: 'after' }
      ],
      rowTemplate: `<div class="field four columns">
                      <label class="details-field-header">Quantity</label>
                      <p class="details-field-value">{{quantity}}</p>
                    </div>
                    <div class="field four columns">
                      <label class="details-field-header">Price</label>
                      <p class="details-field-value">{{price}}</p>
                    </div>`
    } as SohoDataGridOptions;
  }
}
