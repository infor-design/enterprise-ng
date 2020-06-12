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
      <h1>id : {{ id }}</h1>
    </div>
    <div *ngIf="args && args.item">
      <h2>Item is :</h2>
      <p>{{ args.item | json }}</p>
    </div>
  `,
})
export class ExpandedDemoComponent implements OnDestroy {
  data: any[];
  id?: string;
  constructor(@Inject('args') public args: any) {
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
  selector: 'app-datagrid-expandable-row-dynamic-demo',
  templateUrl: 'datagrid-expandable-row-dynamic.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridExpandableRowDynamicDemoComponent
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
    // Replace the first two column with an expander
    PAGING_COLUMNS[0] = {
      id: 'expander',
      field: 'productId',
      formatter: customErrorFormatter, // or just use Soho.Formatters.Expander,
      filterType: 'text',
      width: '15%',
    };
    PAGING_COLUMNS[1].hidden = true;

    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: false,
      // allowOneExpandedRow: false,
      rowTemplateComponent: ExpandedDemoComponent,
      rowTemplateField: 'detail',
      rowTemplateComponentInputs: undefined,
      rowTemplate: `
          <div class="datagrid-cell-layout">
          </div>
          `,
    } as SohoDataGridOptions;
  }
}
