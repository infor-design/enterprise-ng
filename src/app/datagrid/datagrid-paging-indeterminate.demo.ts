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
      pagesize: 10,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'short', // short, medium or normal
      sortable: false,

      /**
       * cause source method to be called with req.type of 'sorted' so that
       * the server can be called to do sorting.
       */
      disableClientSort: true,

      /**
       * Cause source method to be called with req.type of 'filtered' so that
       * the server can be called to do filtering.
       */
      disableClientFilter: true,
      filterable: true,

      /*
       * ISSUE 1: the source function is called on a next and last sometimes even when lastPage is true.
       *  - To Duplicate set the page size to 25. Next to the end then click greyed out next again.
       *  - Strangely it isn't a problem when page size is 10!?!
       *
       * ISSUE 2: the source function is called on a prev and first sometimes even when firstPage is true.
       *  - To Duplicate set the page size to 25. Next to then the end, prev back to beginning.
       *    click prev again.
       *
       * ISSUE 3: Resetting the selected row on after paging doesn't seem to work. It seems to be using
       *  and offset from the (pagesize * (activePage - 1)) which is not correct for indeterminate paging
       *  - To Duplicate, when the screen comes up the first row should be selected, click next and see
       *    that the first row on the next page is not selected by calling selectRow(0).
       */
      source: (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
        this.datagridPagingService.getData(request).subscribe((result: any) => {
          request.firstPage = result.firstPage;
          request.lastPage = result.lastPage;

          // /* Temporary Workaround - When the service reports lastPage set the activePage to the current pagesize. */
          // if (request.lastPage) { request.activePage = request.pagesize; }

          // /* Temporary Workaround - When the service reports lastPage set the activePage to the current pagesize. */
          // if (request.firstPage) { request.activePage = 0; }

          /* Get the current selected row index for this page of records. */
          let selectedIndex = -1;
          let selectedRow = this.sohoDataGridComponent.getSelectedRows();
          if (selectedRow && selectedRow.length > 0 && selectedRow[0].idx !== -1) {
            selectedIndex = selectedRow[0].idx;
            this.sohoDataGridComponent.unSelectAllRows();
          }

          /* Put the data into the data grid */
          response(result.data, request);

          /* selected the row index of the new page of records */
          this.sohoDataGridComponent.selectRow(selectedIndex === -1 ? 0 : selectedIndex);
        });
      }
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }
}
