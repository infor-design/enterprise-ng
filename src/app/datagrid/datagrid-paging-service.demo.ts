import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import { DataGridPagingServiceDemoService } from './datagrid-paging-service-demo.service';

@Component({
  selector: 'app-datagrid-paging-service-demo',
  templateUrl: 'datagrid-paging-service.demo.html',
  providers: [DataGridPagingServiceDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingServiceDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  private uniqueId?: string;

  private savedColumns?: Object;
  private savedRowHeight?: string;
  private savedSortOrder?: string;
  private savedPagesize?: string;
  private savedActivePage?: string;
  private savedFilter?: string;
  public gridOptions: any = undefined;

  constructor(private datagridPagingService: DataGridPagingServiceDemoService) { }

  ngOnInit(): void {
    /*
     * initialize component after datagrid's AfterViewInit. Since we are
     * higher in the component hierarchy our ngAfterViewInit is called after
     * DataGrid ngAfterViewInit.
     */
    const pageSize = 5;

    this.uniqueId = 'datagrid-paging-demo';

    this.savedRowHeight = localStorage[this.uniqueId + 'rowHeight'];
    this.savedSortOrder = localStorage[this.uniqueId + 'sortOrder'] ? localStorage[this.uniqueId + 'sortOrder'] : null;
    this.savedPagesize = localStorage[this.uniqueId + 'pagesize'];
    this.savedActivePage = localStorage[this.uniqueId + 'activePage'];
    this.savedFilter = localStorage[this.uniqueId + 'filter'] ? localStorage[this.uniqueId + 'filter'] : null;
    this.gridOptions = {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'multiple',
      paging: true,
      pagesize: pageSize,
      pagesizes: [5, 10, 25],
      indeterminate: false,
      rowHeight: 'medium',
      source: this.dataGridSource
    };
  }

  private dataGridSource = (req: SohoDataGridSourceRequest, response: any) => {
    this.datagridPagingService.getData(req).subscribe((result: any) => {
      req.total = result.total;
      response(result.data, req);
    });
  }

  exportExcel(_e: any) {
    this.sohoDataGridComponent?.exportToExcel('', '', this.datagridPagingService.getAllData());
  }

  exportCsv(_e: any) {
    this.sohoDataGridComponent?.exportToCsv('', this.datagridPagingService.getAllData());
  }

  goToPageTwo() {
    this.sohoDataGridComponent?.updatePagingInfo({ activePage: 2, total: 100 });
  }

  onRowClicked(event: SohoDataGridRowClicked) {
    console.log('onRowClicked event is: ' + event);
  }

  onSettingsChanged(event: SohoDataGridSettingsChangedEvent) {
    // Save Each Setting in Local storage
    localStorage[this.uniqueId + 'columns'] = JSON.stringify(event.columns);
    localStorage[this.uniqueId + 'rowHeight'] = event.rowHeight;
    localStorage[this.uniqueId + 'sortOrder'] = JSON.stringify(event.sortOrder);
    localStorage[this.uniqueId + 'pagesize'] = event.pagesize;
    localStorage[this.uniqueId + 'activePage'] = event.activePage;
    localStorage[this.uniqueId + 'filter'] = JSON.stringify(event.filter);

    console.log('activePage type', typeof event.activePage)
  }

  onRendered(_event: SohoDataGridRenderedEvent) {
    const columnString = localStorage[this.uniqueId + 'columns'] ? JSON.stringify(localStorage[this.uniqueId + 'columns']) : undefined;
    if (!this.sohoDataGridComponent) {
      return;
    }

    if (columnString) {
      this.savedColumns = this.sohoDataGridComponent?.columnsFromString(columnString);
    }

    this.sohoDataGridComponent?.restoreUserSettings({
      activePage: this.savedActivePage, columns: this.savedColumns,
      rowHeight: this.savedRowHeight, sortOrder: this.savedSortOrder, pagesize: this.savedPagesize, filter: this.savedFilter
    });
  }

  onBeforePaging(_event: SohoPagerPagingInfo) {
    console.log('onBeforePaging', _event);
  }

  onAfterPaging(_event: SohoPagerPagingInfo) {
    console.log('onAfterPaging', _event);
  }

  onFirstPage(_event: SohoPagerPagingInfo) {
    console.log('onFirstPage', _event);
  }

  onLastPage(_event: SohoPagerPagingInfo) {
    console.log('onLastPage', _event);
  }

  onNextPage(_event: SohoPagerPagingInfo) {
    console.log('onNextPage', _event);
  }

  onPreviousPage(_event: SohoPagerPagingInfo) {
    console.log('onPreviousPage', _event);
  }

  onPageSizeChange(_event: SohoPagerPagingInfo) {
    console.log('onPageSizeChange', _event);
  }
}
