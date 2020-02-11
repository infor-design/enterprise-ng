import {
  Component,
  ViewChild,
  ChangeDetectionStrategy, OnInit
} from '@angular/core';

import { DataGridDemoService } from './datagrid-demo.service';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from 'ids-enterprise-ng';

import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';

@Component({
  selector: 'app-datagrid-mixed-selection-demo',
  templateUrl: 'datagrid-mixed-selection.demo.html',
  providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridMixedSelectionDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  public gridOptions = undefined;
  public disableRowDeactivation = true;
  public get rowDeactivationLabel() {
    return (this.disableRowDeactivation ? 'Enable ' : 'Disable ') + 'Row Deactivation';
  }

  ngOnInit(): void {
    this.gridOptions = {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: 'mixed',
      paging: false,
      pagesize: 10,
      disableRowDeactivation: this.disableRowDeactivation
    };
  }

  onRowDeactivationToggle(event) {
    this.disableRowDeactivation = !this.disableRowDeactivation;
  }

  onActivateSelectedRow(event) {
    if (this.sohoDataGridComponent.selectedRows().length > 0 && this.sohoDataGridComponent.selectedRows()[0].idx > -1) {
      this.sohoDataGridComponent.activateRow(this.sohoDataGridComponent.selectedRows()[0].idx);
    }
  }

  onDeactivateActivatedRow(event) {
    this.sohoDataGridComponent.deactivateRow();
  }

  onBeforeRowActivated(event) {
    console.log('onBeforeRowActivated: ' + event);
  }

  onRowActivated(event) {
    console.log('onRowActivated: ' + event);
  }

  onRowDeactivated(event) {
    console.log('onRowDeactivated: ' + event);
  }
}
