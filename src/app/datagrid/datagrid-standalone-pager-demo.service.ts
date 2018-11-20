import { Injectable } from '@angular/core';
import { PAGING_DATA, PAGING_COLUMNS } from './datagrid-paging-data';

@Injectable()
export class DatagridStandalonePagerDemoService {
  private columns: SohoDataGridColumn[] = [];
  private data: Array<any>;
  private beginIndex: number;
  private endIndex: number;
  private pageSize: number;

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
  sortPage(): any     { return this.getData('initial');  }
  filterPage(): any   { return this.getData('initial');  }

  private getData(type: string): any {
    switch (type) {
      case 'initial': this.beginIndex = 0; break;
      case 'first': this.beginIndex = 0; break;
      case 'last': this.beginIndex = this.data.length - this.pageSize; break;
      case 'next': this.beginIndex = this.beginIndex + this.pageSize; break;
      case 'prev': this.beginIndex = this.beginIndex - this.pageSize; break;

      case 'sorted': console.log('sorted stub called - implement me'); break;
      case 'filtered': console.log('filtered stub called - implement me'); break;
    }

    this.endIndex = this.beginIndex + this.pageSize;

    const result: any = {
      data: this.data.slice(this.beginIndex, this.endIndex),
      firstPage: this.beginIndex === 0,
      lastPage: this.endIndex >= this.data.length - 1
    };

    return result;
  }
}
