import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import {
  SohoDataGridComponent,
} from '../../soho/datagrid';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'soho-datagrid-paging-indeterminate-demo',
  templateUrl: 'datagrid-paging-indeterminate.demo.html',
  providers: [ DataGridPagingIndeterminateDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingIndeterminateDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor(private datagridPagingService: DataGridPagingIndeterminateDemoService) {}

  ngAfterViewInit(): void {
    let gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: 25,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'short', // short, medium or normal
      sortable: false,
      disableClientSort: true,
      disableClientFilter: true,
      filterable: true,

      /*
       * ISSUE: the source function is called on a next and last sometime even when lastPage is true.
       *  - To Duplicate set the page size to 25.
       *  - Strangely it isn't a rpoblem when page size is 10!?!
       */
      source: (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
        /*
         * WORKAROUND 1:
         *  If you have state that keeps track of lastPgae then If lastPage is true
         *  return on 'last' and 'next' before calling the service.getData() method.
         */

        this.datagridPagingService.getData(request).subscribe((result: any) => {
          request.firstPage = result.firstPage;
          request.lastPage = result.lastPage;

          /*
           * WORKAROUND 2:
           * When the service reports lastPage set the activePage to the current pagesize.
           */
          if (request.lastPage) {
            request.activePage = request.pagesize;
          }

          response(result.data, request);
        });
      }
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }
}
