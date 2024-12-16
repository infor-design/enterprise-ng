import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import {
  DIRTY_INDICATION_COLUMNS,
  DIRTY_INDICATION_DATA
} from './datagrid-dirty-indication-data';

const ROW = 2;
const CELL = 5;

@Component({
    selector: 'app-datagrid-dirty-indication-demo',
    templateUrl: 'datagrid-dirty-indication.demo.html',
    standalone: false
})
export class DataGridDirtyIndicationDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  public gridOptions: any;
  public row = ROW;
  public cell = CELL;

  ngOnInit(): void {
    this.gridOptions = {
      columns: DIRTY_INDICATION_COLUMNS,
      dataset: DIRTY_INDICATION_DATA,
      editable: true,
      clickToSelect: false,
      selectable: 'multiple',
      paging: true,
      pagesize: 5,
      showDirty: true,
      pagesizes: [5, 10, 25, 50]
    };
  }

  onClearDirtySelected(event: SohoContextMenuEvent) {
    const action = event.args.attr('data-action');
    const gridApi = this.sohoDataGridComponent;
    if (!gridApi) {
      return;
    }

    if (action === 'specific-cell') {
      gridApi?.clearDirtyCell(ROW, CELL);
    }
    if (action === 'all-cells-in-row') {
      gridApi?.clearDirtyRow(ROW);
    }
    if (action === 'all') {
      gridApi?.clearDirty();
    }
  }
}
