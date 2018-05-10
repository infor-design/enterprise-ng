import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import {
  SohoDataGridComponent,
  SohoToastService,
} from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'soho-datagrid-paging-indeterminate-demo',
  templateUrl: './datagrid-paging-indeterminate.demo.html',
  providers: [ DataGridPagingIndeterminateDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingIndeterminateDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  public showPageSizeSelector = true;

  constructor(
    private datagridPagingService: DataGridPagingIndeterminateDemoService,
    private toastService: SohoToastService,
  ) {}

  ngAfterViewInit(): void {
    const gridOptions: SohoDataGridOptions = {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: 10,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'short', // short, medium or normal
      sortable: false,
      showPageSizeSelector: this.showPageSizeSelector,

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

      source: (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
        if (request.type === 'filtered') {
          this.toastService.show({title: 'Filter', message: 'gridsource with filtered type called'});
        }
        this.datagridPagingService.getData(request).subscribe((result: any) => {
          request.firstPage = result.firstPage;
          request.lastPage = result.lastPage;

          /* Get the current selected row index for this page of records. */
          let selectedIndex = -1;
          const selectedRow = this.sohoDataGridComponent.getSelectedRows();
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
    } as SohoDataGridOptions;

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }

  onRefresh() {
    console.log('onRefresh() called');
    this.sohoDataGridComponent.triggerSource('refresh', function() {
      console.log('List Refresh Completed');
    });
  }

  onShowPageSizeSelector() {
    this.showPageSizeSelector = !this.showPageSizeSelector;
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    const selectedRows = e.rows.map(row => row.idx).join(', ');
    this.toastService.show({title: 'Se1ected', message: 'Rows Selected: ' + selectedRows});
  }

  onOpenFilterRow(e: SohoDataGridOpenFilterRowEvent) {
    this.toastService.show({title: 'Filter', message: 'filter row opened'});
  }

  onCloseFilterRow(e: SohoDataGridCloseFilterRowEvent) {
    this.toastService.show({title: 'Filter', message: 'filter row closed'});
  }

  toggleFilterRow() {
    this.sohoDataGridComponent.toggleFilterRow();
  }
}
