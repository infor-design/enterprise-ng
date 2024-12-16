import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { Observable } from 'rxjs';

@Injectable()
export class DatagridRowSpanDemoService {

    constructor(private http: HttpClient) { }

    public getIncidentsData(): Observable<any> {
        return this.http.get('./app/demodata/incidents.demo.json');
    }
}

@Component({
    selector: 'app-datagrid-rowspan',
    templateUrl: 'datagrid-rowspan.demo.html',
    styleUrls: ['../code-block/code-block.formatter.css'],
    providers: [{ provide: DatagridRowSpanDemoService }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridRowSpanDemoComponent {
    @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

    public columns: SohoDataGridColumn[] = [
        { id: 'incidentId', name: 'Incident Id', field: 'incidentId' },
        { id: 'priority', name: 'Priority', field: 'priority', rowspan: true },
        { id: 'location', name: 'Location', field: 'location', formatter: Soho.Formatters.Hyperlink, rowspan: true },
        { id: 'nature', name: 'Nature', field: 'nature', rowspan: true },
        { id: 'time', name: 'Time', field: 'time', rowspan: true },
        { id: 'units', name: 'Vehicles on Scene', field: 'units' }
    ];

    public data?: any[];

    constructor(private demoService: DatagridRowSpanDemoService) {
        const self = this;
        this.demoService.getIncidentsData().subscribe((data) => {
            self.data = [];
            data.forEach((d: any) => self.data?.push(d));
            this.datagrid?.updated({ dataset: data });
        });
    }
}