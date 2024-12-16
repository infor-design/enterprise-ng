
import {
} from 'rxjs';

import {
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { datagrid } from 'jquery';

interface SohoDataGridRow {
  name: string;
  compressor?: string;
  quantity?: number;
}
@Component({
    selector: 'app-datagrid-add-row-demo',
    templateUrl: 'datagrid-add-row.demo.html',
    providers: [],
    standalone: false
})
export class DataGridAddRowDemoComponent implements OnInit {
  @ViewChild('firstgrid', { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild('secondgrid', { static: true }) transferGrid?: SohoDataGridComponent;

  public options!: SohoDataGridOptions;
  public t_options!: SohoDataGridOptions;
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
    this.setTransferGridOptions();
  }

  private setTransferGridOptions(): void {
    var removeCallback = function (row: number, cell: number, value: any, col: SohoDataGridColumn, rowData: Object, api: SohoDataGridStatic) {
      console.log(row, cell, value, col, rowData, api);
      return `Remove`
    }

    const columns = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
        headerTooltip: 'Name Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'compressor',
        name: 'Compressor',
        field: 'compressor',
        sortable: true,
        headerTooltip: 'Compressor Column',
        tooltipOptions: this.tooltipCompressor,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        field: 'quantity',
        sortable: true,
        headerTooltip: 'Quantity Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'open',
        name: 'Actions',
        sortable: false,
        formatter: Soho.Formatters.Button,
        icon: 'add',
        menuId: 'card-options',
        tooltip: removeCallback,
        click: (_: Event, data: SohoDataGridColumnClickData[]) => {
          console.info('data', data);
          this.removeTransferredRow(data[0].row, data[0].item);
        },
      },
    ];
    this.t_options = {
      dataset: [],
      columns,
      enableTooltips: true
    };
  }

  private setGridOptions(): void {
    var addCallback = function (row: number, cell: number, value: any, col: SohoDataGridColumn, rowData: Object, api: SohoDataGridStatic) {
      console.log(row, cell, value, col, rowData, api);
      return `Add`
    }

    const columns = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
        headerTooltip: 'Name Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'compressor',
        name: 'Compressor',
        field: 'compressor',
        sortable: true,
        headerTooltip: 'Compressor Column',
        tooltipOptions: this.tooltipCompressor,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        field: 'quantity',
        sortable: true,
        headerTooltip: 'Quantity Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'open',
        name: 'Actions',
        sortable: false,
        formatter: Soho.Formatters.Button,
        icon: 'add',
        menuId: 'card-options',
        tooltip: addCallback,
        click: (_: Event, data: SohoDataGridColumnClickData[]) => {
          console.info('data', data);
          this.addTransferredRow(data[0].row, data[0].item);
        },
      },
    ];
    this.options = {
      dataset: [{ name: 'Lorem', compressor: 'Compressor 1', quantity: 24 }, { name: 'Ipsum', compressor: 'Compressor 2', quantity: 36 }],
      columns,
      enableTooltips: true
    };
  }

  addRow() {
    if (this.newRowData?.length > 0) {
      this.dataGrid?.addRow({ name: this.newRowData, compressor: 'Compressor X', quantity: 21 }, 'top');
      this.newRowData = '';
    }
  }

  addTransferredRow(row: number, item: SohoDataGridRow) {
    this.dataGrid?.removeRow(row);
    this.transferGrid?.addRow({ name: item.name, compressor: item.compressor, quantity: item.quantity })
  }

  removeTransferredRow(row: number, item: SohoDataGridRow) {
    this.transferGrid?.removeRow(row);
    this.dataGrid?.addRow({ name: item.name, compressor: item.compressor, quantity: item.quantity })
  }
}
