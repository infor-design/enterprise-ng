import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { DataGridDemoService } from './datagrid-demo.service';
import { DataGridToolbarDemoComponent } from './datagrid-toolbar.demo';
import { SohoDataGridComponent, SohoDataGridService } from '../../components/datagrid';

@Component({
    selector: 'datagrid-breadcrumb-demo',
    templateUrl: 'datagrid-breadcrumb.demo.html',
    providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
    directives: [SohoDataGridComponent, DataGridToolbarDemoComponent ],
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
