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
  SohoDataGridComponent,
  SohoDataGridService
} from '../';

import { DataGridDemoService } from './datagrid-demo.service';

import { DataGridToolbarDemoComponent } from './datagrid-toolbar.demo';

@Component({
    moduleId: module.id,
    selector: 'datagrid-breadcrumb-demo',
    templateUrl: 'datagrid-breadcrumb.demo.html',
    providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
    directives: [SohoDataGridComponent, SohoButtonComponent, DataGridToolbarDemoComponent ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridBreadcrumbDemoComponent implements AfterContentInit, AfterViewInit {
    @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
    }

    onSelected(e: any) {
    }
}
