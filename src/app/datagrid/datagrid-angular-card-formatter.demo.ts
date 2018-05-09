import {
  Component,
  Inject
} from '@angular/core';
import {
  SohoButtonComponent,
} from 'ids-enterprise-ng';
import {
  CARD_DATA
} from './datagrid-paging-data';

@Component({
  template: `<soho-datagrid-card-demo [dataSet]="data"></soho-datagrid-card-demo>`
})
export class CardFormatterComponent {
  public data;

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.data = args.value.cardData;
  }
}

@Component({
  selector: 'soho-datagrid-angular-card-formatter-demo',
  templateUrl: './datagrid-angular-card-formatter.demo.html',
  entryComponents: [SohoButtonComponent],
})
export class DataGridAngularCardFormatterDemoComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'cardId', name: 'Card Formatter', field: 'cardId', sortable: false, width: 320,
      component: CardFormatterComponent, componentInputs: {}, postRender: true
    },
    { id: 'productId',   name: 'Product Id',   field: 'productId',
      sortable: false, filterType: 'integer',
      formatter: Soho.Formatters.Readonly },
    { id: 'button-formatter', name: 'Edit', text: 'Edit Row',
      sortable: false, icon: 'edit', align: 'center',
      formatter: Soho.Formatters.Button, click: (e, args) => this.onClick(args) },
    { id: 'price',  name: 'Price (std fmt)', field: 'price',
      sortable: false, filterType: 'decimal',
      formatter: Soho.Formatters.Decimal }
  ];

  public data = CARD_DATA;

  constructor() {}

  onClick(args) {
    console.log(args);
  }
}
