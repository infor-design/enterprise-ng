import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
    SoHoButtonComponent,
    SoHoBusyIndicatorComponent
} from '../';

import {
    SoHoDataGridComponent,
    DataGridService
} from '../../components/datagrid';

import {
    DataGridDemoService
} from './datagrid-demo.service';

import {
  SoHoToastService
} from '../../services/';

@Component({
    moduleId: module.id,
    selector: 'sample-datagrid',
    templateUrl: 'datagrid-service-demo.component.html',
    providers: [ { provide: DataGridService, useClass: DataGridDemoService }, SoHoToastService ],
    directives: [ SoHoDataGridComponent, SoHoButtonComponent, SoHoBusyIndicatorComponent ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridServiceDemoComponent implements AfterContentInit, AfterViewInit {
    @ViewChild(SoHoDataGridComponent) dataGrid: SoHoDataGridComponent;
    @ViewChild(SoHoBusyIndicatorComponent) busyIndicator: SoHoBusyIndicatorComponent;
    constructor(private el: ElementRef, private toastService: SoHoToastService) {
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
    }

    onSelected(e: any) {
      this.toastService.show2('Selected', e);
    }

    busy() {
      this.busyIndicator.activated = true;
    }
}
