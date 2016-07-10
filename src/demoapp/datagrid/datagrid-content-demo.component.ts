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
    SoHoDataGridComponent
} from '../../components/datagrid';

@Component({
    moduleId: module.id,
    selector: 'sample-datagrid',
    templateUrl: 'datagrid-content-demo.component.html',
    providers: [ ],
    directives: [ SoHoDataGridComponent ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridContentDemoComponent implements AfterContentInit, AfterViewInit {
    @ViewChild(SoHoDataGridComponent) dataGrid: SoHoDataGridComponent;

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {       
    }
}
