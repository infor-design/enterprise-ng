import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'app-datagrid-groupable-paging-demo',
    templateUrl: 'datagrid-groupable-paging.demo.html',
    standalone: false
})
export class DataGridGroupablePagingDemoComponent {
  gridOptions: SohoDataGridOptions = {};
  model = {
    inputValue: 'test',
  };

  constructor(private ngZone: NgZone) {
    this.gridOptions = {
      columns: [
        { name: 'Name', field: 'name' },
        { name: 'Group', field: 'group' },
        {
          name: 'Link',
          field: 'link',
          formatter: this.getLinkFormatter(),
          click: () => {},
        }
      ],
      groupable: {
        fields: ['group'],
        aggregator: 'sum',
      },
      dataset: [
        { name: 'Sample A', group: '1' },
        { name: 'Sample B', group: '2' },
        { name: 'Sample C', group: '3' },
        { name: 'Sample D', group: '4' },
        { name: 'Sample E', group: '5' },
        { name: 'Sample F', group: '6' },
        { name: 'Sample G', group: '7' },
        { name: 'Sample H', group: '8' },
        { name: 'Sample I', group: '9' },
        { name: 'Sample J', group: '10' },
        { name: 'Sample K', group: '11' },
        { name: 'Sample L', group: '' },
        { name: 'Sample M', group: '' },
        { name: 'Sample N', group: '' },
        { name: 'Sample O', group: '' },
      ],
      paging: true,
      pagesize: 5,
      isList: true,
      editable: true,
      expandableRow: true,
      enableTooltips: true,
      selectable: 'single' as SohoDataGridSelectable,
    };
  }

  getLinkFormatter(): SohoDataGridColumnFormatterFunction {
    return (
      _row: number,
      _cell: number,
      value: string,
      _col: SohoDataGridColumn,
      rowData: unknown,
      _api: SohoDataGridStatic
    ): string => {
      return '<a href="#">Click Me</a>';
    };
  }

}
