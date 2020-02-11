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
  selector: 'app-datagrid-test-settings-demo',
  templateUrl: 'datagrid-test-settings.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridTestSettingsDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid: SohoDataGridComponent;

  constructor(private readonly gridService: SohoDataGridService) {
  }

  public resetColumns() {
    this.datagrid.resetColumns();
  }

  public personalizeColumns() {
    this.datagrid.personalizeColumns();
  }

  public onSelected(event) {
  }
}
