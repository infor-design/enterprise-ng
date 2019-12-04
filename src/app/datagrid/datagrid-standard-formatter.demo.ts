import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoIconUtils
} from 'ids-enterprise-ng';

import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
  selector: 'app-datagrid-standard-formatter-demo',
  templateUrl: 'datagrid-standard-formatter.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridStandardFormatterDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  gridOptions = undefined;
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
        { id: 'Active',  value: 'Active',  label: 'Active' },
        { id: 'Inactive', value: 'Inactive', label: 'Inactive' },
        { id: 'Late',    value: 'Late',    label: 'Late' },
        { id: 'On Hold', value: 'On Hold', label: 'On Hold' }
      ],
      ranges: [
        { 'value': 'Active',  'classes': 'confirm', text: 'Active' },
        { 'value': 'Inactive', 'classes': 'alert',  text: 'Inactive' },
        { 'value': 'Late',    'classes': 'error',   text: 'Late' },
        { 'value': 'On Hold', 'classes': 'info',    text: 'On Hold' },
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

    const columns = [ ...PAGING_COLUMNS, statusColumn, ratedColumn ];

    return {
      columns: columns,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
      stretchColumn: 'rated'
    };
  }
}
