import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
    SohoButtonComponent,
    SohoBusyIndicatorComponent
} from '../';

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
    moduleId: module.id,
    selector: 'sample-datagrid',
    templateUrl: 'datagrid-service.demo.html',
    providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService }, SohoToastService ],
    directives: [ SohoDataGridComponent, SohoButtonComponent, SohoBusyIndicatorComponent ],
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
