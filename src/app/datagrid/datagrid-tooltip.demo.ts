import {
  Component,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  PAGING_DATA
} from './datagrid-paging-data';


@Component({
  selector: 'app-datagrid-tooltip-demo',
  templateUrl: 'datagrid-tooltip.demo.html',
  standalone: false
})
export class DataGridTooltipDemoComponent {
  public options!: SohoDataGridOptions;
  tooltipContent: any = (
    _row: number,
    _cell: number,
    _value: string,
    _col: SohoDataGridColumn,
    rowData: any,
  ): string => {
    return `Tooltip for ${_row} <br/> Sample Second line`
  };
  public columns: SohoDataGridColumn[] = [
    {
      id: 'productId', name: 'Product Ids', field: 'productId',
      sortable: true,
      tooltip: this.tooltipContent,
      renderTooltipHtmlContents: true
    },
    {
      id: 'price', name: 'Price (std fmt)', field: 'price',
      sortable: false, filterType: 'decimal',
      formatter: Soho.Formatters.Decimal,
      headerTooltip: 'Price </br> column',
      renderTooltipHtmlContents: true
    },
  ];

  public data = PAGING_DATA;

  constructor() {
    this.options = {
      dataset: this.data,
      columns: this.columns,
      enableTooltips: true
    };
  }
}
