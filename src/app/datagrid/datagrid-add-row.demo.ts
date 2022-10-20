
import {
} from 'rxjs';

import {
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-datagrid-add-row-demo',
  templateUrl: 'datagrid-add-row.demo.html',
  providers: []
})
export class DataGridAddRowDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;


  public options!: SohoDataGridOptions;
  public newRowData!: string;

  constructor() { }

  ngOnInit(): void {
    this.setGridOptions();
  }

  private setGridOptions(): void {
    const columns = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        width: 150,
        sortable: true,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'open',
        name: 'Actions',
        width: 80,
        formatter: Soho.Formatters.Button,
        icon: 'info',
        headerTooltip: 'Actions',
        resizable: false,
        sortable: false,
        menuId: 'card-options',
        click: (_: Event, data: SohoDataGridColumnClickData[]) => {
          console.info(data);
          console.info(data[0].item);
        },
      },
    ];
    this.options = {
      dataset: [{ name: 'Foo' }],
      columns,
    };
  }

  addRow() {
    if (this.newRowData.length > 0) {
      this.dataGrid?.addRow({ name: this.newRowData }, 'top');
      this.newRowData = '';
    }
  }
}
