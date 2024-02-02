import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { DatagridColumnComponent } from './datagrid-column-component.demo';

@Component({
  selector: 'datagrid-with-column-component',
  templateUrl: './datagrid-with-column-component.demo.html',
  styleUrls: ['./datagrid-with-column-component.demo.scss'],
})
export class DatagridWithColumnComponent implements OnInit {
  @ViewChild('datagrid') datagrid?: SohoDataGridComponent;

  private defaultGridSettings: SohoDataGridOptions = {
    rowHeight: 'medium',
    isList: true,
    spacerColumn: true,
    editable: true,
  };

  private standardColumns = [
    'productId',
    'productName',
    'quantity',
    'price',
  ].map((col) => this.getDefaultColumn(col, {}));

  private editableomponentColumn: SohoDataGridColumn = {
    ...this.getDefaultColumn('associatedProductId', {
      component: DatagridColumnComponent,
      editor: Soho.Editors.Input,
      minWidth: 300,
    }),
    name: 'Editable column',
  };

  data = Array.from([].constructor(10), (_, i) => ({
    productId: 100 + i,
    productName: `Product ${100 + i}`,
    quantity: 100 + i,
    price: 100 + i,
    associatedProductId: 100 + i,
  }));

  gridSettings: SohoDataGridOptions = {
    ...this.defaultGridSettings,
    columns: [...this.standardColumns, this.editableomponentColumn],
  };
  constructor() { }

  ngOnInit() { }

  private getDefaultColumn(field: string, options: SohoDataGridColumn) {
    return {
      ...options,
      id: field,
      name: field,
      field: field,
      sortable: false,
      resizable: false,
    };
  }

  refresh() {
    this.datagrid?.updated();
  }
}
