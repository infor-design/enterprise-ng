import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-datagrid-popupmenu-toolbar',
    templateUrl: './datagrid-popupmenu-toolbar.demo.html',
    standalone: false
})
export class DatagridPopupMenuToolbarComponent implements OnInit {

  @ViewChild(SohoDataGridComponent) dataGrid?: SohoDataGridComponent;

  source = (request: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) => { };
  gridOptions: SohoDataGridOptions = {
    columns: [
      {
        width: 50,
        id: "selectionCheckbox",
        resizable: false,
        sortable: false,
        formatter: Soho.Formatters.SelectionCheckbox,
        align: "center"
      },
      { field: "product", },
      { field: "quantity" },
    ],
    selectable: "multiple",
    dataset: [
      {
        product: "Banana",
        quantity: 1,
      },
      {
        product: "Apple",
        quantity: 10,
      },
      {
        product: "Orange",
        quantity: 5,
      }
    ],

    rowHeight: "medium",
    disableRowDeactivation: true,
    clickToSelect: false,
    isList: true,
    paging: true,
    enableTooltips: false,
    allowSelectAcrossPages: true,
    showNewRowIndicator: false,
    columnSizing: "both",
    source: this.source,
  }

  constructor() { }

  ngOnInit(): void{
  }
}
