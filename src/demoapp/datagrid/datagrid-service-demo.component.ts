import { 
  Component,
  AfterContentInit, 
  ElementRef, 
  Output, 
  EventEmitter, 
  ViewChild, 
  AfterViewInit, 
  ChangeDetectionStrategy 
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { 
    SoHoDataGridComponent, 
    DataGridService,
    GridColumn
} from '../../components/datagrid';

import { 
    DataGridDemoService 
} from './datagrid-demo.service';

@Component({
    moduleId: module.id,
    selector: 'sample-datagrid',
    templateUrl: 'datagrid-service-demo.component.html',
    providers: [ {provide: DataGridService, useClass: DataGridDemoService}],
    directives: [ SoHoDataGridComponent ],
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
