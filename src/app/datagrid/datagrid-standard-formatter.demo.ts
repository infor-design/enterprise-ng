import {
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
    selector: 'app-datagrid-standard-formatter-demo',
    templateUrl: 'datagrid-standard-formatter.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridStandardFormatterDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions: any = undefined;

  ngOnInit(): void {
    this.gridOptions = this.buildGridOptions();
  }

  private buildGridOptions() {
    /**
     * Add a column for the custom formatter
     */
    const statusColumn = {
      id: 'status',
      name: 'Status',
      field: 'status',
      width: 100,
      formatter: Soho.Formatters.Alert,
      options: [
        { id: 'Active', value: 'Active', label: 'Active' },
        { id: 'Inactive', value: 'Inactive', label: 'Inactive' },
        { id: 'Late', value: 'Late', label: 'Late' },
        { id: 'On Hold', value: 'On Hold', label: 'On Hold' }
      ],
      ranges: [
        { 'value': 'Active', 'classes': 'success', text: 'Active' },
        { 'value': 'Inactive', 'classes': 'alert', text: 'Inactive' },
        { 'value': 'Late', 'classes': 'error', text: 'Late' },
        { 'value': 'On Hold', 'classes': 'info', text: 'On Hold' },
      ]
    };

    const ratedColumn = {
      id: 'rated',
      name: 'Rated',
      field: 'rated',
      width: 40,
      formatter: Soho.Formatters.TargetedAchievement,   // Soho.Formatters.Text,
      showPercentText: true,
    };

    // Add `sortFunction` and `sortable: true` to column `orderDate`
    if (PAGING_COLUMNS && Array.isArray(PAGING_COLUMNS)) {
      PAGING_COLUMNS.forEach((col) => {
        if (col.id === 'orderDate') {
          col.sortable = true;
          col.sortFunction = function (value: any) {
            const formatDateStr = Soho.Locale.formatDate(value, { pattern: 'M/d/yyyy' });
            const time = Soho.Locale.parseDate(formatDateStr).getTime();
            return time;
          };
        }
      });
    }

    const columns = [...PAGING_COLUMNS, statusColumn, ratedColumn];

    return {
      columns,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
      stretchColumn: 'rated'
    };
  }
}
