import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DatagridTreegridLazyServiceDemo {

  private _columns: SohoDataGridColumn[];
  private _data: Object[];

  constructor(private http: HttpClient) {}

  public getColumns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = [];
      /* tslint:disable */
      this._columns.push({id: 'selectionCheckbox', sortable: false, resizable: false, width: 50, formatter: Soho.Formatters.SelectionCheckbox, align: 'center'});
      this._columns.push({id: 'taskName', name: 'Task', field: 'taskName', expanded: 'expanded', formatter: Soho.Formatters.Tree, filterType: 'text', width: 250});
      this._columns.push({id: 'id', name: 'Id', field: 'id', filterType: 'text', width: 25 });
      this._columns.push({id: 'desc', name: 'Description', field: 'desc', filterType: 'text'});
      this._columns.push({id: 'comments', name: 'Comments', field: 'comments', formatter: Soho.Formatters.Hyperlink, filterType: 'text', width: 60 });
      this._columns.push({id: 'time', name: 'Time', field: 'time', filterType: 'time', width: 60 });
      /* tslint:enable */
    }
    return this._columns;
  }

  public getData(): any[] {
    if (!this._data) {
      /* tslint:disable */
      this._data = [
        {id: 1, escalated: 2, depth: 1, expanded: false, taskName: 'Follow up action with HMM Global', desc: '', comments: null, time: '', children: [
            {id: 2, escalated: 1, depth: 2, taskName: 'Quotes due to expire',  desc: 'Update pending quotes and send out again to customers.', comments: 3, time: '7:10 AM'},
            {id: 3, escalated: 0, depth: 2, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '9:10 AM'},
            {id: 4, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Trucking', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '14:10 PM'},
          ]
        },
        {id: 5, escalated: 0, depth: 1, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '18:10 PM'},
        {id: 6, escalated: 0, depth: 1, taskName: 'Follow up action with HMM Global', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '20:10 PM'},
        {id: 7, escalated: 0, depth: 1, expanded: true, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '22:10 PM', children: [
            {id: 8, escalated: 0, depth: 2, taskName: 'Follow up action with Universal HMM Logistics', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM'},
            {id: 9, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Shipping', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM'},
            {id: 10, escalated: 0, depth: 2, expanded: true, taskName: 'Follow up action with Residental Shipping Logistics ', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                {id: 11, escalated: 0, depth: 3, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM'},
                {id: 12, escalated: 0, depth: 3, expanded: true, taskName: 'Follow up action with Acme Universal Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                    {id: 13, escalated: 0, depth: 4, taskName: 'More Contact', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM'},
                    {id: 14, escalated: 0, depth: 4, taskName: 'More Follow up', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM'},
                  ]
                },
              ]
            }
          ]
        }
      ];
    }
    return this._data;
  }

  public getSimpleColumns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = [];
      this._columns.push({id: 'selectionCheckbox', sortable: false, resizable: false, width: 50, formatter: Soho.Formatters.SelectionCheckbox, align: 'center'});
      this._columns.push({id: 'id', name: 'Id', field: 'id', width: 100, formatter: Soho.Formatters.Tree });
      this._columns.push({id: 'alpha', name: 'Alpha', field: 'alpha', width: 250, filterType: 'text' });
    }

    return this._columns;
  }

  public getSimpleData(): any[] {
    return [
      {id: 1, alpha: 'A'},
      {id: 2, alpha: 'B'},
      {id: 3, alpha: 'C', depth: 1, children: [{id: 4, alpha: 'C1', depth: 2}, {id: 5, alpha: 'C2', depth: 2}]},
      {id: 6, alpha: 'D'},
      {id: 7, alpha: 'E'},
      {id: 8, alpha: 'F'},
      {id: 9, alpha: 'G'},
      {id: 10, alpha: 'H'},
      {id: 11, alpha: 'I'},
      {id: 12, alpha: 'J'},
      {id: 13, alpha: 'K'},
      {id: 14, alpha: 'L'},
      {id: 15, alpha: 'M'},
      {id: 16, alpha: 'N'},
      {id: 17, alpha: 'O'}
    ]
  }

  public getInitialFilterDemoData(): Observable<any> {
    return this.http.get('./app/demodata/tree-filtering.demo.json');
  }
}
