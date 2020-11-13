import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoDataGridComponent, SohoDataGridService } from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';
// @ts-ignore
import { SohoToastService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-datagrid-service-demo',
  templateUrl: 'datagrid-service.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridServiceDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  constructor(private toastService: SohoToastService) {
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    if (e.rows && e.rows.length) {
      this.toastService.show({
        title: 'Selected',
        message: e.rows.map(row => row.data ? row.data.productId : false).join(', ')
      });
    }
  }

  onOpenFilterRow(_e: SohoDataGridOpenFilterRowEvent) {
    this.toastService.show({title: 'Filterbar', message: 'filter row opened'});
  }

  onCloseFilterRow(_e: SohoDataGridCloseFilterRowEvent) {
    this.toastService.show({title: 'Filterbar', message: 'filter row closed'});
  }

  public onBeforeSelect = (eventData: SohoDataGridBeforeSelectEventData) => {
   console.log(eventData, Soho.keyboard.pressedKeys);
  }

  busy() {
    (this.busyIndicator as any).activated = true;
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid?.clearFilter();
  }

  sortColumn() {
    this.dataGrid?.setSortColumn('price1');
  }

  addRow() {
  }

  export() {
    this.dataGrid?.exportToExcel('my-export');
    this.dataGrid?.exportToCsv('my-export');
  }
}
