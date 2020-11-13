import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent, SohoDataGridService } from 'ids-enterprise-ng';

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
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

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
      (this.datagrid as any).isRowDisabled = () => {
        return disabled;
      };
    } else {
      (this.datagrid as any).isRowDisabled = null;
    }
  }

  get isRowDisabled(): boolean {
    return !!(this.datagrid as any).isRowDisabled;
  }

  /**
   * Make several changes to the component in one go.
   */
  makeChange() {
    (this.datagrid as any).isList = !(this.datagrid as any).isList;
    (this.datagrid as any).alternateRowShading = !(this.datagrid as any).alternateRowShading;
    (this.datagrid as any).cellNavigation = !(this.datagrid as any).cellNavigation;
    (this.datagrid as any).isRowDisabled = (rowIndex: any, _rowData: any) => {
      return rowIndex % 2 === 0;
    };
  }
}
