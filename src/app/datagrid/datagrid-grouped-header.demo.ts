import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { SohoDataGridComponent, } from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'app-datagrid-grouped-header-demo',
  templateUrl: 'datagrid-grouped-header.demo.html',
  providers: [ DataGridPagingIndeterminateDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridGroupedHeaderDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  gridOptions = null;
  selectedRow = 0;
  updateSelectedRow = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datagridPagingService: DataGridPagingIndeterminateDemoService,
  ) {}

  ngOnInit(): void {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {
    if (this.sohoDataGridComponent && this.updateSelectedRow) {
      this.sohoDataGridComponent.selectRows([this.selectedRow]);
      this.updateSelectedRow = false;
    }
  }

  private buildGridOptions(): SohoDataGridOptions {
    return {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: 25,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'small',
      sortable: false,
      columnGroups: [{ colspan: 3, id: 'firstGroup', name: 'Grouped Headers'},
        {colspan: 1, id: '', name: ''},
        {colspan: 2, id: 'secondGroup', name: 'Grouped Headers 2'}],// eslint-disable-line
      disableClientSort: true,
      disableClientFilter: true,
      filterable: true,
      source: this.dataGridSource
    } as SohoDataGridOptions;
  }

  private dataGridSource = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    this.datagridPagingService.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      const selectedRows = this.sohoDataGridComponent ? this.sohoDataGridComponent.selectedRows() : undefined;
      this.selectedRow = selectedRows !== undefined ? selectedRows[0].idx : 0;

      /* Put the data into the data grid */
      this.ngZone.runOutsideAngular(() => response(result.data, request));

      this.updateSelectedRow = true;
      this.changeDetectorRef.markForCheck();
    });
  }
}
