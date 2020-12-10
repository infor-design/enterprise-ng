
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';

import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

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
    const begin: number = ((req.activePage as any) - 1) * (req.pagesize as any);
    const end: number = begin + (req.pagesize as any);
    const data: Array<any> = this.data.slice(begin, end);
    const result: any = { total: 100, data };
    return of(result);
  }

  getAllData(): Array<any> {
    return this.data;
  }

}
