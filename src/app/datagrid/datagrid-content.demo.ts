import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoBusyIndicatorDirective
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-datagrid-content-demo',
  templateUrl: './datagrid-content.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridContentDemoComponent {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  constructor() {
  }

  addRow() {
    this.dataGrid.addRow({}, 'top');
  }

   toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  busy() {
    this.busyIndicator.open();
    setTimeout(() => { this.busyIndicator.close(true); }, 3000);
  }

  onSelected(e: any) {
  }
}
