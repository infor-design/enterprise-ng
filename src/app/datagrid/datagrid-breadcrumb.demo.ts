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

@Component({
  selector: 'soho-datagrid-breadcrumb-demo',
  templateUrl: './datagrid-breadcrumb.demo.html',
  providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridBreadcrumbDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  constructor(private el: ElementRef,
    private service: SohoDataGridService) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid.clearFilter();
  }

  busy() {
    this.busyIndicator.open();
    setTimeout(() => { this.busyIndicator.close(true); }, 3000);
  }

  addRow() {
    this.service.getData(null).subscribe((d: any[]) => {
      const newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid.addRow(newData[0], 'top');
    });
  }

  onSelected(e: any) {
  }
}
