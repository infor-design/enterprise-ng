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
  selector: 'app-datagrid-save-user-settings-demo',
  templateUrl: 'datagrid-save-user-settings.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridSaveUserSettingsDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  constructor(
  ) {}

  gridOptions?: SohoDataGridOptions = undefined;
  selectedRow = 0;
  updateSelectedRow = false;

  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {
    if (this.sohoDataGridComponent && this.updateSelectedRow) {
      this.sohoDataGridComponent.selectRows([this.selectedRow]);
      this.updateSelectedRow = false;
    }
  }

  private buildGridOptions(): SohoDataGridOptions {
    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: 'multiple',
      paging: true,
      columnReorder: true,
      pagesize: 20,
      pagesizes: [ 5, 10, 25, 100 ],
      sortable: false,
      filterable: true,
      rowHeight: 'small',
      rowReorder: true,
      saveUserSettings: {
        columns: true,
        rowHeight: true,
        sortOrder: true,
        pagesize: true,
        activePage: true,
        filter: true
      }
    } as SohoDataGridOptions;
  }

}
