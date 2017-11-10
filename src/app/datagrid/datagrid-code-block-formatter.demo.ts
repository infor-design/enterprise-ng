import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  template: `<div lm-code-block [readonly]="true">

      <div class="field">
        <label soho-label for="ledger">Ledger</label>
        <span class="data">{{model.ledger}}</span>
      </div>

      <div class="field">
        <label soho-label for="accounting-entity">Accounting Entity</label>
        <span class="data">100{{args?.row}}</span>
      </div>

      <div class="field">
        <label soho-label for="accounting-unit">Accounting Unit</label>
        <span class="data">99 CORP</span>
      </div>

      <div class="field">
        <label soho-label for="cost-center">Cost Center</label>
        <span class="data">102</span>
      </div>

      <div class="field">
        <label soho-label for="department">Department</label>
        <span class="data">102</span>
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
      expandOnActivate: true,
      textOverflow: 'ellipsis'
    }
  ];

  public data = PAGING_DATA;

  constructor() {}

  onClick(args) {
    console.log('click');
  }
}
