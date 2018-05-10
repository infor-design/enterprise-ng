import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from 'ids-enterprise-ng';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-rowreorder-demo',
  templateUrl: './datagrid-rowreorder.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridRowReorderDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) datagrid: SohoDataGridComponent;

  constructor(gridService: SohoDataGridService) {
    (gridService as DataGridDemoService).addColumn({
      id: 'rowReorder',
      name: '',
      field: 'id',
      align: 'center',
      sortable: false,
      formatter: Soho.Formatters.RowReorder,
      width: 80
    });
  }

  ngAfterViewInit() {
  }

  onRowReordered(event: SohoDataGridRowReorderedEvent) {
    console.log('startIndex: ' + event.startIndex, 'endIndex: ' + event.endIndex);
  }

  onRowClicked(event: SohoDataGridRowClicked) {
    console.log('selectedRow: ' + event.row + ' , productId: ' + event.item.productId);
  }
}
