import {
  AfterViewChecked,
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
    selector: 'soho-datagrid-frozen-column-refresh-demo',
    templateUrl: 'datagrid-frozen-column-refresh-demo.component.html',
    providers: [DataGridPagingIndeterminateDemoService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridFrozenColumnRefreshDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions: any = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datagridPagingService: DataGridPagingIndeterminateDemoService,
  ) {}

  ngOnInit(): void {
    this.gridOptions = this.buildGridOptions();
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
      disableClientSort: true,
      disableClientFilter: true,
      filterable: true,
      source: this.dataGridSource,
      frozenColumns: {
        left: ['productId', 'productName'],
      },
    } as SohoDataGridOptions;
  }

  private dataGridSource = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => {
    this.datagridPagingService.getData(request).subscribe((result: any) => {
      request.firstPage = result.firstPage;
      request.lastPage = result.lastPage;

      /* Put the data into the data grid */
      this.ngZone.runOutsideAngular(() => response(result.data, request));
      this.changeDetectorRef.markForCheck();
    });
  }

  // Mock refresh
  // Grid options are rebuilt on refresh in a real world application
  public refresh() {
    this.gridOptions = this.buildGridOptions();
  }
}
