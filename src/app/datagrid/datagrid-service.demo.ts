import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoBusyIndicatorDirective } from '../../soho/busyindicator';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from '../../soho/datagrid';

import { DataGridDemoService } from './datagrid-demo.service';
import { SohoToastService } from '../../soho/';

@Component({
  selector: 'soho-datagrid-service-demo',
  templateUrl: 'datagrid-service.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridServiceDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;
  constructor(private el: ElementRef, private toastService: SohoToastService) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  onSelected(e: any) {
    this.toastService.show({title: 'Selected', message: e.productId});
  }

  busy() {
    this.busyIndicator.activated = true;
  }

  toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid.clearFilter();
  }
}
