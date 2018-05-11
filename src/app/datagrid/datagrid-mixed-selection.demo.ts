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
} from 'ids-enterprise-ng';

import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';

@Component({
  selector: 'soho-datagrid-mixed-selection-demo',
  templateUrl: './datagrid-mixed-selection.demo.html',
  providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridMixedSelectionDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  public disableRowDeactivation = true;
  public get rowDeactivationLabel() {
    return (this.disableRowDeactivation ? 'Enable ' : 'Disable ') + 'Row Deactivation';
  }

  ngAfterViewInit(): void {
    const gridOptions: SohoDataGridOptions = {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: 'mixed',
      paging: false,
      pagesize: 10,
      disableRowDeactivation: this.disableRowDeactivation
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }

  onRowDeactivationToggle(event) {
    this.disableRowDeactivation = !this.disableRowDeactivation;
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
