import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
    SoHoButtonComponent
} from '../';

import {
    SoHoDataGridComponent,
    DataGridService
} from '../../components/datagrid';

import {
    DataGridDemoService
} from './datagrid-demo.service';

@Component({
    moduleId: module.id,
    selector: 'sample-datagrid',
    templateUrl: 'datagrid-service-demo.component.html',
    providers: [ { provide: DataGridService, useClass: DataGridDemoService } ],
    directives: [ SoHoDataGridComponent, SoHoButtonComponent ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridServiceDemoComponent implements AfterContentInit, AfterViewInit {
    @ViewChild(SoHoDataGridComponent) dataGrid: SoHoDataGridComponent;

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
    }
}
