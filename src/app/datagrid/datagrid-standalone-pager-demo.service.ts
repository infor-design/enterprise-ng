import { Injectable } from '@angular/core';
import { PAGING_DATA, PAGING_COLUMNS } from './datagrid-paging-data';

@Injectable()
export class DatagridStandalonePagerDemoService {
  private columns: SohoDataGridColumn[] = [];
  private data?: Array<any>;
  private beginIndex?: number;
  private endIndex?: number;
  private pageSize?: number;

  getColumns(): SohoDataGridColumn[] {
    if (this.columns.length === 0) {
      PAGING_COLUMNS[2].sortable = true; // make 2nd column sortable
      this.columns = PAGING_COLUMNS;
      this.data = PAGING_DATA;
    }
    return this.columns;
  }

  initialPage(pageSize: number): any {
    this.pageSize = pageSize;
    return this.getData('initial');
  }

  firstPage(): any    { return this.getData('first');    }
  nextPage(): any     { return this.getData('next');     }
  previousPage(): any { return this.getData('prev');     }
  lastPage(): any     { return this.getData('last');     }
  filterPage(): any   { return this.getData('initial');  }

  sortPage(isAscending: boolean): any {
    this.data?.sort((o1, o2) => o1.id - o2.id);
    if (!isAscending) {
      this.data?.reverse();
    }

    return this.getData('initial', isAscending);
  }

  private getData(type: string, _sortAscending = true): any {
    switch (type) {
      case 'initial': this.beginIndex = 0; break;
      case 'first': this.beginIndex = 0; break;
      case 'last': this.beginIndex = (this.data as any).length - (this.pageSize as any); break;
      case 'next': this.beginIndex = (this.beginIndex as any) + (this.pageSize as any); break;
      case 'prev': this.beginIndex = (this.beginIndex as any) - (this.pageSize as any); break;

      case 'filtered': console.log('filtered stub called - implement me'); break;
    }

    this.endIndex = (this.beginIndex as any) + (this.pageSize as any);

    const result: any = {
      data: (this.data as any).slice(this.beginIndex, this.endIndex),
      firstPage: this.beginIndex === 0,
      lastPage: (this.endIndex as any) >= (this.data as any).length - 1
    };

    return result;
  }
}
