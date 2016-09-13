import {
    Component,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    SohoDataGridComponent,
    SohoDataGridService
} from '../../components/datagrid';

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
}
