import {
  Component,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
  template: '<button soho-button="icon" icon="settings" (click)="onClick($event)">Cell: {{args.cell}}, Row: {{args?.row}}</button>'
})
export class ButtonCellFormatterComponent implements OnDestroy {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    console.log(`constructor ${this.args.value}`);
  }
  public onClick(_e: any) {
    console.log(`${this.args.row}`);
  }

  ngOnDestroy() {
    console.log(`DemoCellFormatterComponent ${this.args.row} destroyed`);
  }
}

@Component({
  template: '<p>{{args?.value?.price}}</p>'
})
export class PriceCellFormatterComponent {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {}
}

@Component({
  selector: 'app-datagrid-angular-formatter-demo',
  templateUrl: 'datagrid-angular-formatter.demo.html'
})
export class DataGridAngularFormatterDemoComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'productId',   name: 'Product Id',   field: 'productId',
      sortable: false, filterType: 'integer',
      formatter: Soho.Formatters.Readonly },
    { id: 'button-formatter', name: 'Edit', text: 'Edit Row',
      sortable: false, icon: 'edit', align: 'center',
      formatter: Soho.Formatters.Button, click: (_e, args) => this.onClick(args),
      disabled: this.disableButton },
    { id: 'button', name: 'Settings',
      sortable: false, align: 'center', postRender: true,
      component: ButtonCellFormatterComponent,
      componentInputs: { value: 'somespecialvalue' } },
    { id: 'price',  name: 'Price (std fmt)', field: 'price',
      sortable: false, filterType: 'decimal',
      formatter: Soho.Formatters.Decimal },
    { id: 'price2', name: 'Price (ng fmt)', field: 'price',
      sortable: false, align: 'center', postRender: true,
      component: PriceCellFormatterComponent, componentInputs: {} }
  ];

  public data = PAGING_DATA;

  constructor() {}

  onClick(_args: any) {
    console.log('click');
  }
  disableButton(_row: number, _cell: any, _data: any, _col: SohoDataGridColumn, item: any) {
    return (item.productId === 214221 || item.productId === 214222);
  }
}
