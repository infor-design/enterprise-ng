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
import {
    SohoDataGridComponent,
    SohoDataGridService,
    SohoToolbarOptions
} from '../../components/datagrid';

@Component({
    selector: 'datagrid-breadcrumb-demo',
    templateUrl: 'datagrid-breadcrumb.demo.html',
    providers: [{ provide: SohoDataGridService, useClass: DataGridDemoService }],
    directives: [SohoDataGridComponent, DataGridToolbarDemoComponent],
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

    toggleFilterRow() {
        this.dataGrid.toggleFilterRow();
    }

    getToolbarOptions(): SohoToolbarOptions {
        console.log('here');
        const options = new SohoToolbarOptions();
        options.filterRow = true;
        return options;
    }

    onSelected(e: any) {
    }
}
