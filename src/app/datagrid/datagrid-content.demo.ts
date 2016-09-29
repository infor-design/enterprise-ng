import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoDataGridComponent } from '../../soho/datagrid';

@Component({
  selector: 'soho-datagrid-content-demo',
  templateUrl: 'datagrid-content.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridContentDemoComponent {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

  constructor() {
  }

  addRow() {
    this.dataGrid.addRow({}, 'top');
  }

   toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  busy() {}

  onSelected(e: any) {
  }
}
