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
    selector: 'app-datagrid-test-settings-demo',
    templateUrl: 'datagrid-test-settings.demo.html',
    providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridTestSettingsDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

  constructor() {
  }

  public resetColumns() {
    this.datagrid?.resetColumns();
  }

  public personalizeColumns() {
    this.datagrid?.personalizeColumns();
  }

  public onSelected(_event: any) {
  }
}
