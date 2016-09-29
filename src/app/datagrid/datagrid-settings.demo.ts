import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from '../../soho/datagrid';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-settings-demo',
  templateUrl: 'datagrid-settings.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridSettingsDemoComponent {
  @ViewChild(SohoDataGridComponent) datagrid: SohoDataGridComponent;

  /**
   * Make several changes to the component in one go.
   */
  makeChange() {
    this.datagrid.isList = !this.datagrid.isList;
    this.datagrid.alternateRowShading = !this.datagrid.alternateRowShading;
    this.datagrid.cellNavigation = !this.datagrid.cellNavigation;
  }
}
