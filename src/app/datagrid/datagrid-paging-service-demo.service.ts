import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { SohoDataGridService } from '../../soho/datagrid';
import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';

@Injectable()
export class DataGridPagingServiceDemoService extends SohoDataGridService {
  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  private data: Array<any> = Array<any>();

  getColumns(): Array<SohoDataGridColumn> {
    if (this.columns.length === 0) {
      // init
      this.columns = PAGING_COLUMNS;
      this.data = PAGING_DATA;
    }
    return this.columns;
  }

  getData(req: SohoDataGridSourceRequest): Observable<any> {
    let begin: number = (req.activePage - 1) * req.pagesize;
    let end: number = begin + req.pagesize;
    let data: Array<any> = this.data.slice(begin, end);
    let result: any = { total: 100, data: data };
    return Observable.of(result);
  }
}
