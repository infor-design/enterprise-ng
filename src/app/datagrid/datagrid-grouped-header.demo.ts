import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewChild } from '@angular/core';
import { SohoDataGridComponent, } from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'app-datagrid-grouped-header-demo',
  templateUrl: './datagrid-grouped-header.demo.html',
  providers: [ DataGridPagingIndeterminateDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridGroupedHeaderDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  public gridOptions = null;

  constructor(
    private datagridPagingService: DataGridPagingIndeterminateDemoService,
    private ngZone: NgZone
  ) {}

  private dataGridSource = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    this.datagridPagingService.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      /* Get the current selected row index for this page of records. */
      let selectedIndex = -1;
      const selectedRow = this.sohoDataGridComponent.selectedRows();
      if (selectedRow && selectedRow.length > 0 && selectedRow[0].idx !== -1) {
        selectedIndex = selectedRow[0].idx;
        this.sohoDataGridComponent.unSelectAllRows();
      }

      /* Put the data into the data grid */
      this.ngZone.runOutsideAngular(() => response(result.data, request));

      /* selected the row index of the new page of records */
      this.sohoDataGridComponent.selectRows(selectedIndex === -1 ? 0 : selectedIndex);
    });
  }

  ngAfterViewInit(): void {
    const gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: 25,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'short', // short, medium or normal
      sortable: false,
      columnGroups: [{ colspan: 3, id: 'firstGroup', name: 'Grouped Headers'},
        {colspan: 1, id: '', name: ''},
        {colspan: 2, id: 'secondGroup', name: 'Grouped Headers 2'}],// tslint:disable-line

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
        // run from a timeout to ensure change detection runs and the viewChildd sohoDataGridComponent is created
        setTimeout(() => this.dataGridSource(request, response));
      }
    };

    // in ngAfterViewInit/Checked must set inputs from a timeout so that change detection is executed.
    setTimeout(() => this.sohoDataGridComponent.gridOptions = gridOptions);
  }
}
