import {
  AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, NgZone, OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent, SohoToastService} from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'app-datagrid-paging-indeterminate-demo',
  templateUrl: 'datagrid-paging-indeterminate.demo.html',
  providers: [DataGridPagingIndeterminateDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingIndeterminateDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent)
  private sohoDataGridComponent?: SohoDataGridComponent;

  public showPageSizeSelector = true;
  public gridOptions?: SohoDataGridOptions = undefined;
  private selectedRow = 0;
  private updateSelectedRow = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datagridPagingService: DataGridPagingIndeterminateDemoService,
    private toastService: SohoToastService,
  ) { }

  ngOnInit(): void {
    this.gridOptions = {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: 10,
      pagesizes: [5, 10, 25, 100],
      indeterminate: true,
      rowHeight: 'small',
      sortable: false,
      showPageSizeSelector: this.showPageSizeSelector,
      disableClientSort: true,
      disableClientFilter: true,
      filterable: true,
      source: this.dataGridSource
    } as SohoDataGridOptions;
  }

  ngAfterViewChecked() {
    if (this.sohoDataGridComponent && this.updateSelectedRow) {
      this.sohoDataGridComponent?.selectRows([this.selectedRow]);
      this.updateSelectedRow = false;
    }
  }

  private dataGridSource = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    if (request.type === 'filtered') {
      this.toastService.show({ title: 'Filter', message: 'gridsource with filtered type called' });
    }
    this.datagridPagingService.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      const selectedRows = this.sohoDataGridComponent ? this.sohoDataGridComponent?.selectedRows() : undefined;
      this.selectedRow = selectedRows !== undefined ? selectedRows[0].idx : 0;

      /* Put the data into the data grid */
      this.ngZone.runOutsideAngular(() => response(result.data, request));

      this.updateSelectedRow = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  onRefresh() {
    console.log('onRefresh() called');
    this.sohoDataGridComponent?.triggerSource('refresh', function () {
      console.log('List Refresh Completed');
    });
  }

  onShowPageSizeSelector() {
    this.showPageSizeSelector = !this.showPageSizeSelector;
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    const selectedRows = e.rows.map(row => row.idx).join(', ');
    this.toastService.show({ title: 'Selected', message: 'Rows Selected: ' + selectedRows + ' type ' + e.type });
  }

  onOpenFilterRow(_e: SohoDataGridOpenFilterRowEvent) {
    this.toastService.show({ title: 'Filter', message: 'filter row opened' });
  }

  onCloseFilterRow(_e: SohoDataGridCloseFilterRowEvent) {
    this.toastService.show({ title: 'Filter', message: 'filter row closed' });
  }

  toggleFilterRow() {
    this.sohoDataGridComponent?.toggleFilterRow();
  }

  setHeaderCheckbox(state: SohoDataGridHeaderCheckboxState) {
    this.sohoDataGridComponent?.setHeaderCheckboxState(state);
  }
}
