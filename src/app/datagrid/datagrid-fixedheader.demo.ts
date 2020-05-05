import {
  AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { DataGridPagingIndeterminateDemoService } from './datagrid-paging-indeterminate-demo.service';

@Component({
  selector: 'app-datagrid-fixed-header-demo',
  templateUrl: 'datagrid-fixedheader.demo.html',
  providers: [ DataGridPagingIndeterminateDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridFixedHeaderDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datagridPagingService: DataGridPagingIndeterminateDemoService
  ) {}

  gridOptions: SohoDataGridOptions = undefined;
  selectedRow = 0;
  updateSelectedRow = false;

  ngOnInit() {
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
      selectable: 'multiple',
      paging: true,
      pagesize: 100,
      pagesizes: [ 5, 10, 25, 100 ],
      indeterminate: true,
      rowHeight: 'short',
      filterable: true,
      source: this.dataGridOptions
    } as SohoDataGridOptions;
  }

  private dataGridOptions = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    this.datagridPagingService.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      const selectedRows = this.sohoDataGridComponent ? this.sohoDataGridComponent.selectedRows() : undefined;
      this.selectedRow = selectedRows !== undefined ? selectedRows[0].idx : 0;

      this.ngZone.runOutsideAngular(() => response(result.data, request));

      this.updateSelectedRow = true;
      this.changeDetectorRef.markForCheck();
    });
  }
}
