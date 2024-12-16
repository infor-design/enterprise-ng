import {
  Component,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { DataGridDemoService } from './datagrid-demo.service';
// @ts-ignore
import { SohoDataGridComponent, SohoDataGridService } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

@Component({
    selector: 'app-datagrid-breadcrumb-demo',
    templateUrl: 'datagrid-breadcrumb.demo.html',
    providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridBreadcrumbDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;

  constructor(private service: SohoDataGridService) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid?.clearFilter();
  }

  busy() {
    this.busyIndicator?.open();
    setTimeout(() => this.busyIndicator?.close(true), 3000);
  }

  addRow() {
    this.service.getData(null).subscribe((d: any[]) => {
      const newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid?.addRow(newData[0], 'top');
    });
  }

  onSelected(_e: any) {
  }
}
