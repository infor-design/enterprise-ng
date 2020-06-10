import { AfterViewChecked, ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy, Inject, } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';

const customErrorFormatter = function (row, cell, value, col, item, api) {
  value = `<svg class="icon datagrid-alert-icon icon-alert"
              style="height: 15px; margin-right: 6px; top: -2px; position: relative;"
              focusable="false" aria-hidden="true" role="presentation">
              <use href="#icon-alert"></use>
            </svg><span>${value}</span>`;
  return Soho.Formatters.Expander(row, cell, value, col, item, api);
};

@Component({
  template: `
    <div>
      <div
        soho-datagrid
        [columns]="columns"
        [data]="data"
        [filterable]="false"
        [selectable]="'single'"
      ></div>
    </div>
  `,
})
export class NestedDatagridDemoComponent implements OnDestroy {
  columns: SohoDataGridColumn[];
  data: any[];
  id: any;
  constructor(@Inject('args') public args: any) {
    if (args && args.inputsData) {
      this.columns = args.inputsData;
    }
    if (args && args.data) {
      this.data = args.data;
    }
    if (args && args.item) {
      this.id = args.item.id;
    }
  }

  ngOnDestroy() {
    // console.log(`DemoCellFormatterComponent ${this.args.row} destroyed`);
  }
}

@Component({
  selector: 'app-datagrid-expandable-row-nested-demo',
  templateUrl: 'datagrid-expandable-row-nested.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridExpandableRowNestedDemoComponent
  implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent: SohoDataGridComponent;

  constructor() {}

  gridOptions: SohoDataGridOptions = undefined;
  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {}

  private buildGridOptions(): SohoDataGridOptions {
    PAGING_DATA[0].detail = [
      {
        id: '0' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '0' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '0' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '0' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[1].detail = [
      {
        id: '1' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '1' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '1' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '1' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[2].detail = [
      {
        id: '2' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '2' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '2' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '2' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[3].detail = [
      {
        id: '3' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '3' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '3' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '3' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[4].detail = [
      {
        id: '4' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '4' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '4' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '4' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[5].detail = [
      {
        id: '5' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '5' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '5' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '5' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[6].detail = [
      {
        id: '6' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '6' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '6' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '6' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[7].detail = [
      {
        id: '7' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '7' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '7' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '7' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[8].detail = [
      {
        id: '8' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '8' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '8' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '8' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[9].detail = [
      {
        id: '9' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '9' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '9' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '9' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[10].detail = [
      {
        id: '10' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '10' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '10' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '10' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[11].detail = [
      {
        id: '11' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '11' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '11' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '11' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[12].detail = [
      {
        id: '12' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '12' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '12' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '12' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    PAGING_DATA[13].detail = [
      {
        id: '13' + '-121225',
        partName: 'Large Cooling Fan',
        quantity: 0.1,
        price: 0.35,
        amount: 0.035,
      },
      {
        id: '13' + '-121226',
        partName: 'Extra Cooling System',
        quantity: 0.2,
        price: 0.05,
        amount: 0.01,
      },
      {
        id: '13' + '-121227',
        partName: 'Electronics / Hardware',
        quantity: 0.3,
        price: 0.15,
        amount: 0.045,
      },
      {
        id: '13' + '-121228',
        partName: 'Resilant Sub-Compressor',
        quantity: 0.3,
        price: 0.25,
        amount: 0.075,
      },
    ];

    // Replace the first two column with an expander
    PAGING_COLUMNS[0] = {
      id: 'expander',
      field: 'productId',
      formatter: customErrorFormatter, // or just use Soho.Formatters.Expander,
      filterType: 'text',
      width: '15%',
    };
    PAGING_COLUMNS[1].hidden = true;

    const NESTED_COLUMNS: SohoDataGridColumn[] = [
      { id: 'id', name: 'Part Id', field: 'id', width: 200 },
      {
        id: 'partName',
        name: 'Part Name',
        field: 'partName',
        formatter: Soho.Formatters.Hyperlink,
      },
      { id: 'price', name: 'Price', field: 'price' },
      { id: 'amount', name: 'Amount', field: 'amount' },
      { id: 'quantity', name: 'Quantity', field: 'quantity' },
      {
        id: 'action',
        name: 'Active',
        sortable: false,
        width: 80,
        formatter: Soho.Formatters.Button,
        icon: 'delete',
        headerTooltip: 'Delete',
        click: function (e, args) {
          console.log(args[0].cell, args[0].row, args[0].item.id);
        },
      },
    ];

    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: false,
      rowTemplateComponent: NestedDatagridDemoComponent,
      rowTemplateField: 'detail',
      rowTemplateComponentInputs: NESTED_COLUMNS,
      rowTemplate: `
          <div class="datagrid-cell-layout">
          </div>
          `,
    } as SohoDataGridOptions;
  }
}
