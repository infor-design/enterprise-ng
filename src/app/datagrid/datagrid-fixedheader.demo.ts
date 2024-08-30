import {
  AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'app-datagrid-fixed-header-demo',
  templateUrl: 'datagrid-fixedheader.demo.html',
  providers: [DataGridPagingIndeterminateDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridFixedHeaderDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datagridPagingService: DataGridPagingIndeterminateDemoService
  ) { }

  gridOptions?: SohoDataGridOptions = undefined;
  selectedRow = 0;
  updateSelectedRow = false;

  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  onSelected(args: SohoDataGridSelectedEvent) {
    console.log('onSelected', args);
  }

  onClick() {
    // One Way
    // if (!this.sohoDataGridComponent) return;
    // this.sohoDataGridComponent.rowHeight =large';
    // this.sohoDataGridComponent.updated();

    // Another Way
    this.gridOptions = { ...this.gridOptions, rowHeight: 'large' }
  }

  onClickDown() {
    if (this.sohoDataGridComponent) {
      const s = this.sohoDataGridComponent.gridOptions;

      if (s.pagesize && s.dataset) {
        const lastRow = s.pagesize > s.dataset.length ? s.dataset.length - 1 : s.pagesize - 1;
        this.sohoDataGridComponent.scrollRowIntoView(lastRow);
      }
    }
  }

  private buildGridOptions(): SohoDataGridOptions {
    return {
      columns: this.datagridPagingService?.getColumns(),
      selectable: 'multiple',
      paging: true,
      pagesize: 100,
      pagesizes: [5, 10, 25, 100],
      indeterminate: true,
      rowHeight: 'short',
      filterable: true,
      source: this.dataGridOptions
    } as SohoDataGridOptions;
  }

  private dataGridOptions = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    this.datagridPagingService?.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      const selectedRows = this.sohoDataGridComponent ? this.sohoDataGridComponent.selectedRows() : undefined;
      this.selectedRow = selectedRows !== undefined && selectedRows.length > 0 ? selectedRows[0].idx : 0;
      if (result.data.length > 0)
        this.ngZone.runOutsideAngular(() => response(result.data, request));

      this.updateSelectedRow = true;
      this.changeDetectorRef.markForCheck();
    });
  }
}
