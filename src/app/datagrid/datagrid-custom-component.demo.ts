
import {
} from 'rxjs';

import {
  Component,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-formatter',
  template: '<p style="color: red">formatted</p>',
})
export class FormatterComponent {
  public data: any;

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.data = args.value;
    console.log('component formatter ran', this.data);
  }
}

@Component({
  selector: 'app-datagrid-custom-demo',
  templateUrl: 'datagrid-custom-component.demo.html',
  providers: []
})
export class DataGridCustomComponent implements OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent?: SohoDataGridComponent;
  gridOptions?: SohoDataGridOptions = undefined;
  columns!: any[];
  pagingData: any[] = [];

  constructor() { }
  ngOnInit() {
    this.pagingData = [
      {
        spo: 'PRJ0000911100',
        project: 'Building10',
        orderDate: '10.10.2022',
        buyer: 'Company1',
        spoStatus: 'Approved',
      },
      {
        spo: 'PRJ0000911100',
        project: 'Building1',
        orderDate: '10.10.2022',
        buyer: 'Company2',
        spoStatus: 'Declined',
      },
      {
        spo: 'PRJ0000911100',
        project: 'Building2',
        orderDate: '10.10.2022',
        buyer: 'Company3',
        spoStatus: 'Approved',
      },
      {
        spo: 'PRJ0000911100',
        project: 'Building0011',
        orderDate: '10.10.2022',
        buyer: 'Company4',
        spoStatus: 'Declined',
      },
      {
        spo: 'PRJ0000911100',
        project: 'Building00009',
        orderDate: '10.10.2022',
        buyer: 'Company5',
        spoStatus: 'Incomplete',
      },
      {
        spo: 'PRJ0000911100',
        project: 'Building003',
        orderDate: '10.10.2022',
        buyer: 'Company6',
        spoStatus: 'Incomplete',
      },
    ];
    this.columns = [
      {
        id: 'spo',
        name: 'SPO',
        field: 'spo',
        editor: Soho.Editors.Input,
        sortable: true,
        filterType: 'text',
      },
      {
        id: 'project',
        name: 'Project',
        field: 'project',
        sortable: true,
        component: FormatterComponent,
        componentInputs: {},
        postRender: true,
        filterType: 'text',
      },
      {
        id: 'orderDate',
        name: 'Order Date',
        field: 'orderDate',
        formatter: Soho.Formatters.Date,
        sortable: true,
        filterType: 'date',
        dateFormat: 'MM.dd.yyyy',
      },
      {
        id: 'spoStatus',
        name: 'SPO Status',
        field: 'spoStatus',
        sortable: true,
        formatter: Soho.Formatters.Input,
        filterType: 'text',
      },
      {
        id: 'buyer',
        name: 'Buyer',
        field: 'buyer',
        formatter: Soho.Formatters.Input,
        editor: Soho.Editors.Input,
        filterType: 'text',
        sortable: true,
      },
    ];

    this.gridOptions = {
      columns: this.columns,
      dataset: this.pagingData,
      selectable: 'single',
      showNewRowIndicator: false,
      editable: true,
      filterable: true,
      clickToSelect: false,
      rowTemplate: `<div class="datagrid-cell-layout"></div>`,
      toolbar: {
        keywordFilter: false,
      },
    };
  }

  onCellChange(event: any) {
    if (this.sohoDataGridComponent) {
      this.sohoDataGridComponent.updateRow(event.row, event.rowData);
    }
    console.log('onCellChange', event);
  }
}
