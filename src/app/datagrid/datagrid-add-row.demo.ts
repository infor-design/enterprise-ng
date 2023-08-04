
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
  public tooltipOptions: SohoTooltipOptions = {
    placement: 'top'
  }

  public tooltipCompressor: SohoTooltipOptions = {
    placement: 'bottom'
  }

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
        // width: 80, 
        sortable: true,
        headerTooltip: 'Name Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'compressor',
        name: 'Compressor',
        field: 'compressor',
        // width: 80,
        sortable: true,
        headerTooltip: 'Compressor Column',
        tooltipOptions: this.tooltipCompressor,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        field: 'quantity',
        // width: 80,
        sortable: true,
        headerTooltip: 'Quantity Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'open',
        name: 'Actions',
        // width: 80,
        sortable: false,
        formatter: Soho.Formatters.Button,
        icon: 'info',
        menuId: 'card-options',
        click: (_: Event, data: SohoDataGridColumnClickData[]) => {
          console.info(data);
          console.info(data[0].item);
        },
      },
    ];
    this.options = {
      dataset: [{ name: 'Lorem', compressor: 'Compressor 1', quantity: 24 }],
      columns,
      enableTooltips: true
    };
  }

  addRow() {
    if (this.newRowData.length > 0) {
      this.dataGrid?.addRow({ name: this.newRowData }, 'top');
      this.newRowData = '';
    }
  }
}
