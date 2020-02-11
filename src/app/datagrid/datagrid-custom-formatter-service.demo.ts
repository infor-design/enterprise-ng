import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewChild
} from '@angular/core';
import {
  SohoDataGridComponent,
} from 'ids-enterprise-ng';
import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';
import { DataGridCustomFormatterService } from './datagrid-custom-formatter.service';

@Component({
  selector: 'app-datagrid-custom-formatter-service-demo',
  templateUrl: 'datagrid-custom-formatter-service.demo.html',
  providers: [ DataGridCustomFormatterService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridCustomFormatterServiceDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  gridOptions: SohoDataGridOptions = undefined;

  RandomIntegerFormatter = (row, cell, value, column, item, api): string => {
    return this.formatterService.randomIntegerFormatter(row, cell, value, column, item, api);
  }

  constructor(private formatterService: DataGridCustomFormatterService) {}

  ngOnInit(): void {
    /**
     * Add a column for the custom formatter
     */
    const columns: SohoDataGridColumn[] = [];

    PAGING_COLUMNS.forEach(element => columns.push(element));

    columns.push({
      id: 'custom-formatter',
      name: 'Custom Formatter',
      field: '',
      formatter: this.RandomIntegerFormatter
    });

    this.gridOptions = {
      columns: columns,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
    };
  }
}
