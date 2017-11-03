import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  SohoDataGridComponent,
  SohoButtonComponent,
} from '@infor/sohoxi-angular';
import {
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
  template: '<button soho-button="primary" (click)="onClick($event)">Cell: {{args.cell}}, Row: {{args?.row}}</button>'
})
export class ButtonCellFormatterComponent implements OnDestroy {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellFunctionArgs) {
    console.log(`constructor ${this.args.value}`);
  }
  public onClick(e) {
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
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellFunctionArgs) {}
}

@Component({
  selector: 'soho-datagrid-angular-formatter-demo',
  templateUrl: './datagrid-angular-formatter.demo.html',
  entryComponents: [SohoButtonComponent],
})
export class DataGridAngularFormatterDemoComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'productId',   name: 'Product Id',   field: 'productId', sortable: false, filterType: 'integer', width: 140, formatter: Formatters.Readonly },
    { id: 'button-formatter', name: 'Edit', text: 'Edit Row', sortable: false, icon: 'edit', align: 'center', formatter: Formatters.Button, click: (e, args) => this.onClick(args) },
    { id: 'button', name: 'Settings', sortable: false, align: 'center', postRender: true, component: ButtonCellFormatterComponent, componentInputs: { value: 'somespecialvalue' } },
    { id: 'price2', name: 'Price', field: 'price', sortable: false, align: 'center', postRender: true, component: PriceCellFormatterComponent, componentInputs: {} }
  ];

  public data = PAGING_DATA;

  constructor() {}

  onClick(args) {
    console.log('click');
  }
}
