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
  SohoButtonComponent
} from '@infor/sohoxi-angular';
import {
  CodeBlockComponent
} from '../code-block/code-block.component';
import {
  PAGING_DATA
} from './datagrid-paging-data';
import {
  columns,
  ledgerData,
  accountingData,
  departmentData,
  costCenterData
} from '../code-block/mock.data';

@Component({
  template: `<div lm-code-block>
    <div class="field">
      <label *ngIf="showLabels" soho-label for="ledger">Ledger</label>
      <input soho-lookup soho-field-options name="ledger" id="ledger" value="CORE" size="6"
        [autoWidth]="true"
        [(ngModel)]="model.ledger">
    </div>

    <div class="field">
      <label *ngIf="showLabels" soho-label for="accounting-entity">Accounting Entity</label>
      <input soho-lookup soho-field-options name="accounting-entity" id="accounting-entity" type="text" value="110{{args?.row}}" size="4"
        [autoWidth]="true">
    </div>
  </div>`
})
export class CodeBlockCellFormatterComponent implements OnDestroy {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
  }

  public showModel = false;
  public showLabels = true;

  public model = {
    ledger: 'CORE',
    accountingEntity: '1001',
    accountingUnit: '99 CORP',
    costCenter: '102',
    department: '102'
  };

  public columns = columns;
  public ledgerData = ledgerData;
  public accountingData = accountingData;
  public departmentData = departmentData;
  public costCenterData = costCenterData;

  toggleLabels() {
    setTimeout(() => this.showLabels = !this.showLabels);
  }

  ngOnDestroy() {
  }
}

@Component({
  selector: 'soho-datagrid-code-block-formatter-demo',
  templateUrl: './datagrid-code-block-formatter.demo.html',
  entryComponents: [SohoButtonComponent, CodeBlockComponent, CodeBlockCellFormatterComponent],
})
export class DataGridCodeBlockFormatterDemoComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'productId', name: 'Company', field: 'productId'},
    { id: 'productId', name: 'Name', field: 'productId'},
    { id: 'button-formatter', name: 'Code Block', text: 'Edit Row',
      sortable: false, icon: 'edit', align: 'center',
      formatter: Formatters.Button, click: (e, args) => this.onClick(args) },
    { id: 'button', name: 'Code Block',
      sortable: false, postRender: true,
      component: CodeBlockCellFormatterComponent,
      componentInputs: { value: 'somespecialvalue' } }
  ];

  public data = PAGING_DATA;

  constructor() {}

  onClick(args) {
    console.log('click');
  }
}
