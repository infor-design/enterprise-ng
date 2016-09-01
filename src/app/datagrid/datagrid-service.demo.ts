import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoBusyIndicatorComponent } from '../../components/busyindicator';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from '../../components/datagrid';

import {
  DataGridDemoService
} from './datagrid-demo.service';

import {
  SohoToastService
} from '../../services/';

@Component({
  selector: 'sample-datagrid',
  templateUrl: 'datagrid-service.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridServiceDemoComponent implements AfterContentInit, AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorComponent) busyIndicator: SohoBusyIndicatorComponent;
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
}
