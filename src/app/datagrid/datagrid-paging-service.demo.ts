import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoDataGridComponent } from 'ids-enterprise-ng';

import { DataGridPagingServiceDemoService } from './datagrid-paging-service-demo.service';

@Component({
  selector: 'app-datagrid-paging-service-demo',
  templateUrl: 'datagrid-paging-service.demo.html',
  providers: [ DataGridPagingServiceDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingServiceDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;
  private uniqueId: string;

  private savedColumns: Object;
  private savedRowHeight: string;
  private savedSortOrder: string;
  private savedPagesize: string;
  private savedActivePage: string;
  private savedFilter: string;
  public gridOptions = undefined;

  constructor(private datagridPagingService: DataGridPagingServiceDemoService) {}

  ngOnInit(): void {
    /*
     * initialize component after datagrid's AfterViewInit. Since we are
     * higher in the component hierarchy our ngAfterViewInit is called after
     * DataGrid ngAfterViewInit.
     */
    const pageSize = 5;

    this.uniqueId = 'datagrid-paging-demo';

    this.savedRowHeight = lscache.get(this.uniqueId + 'rowHeight');
    this.savedSortOrder = lscache.get(this.uniqueId + 'sortOrder') ? lscache.get(this.uniqueId + 'sortOrder') : null;
    this.savedPagesize = lscache.get(this.uniqueId + 'pagesize');
    this.savedActivePage = lscache.get(this.uniqueId + 'activePage');
    this.savedFilter = lscache.get(this.uniqueId + 'filter') ? lscache.get(this.uniqueId + 'filter') : null;
    this.gridOptions = {
      columns:       this.datagridPagingService.getColumns(),
      selectable:    'multiple',
      paging:        true,
      pagesize:      pageSize,
      pagesizes:     [ 5, 10, 25 ],
      indeterminate: false,
      rowHeight:     'medium', // short, medium or normal
      source:        this.dataGridSource
    };
  }

  private dataGridSource = (req: SohoDataGridSourceRequest, response: any) => {
    this.datagridPagingService.getData(req).subscribe((result: any) => {
      req.total = result.total;
      response(result.data, req);
    });
  }

  exportExcel(e: any) {
    this.sohoDataGridComponent.exportToExcel('', '', this.datagridPagingService.getAllData());
  }

  exportCsv(e: any) {
    this.sohoDataGridComponent.exportToCsv('', this.datagridPagingService.getAllData());
  }

  goToPageTwo() {
    this.sohoDataGridComponent.updatePagingInfo({ activePage: 2, total: 100 });
  }

  onRowClicked(event: SohoDataGridRowClicked) {
    console.log('onRowClicked event is: ' + event);
  }

  onSettingsChanged(event: SohoDataGridSettingsChangedEvent) {
    // Save Each Setting in Local storage
    lscache.set(this.uniqueId + 'columns', JSON.stringify(event.columns));
    lscache.set(this.uniqueId + 'rowHeight', event.rowHeight);
    lscache.set(this.uniqueId + 'sortOrder', JSON.stringify(event.sortOrder));
    lscache.set(this.uniqueId + 'pagesize', event.pagesize);
    lscache.set(this.uniqueId + 'activePage', event.activePage);
    lscache.set(this.uniqueId + 'filter', JSON.stringify(event.filter));
  }

  onRendered(event: SohoDataGridRenderedEvent) {
    const columnString = lscache.get(this.uniqueId + 'columns') ? JSON.stringify(lscache.get(this.uniqueId + 'columns')) : undefined;
    if (!this.sohoDataGridComponent) {
      return;
    }

    if (columnString) {
      this.savedColumns = this.sohoDataGridComponent.columnsFromString(columnString);
    }

    this.sohoDataGridComponent.restoreUserSettings({activePage: this.savedActivePage, columns: this.savedColumns,
      rowHeight: this.savedRowHeight, sortOrder: this.savedSortOrder, pagesize: this.savedPagesize, filter: this.savedFilter});
  }
}
