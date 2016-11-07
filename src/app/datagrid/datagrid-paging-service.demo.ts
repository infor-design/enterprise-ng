import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { SohoDataGridComponent } from '@infor/sohoxi-angular';

import { DataGridPagingServiceDemoService } from './datagrid-paging-service-demo.service';

@Component({
  selector: 'soho-datagrid-paging-service-demo',
  templateUrl: 'datagrid-paging-service.demo.html',
  providers: [ DataGridPagingServiceDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingServiceDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor(private datagridPagingService: DataGridPagingServiceDemoService) {}

  ngAfterViewInit(): void {
    /*
     * initialize component after datagrid's AfterViewInit. Since we are
     * higher in the component hierarchy our ngAfterViewInit is called after
     * DataGrid ngAfterViewInit.
     */
    let pageSize = 5;

    let gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: pageSize,
      pagesizes: [ 5, 10, 25 ],
      indeterminate: false,
      rowHeight: 'medium', // short, medium or normal
    };

    gridOptions.source = (req: SohoDataGridSourceRequest, response: any) => {

      /*
       * Option1: COMMENT OUT THE RETURN - when getting an initial page request. The
       * getDataService will recognize the 'initial' paging type and return the first page of data.
       */
      // if (req.type === 'initial') {
      //   return;
      // }

      this.datagridPagingService.getData(req).subscribe((result: any) => {
        req.total = result.total;
        response(result.data, req);
      });
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;

    /*
     * Options2 - LOAD INITIAL DATA DIRECTLY - bypass the initial type in the
     * source function and load directly into:
     * NOTE: only seems to work with indeterminate paging. Perhaps a something
     * missing in the SohoDataGridSourceRequest object?!?
     */
    // let initialRequest: SohoDataGridSourceRequest = { activePage: 1, pagesize: pageSize, type: '', total: 100, filterExpr: []};
    // this.datagridPagingService.getData(initialRequest).subscribe((result: any) => {
    //   this.sohoDataGridComponent.data = result.data;
    // });
  }
}
