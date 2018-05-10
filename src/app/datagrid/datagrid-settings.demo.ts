import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from 'ids-enterprise-ng';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-settings-demo',
  templateUrl: './datagrid-settings.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridSettingsDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) datagrid: SohoDataGridComponent;

  constructor(gridService: SohoDataGridService) {
    (gridService as DataGridDemoService).addColumn({
      id: 'rowReorder',
      name: '',
      field: 'id',
      align: 'center',
      sortable: false,
      formatter: Soho.Formatters.RowReorder,
      width: 80
    });
  }

  ngAfterViewInit() {
  }

  /**
   * Make several changes to the component in one go.
   */
  makeChange() {
    this.datagrid.isList = !this.datagrid.isList;
    this.datagrid.alternateRowShading = !this.datagrid.alternateRowShading;
    this.datagrid.cellNavigation = !this.datagrid.cellNavigation;
  }
}
