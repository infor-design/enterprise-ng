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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    templateUrl: 'datagrid-dynamic-demo.component.html',
    providers: [DataGridDemoService],
    directives: [SoHoDataGridComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridDynamicDemoComponent implements AfterContentInit, AfterViewInit {
    @ViewChild(SoHoDataGridComponent) dataGrid: SoHoDataGridComponent;

    constructor(private el: ElementRef,
        private service: DataGridDemoService) {

        
    }

    public get columns(): Observable<GridColumn[]> {
        return Observable.of(this.service.getColumns());
    }

    private _subject$ = <BehaviorSubject<any[]>>new BehaviorSubject([]);

    public data = this._subject$.asObservable(); 

    addRows() {
    
        this.service.getData(null).subscribe((d: any[]) => {
            d.forEach((r) => r.orderDate = new Date());
            console.log("Here I am");
            this._subject$.next(d);
            setTimeout(() => this.addRows(), 2000);
        });
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => this.addRows(), 1000);
    }
}
