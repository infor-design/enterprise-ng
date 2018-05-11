
import {
  of,
  Observable
} from 'rxjs';

import { Injectable } from '@angular/core';

import { SohoDataGridService } from 'ids-enterprise-ng';

import {
  PAGING_DATA,
  PAGING_COLUMNS
} from './datagrid-paging-data';

declare var Formatters: any;

@Injectable()
export class DataGridPagingIndeterminateDemoService extends SohoDataGridService {
  private columns: SohoDataGridColumn[] = [];
  private data: Array<any>;
  private beginIndex: number;
  private endIndex: number;

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
      case 'last': this.beginIndex = this.data.length - req.pagesize; break;
      case 'next': this.beginIndex = this.beginIndex + req.pagesize; break;
      case 'prev': this.beginIndex = this.beginIndex - req.pagesize; break;

      case 'sorted': console.log('sorted stub called - implement me'); break;
      case 'filtered': console.log('filtered stub called - implement me'); break;
    }

    this.endIndex = this.beginIndex + req.pagesize;

    const result: any = {
      data: this.data.slice(this.beginIndex, this.endIndex),
      firstPage: this.beginIndex === 0,
      lastPage: this.endIndex >= this.data.length - 1
    };

    return of(result);
  }
}
