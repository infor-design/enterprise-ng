
import {
  of,
  Observable
} from 'rxjs';

import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';

import {
  PAGING_DATA,
  PAGING_COLUMNS
} from './datagrid-paging-data';

@Injectable()
export class DataGridPagingIndeterminateDemoService extends SohoDataGridService {
  private columns: SohoDataGridColumn[] = [];
  private data?: Array<any>;
  private beginIndex?: number;
  private endIndex?: number;

  getColumns(): SohoDataGridColumn[] {
    if (this.columns.length === 0) {
      // init
      this.columns = PAGING_COLUMNS;
      this.data = PAGING_DATA;
    }
    return this.columns;
  }

  getData(req: SohoDataGridSourceRequest): Observable<any> {

    switch (req.type) {
      case 'initial': this.beginIndex = 0; break;
      case 'first': this.beginIndex = 0; break;
      case 'last': this.beginIndex = (this.data as any).length - (req as any).pagesize; break;
      case 'next': this.beginIndex = (this.beginIndex as any) + (req as any).pagesize; break;
      case 'prev': this.beginIndex = (this.beginIndex as any) - (req as any).pagesize; break;

      case 'sorted': console.log('sorted stub called - implement me'); break;
      case 'filtered': console.log('filtered stub called - implement me'); break;
    }

    this.endIndex = (this.beginIndex as any) + (req as any).pagesize;

    const result: any = {
      data:  (this.data as any).slice(this.beginIndex, this.endIndex),
      firstPage: this.beginIndex === 0,
      lastPage: (this.endIndex as any)  >= (this.data as any).length - 1
    };

    return of(result);
  }
}
