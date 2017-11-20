import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from '@infor/sohoxi-angular';

import {
  DataGridDemoService
} from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-settings-demo',
  templateUrl: './datagrid-settings.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridSettingsDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) datagrid: SohoDataGridComponent;

  constructor(gridService: SohoDataGridService) {
    (<DataGridDemoService> gridService).addColumn({
      id: 'rowReorder',
      name: '',
      field: 'id',
      align: 'center',
      sortable: false,
      formatter: Formatters.RowReorder,
      width: 80
    });
  }

  ngAfterViewInit() {
  }

  /**
   * Make several changes to the component in one go.
   */
  makeChange() {
    this.datagrid.isList = !this.datagrid.isList;
    this.datagrid.alternateRowShading = !this.datagrid.alternateRowShading;
    this.datagrid.cellNavigation = !this.datagrid.cellNavigation;
  }

  onRowReordered(event: SohoDataGridRowReorderedEvent) {
    console.log("startIndex: " + event.startIndex);
    console.log("endIndex: " + event.endIndex);
  }

  onRowClicked(event: SohoDataGridRowClicked) {
    console.log("selectedRow: " + event.row + " , productId: " + event.item.productId);
  }
}
