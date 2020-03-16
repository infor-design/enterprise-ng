import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

const customErrorFormatter = function(row, cell, value, col, item, api) {
   value = `<svg class="icon datagrid-alert-icon icon-alert"
          style="height: 15px; margin-right: 6px; top: -2px; position: relative;"
          focusable="false" aria-hidden="true" role="presentation">
          <use href="#icon-alert"></use>
        </svg><span>${value}</span>`;
   return Soho.Formatters.Expander(row, cell, value, col, item, api);
};

@Component({
  selector: 'app-datagrid-expandable-row-demo',
  templateUrl: 'datagrid-expandable-row.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridExpandableRowDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor(
  ) {}

  gridOptions: SohoDataGridOptions = undefined;
  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {
  }

  private buildGridOptions(): SohoDataGridOptions {
    // Replace the first two column with an expander
    PAGING_COLUMNS[0] = {
      id: 'expander',
      field: 'productId',
      formatter: customErrorFormatter, // or just use Soho.Formatters.Expander,
      filterType: 'text',
      width: '15%'
    };
    PAGING_COLUMNS[1].hidden = true;

    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: false,
      rowTemplate: `
        <div class="datagrid-cell-layout">
          <div class="img-placeholder">
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use href="#icon-camera"></use>
            </svg>
          </div>
        </div>
        <div class="datagrid-cell-layout">
          <p class="datagrid-row-heading">Expandable Content Area</p>
              <p class="datagrid-row-micro-text">{{{sku}}}</p>
                <span class="datagrid-wrapped-text">Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the industry standard
                dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only...
                </span>
          <a class="hyperlink" href="https://design.infor.com/" target="_blank" >Read more</a>`
    } as SohoDataGridOptions;
  }
}
