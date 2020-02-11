import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from 'ids-enterprise-ng';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'app-datagrid-settings-demo',
  templateUrl: 'datagrid-settings.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridSettingsDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid: SohoDataGridComponent;

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

  set isRowDisabled(disabled: boolean) {
    if (disabled) {
      this.datagrid.isRowDisabled = () => {
        return disabled;
      };
    } else {
      this.datagrid.isRowDisabled = null;
    }
  }

  get isRowDisabled(): boolean {
    return !!this.datagrid.isRowDisabled;
  }

  /**
   * Make several changes to the component in one go.
   */
  makeChange() {
    this.datagrid.isList = !this.datagrid.isList;
    this.datagrid.alternateRowShading = !this.datagrid.alternateRowShading;
    this.datagrid.cellNavigation = !this.datagrid.cellNavigation;
    this.datagrid.isRowDisabled = (rowIndex, rowData) => {
      return rowIndex % 2 === 0;
    };
  }
}
