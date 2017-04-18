import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { DataGridDemoService } from './datagrid-demo.service';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from '@infor/sohoxi-angular';

import { SohoBusyIndicatorDirective } from '@infor/sohoxi-angular';
import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';

@Component({
  selector: 'soho-datagrid-mixed-selection-demo',
  templateUrl: './datagrid-mixed-selection.demo.html',
  providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridMixedSelectionDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  ngAfterViewInit(): void {

    const columns = [];
    PAGING_COLUMNS.forEach(element => columns.push(element));

    const gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: columns,
      dataset: PAGING_DATA,
      selectable: 'mixed',
      paging: false,
      pagesize: 10,
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }

  onActivateSelectedRow(event) {
    if (this.sohoDataGridComponent.getSelectedRows().length > 0 && this.sohoDataGridComponent.getSelectedRows()[0].idx > -1) {
      this.sohoDataGridComponent.activateRow(this.sohoDataGridComponent.getSelectedRows()[0].idx);
    }
  }

  onDeactivateActivatedRow(event) {
    this.sohoDataGridComponent.deactivateRow();
  }

  onRowActivated(event) {
    console.log('onRowActivated: ' + event);
  }
  onRowDeactivated(event) {
    console.log('onRowDeactivated: ' + event);
  }
}
