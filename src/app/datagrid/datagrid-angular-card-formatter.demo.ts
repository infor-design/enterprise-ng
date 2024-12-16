import {
  Component,
  Inject
} from '@angular/core';

import {
  CARD_DATA
} from './datagrid-paging-data';

@Component({
    template: `<app-datagrid-card-demo [dataSet]="data"></app-datagrid-card-demo>`,
    standalone: false
})
export class CardFormatterComponent {
  public data: any;

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.data = args.value.cardData;
  }
}

@Component({
    selector: 'app-datagrid-angular-card-formatter-demo',
    templateUrl: 'datagrid-angular-card-formatter.demo.html',
    standalone: false
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
      formatter: Soho.Formatters.Button, click: (_e, args) => this.onClick(args) },
    { id: 'price',  name: 'Price (std fmt)', field: 'price',
      sortable: false, filterType: 'decimal',
      formatter: Soho.Formatters.Decimal }
  ];

  public data = CARD_DATA;

  constructor() {}

  onClick(args: any) {
    console.log(args);
  }
}
