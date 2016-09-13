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
} from '../../components/datagrid';

@Component({
  selector: 'datagrid-breadcrumb-demo',
  templateUrl: 'datagrid-breadcrumb.demo.html',
  providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridBreadcrumbDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

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

  public clearFilter() {
    this.dataGrid.clearFilter();
  }

  addRow() {
    this.service.getData(null).subscribe((d: any[]) => {
      let newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid.addRow(newData[0], 'top');
    });
  }

  onSelected(e: any) {
  }
}
