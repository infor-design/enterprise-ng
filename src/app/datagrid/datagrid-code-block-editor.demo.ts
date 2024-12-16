import {
  Component,
  ViewChild,
  Inject,
  OnInit
} from '@angular/core';

import {
  CODE_BLOCK_DATA
} from '../demodata/code-block-data';

import {
  CodeBlockComponent
} from '../code-block/code-block.component';

export const CodeBlockFormatter = (_row: any, _cell: any, _value: any, _col: any, _rowData: any, _api: any): string => {
  /* tslint:disable */
  return `
    <span class="code-block">

        <label for="ledger" soho-label="" class="label">Ledger</label>
        <span class="data">CORE</span>

        <label for="accounting-entity" soho-label="" class="label">Accounting Entity</label>
        <span class="data">1001</span>

        <label for="accounting-unit" soho-label="" class="label">Accounting Unit</label>
        <span class="data">99 CORP</span>

        <!--
        <label for="cost-center" soho-label="" class="label">Cost Center</label>
        <span class="data">102</span>

        <label for="department" soho-label="" class="label">Department</label>
        <span class="data">102</span>
        -->

  </span>`;
  /* eslint-enable */
};

@Component({
    //  template: `<div lm-code-block [(ngModel)]="value"></div>`
    // TODO: Probably use an ngIf and insert these from data
    template: `
      <div lm-code-block>

          <div class="field">
            <label soho-label for="ledger">Ledger</label>
            <input soho-lookup soho-field-options #focusRef name="ledger" id="ledger" value="CORE" size="4"
              [autoWidth]="true"
              [(ngModel)]="model.ledger"
              [columns]="columns"
              [dataset]="ledgerData"
              field="column1">

            <!--
            <button soho-button="icon" icon="more" class="btn-actions btn-menu" soho-context-menu trigger="click"></button>
            <ul soho-popupmenu>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
              <li soho-popupmenu-item>
                <a soho-popupmenu-label>Drill Around</a>
                <ul soho-popupmenu>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
                </ul>
              </li>
            </ul>
            -->
          </div>

          <div class="field">
            <label soho-label for="accounting-entity">Accounting Entity</label>
            <input soho-lookup soho-field-options name="accounting-entity" id="accounting-entity" type="text" value="1001" size="4"
              [autoWidth]="true"
              [(ngModel)]="model.accountingEntity"
              [columns]="columns"
              [dataset]="accountingData"
              field="column1">

            <!--
            <button soho-button="icon" icon="more" class="btn-actions btn-menu" soho-context-menu trigger="click"></button>
            <ul soho-popupmenu>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
              <li soho-popupmenu-item>
                <a soho-popupmenu-label>Drill Around</a>
                <ul soho-popupmenu>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
                </ul>
              </li>
              </ul>
              -->
          </div>

          <div class="field">
            <label soho-label for="accounting-unit">Accounting Unit</label>
            <input soho-lookup soho-field-options name="accounting-unit" id="accounting-unit" type="text" value="99 CORP" size="6"
              [autoWidth]="true"
              [(ngModel)]="model.accountingUnit"
              [columns]="columns"
              [dataset]="accountingData"
              field="column1">

            <!--
            <button soho-button="icon" icon="more" class="btn-actions btn-menu" soho-context-menu trigger="click"></button>
            <ul soho-popupmenu>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
              <li soho-popupmenu-item>
                <a soho-popupmenu-label>Drill Around</a>
                <ul soho-popupmenu>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
                </ul>
              </li>
            </ul>
            -->
          </div>

          <!--
          <div class="field">
            <label soho-label for="cost-center">Cost Center</label>
            <input soho-lookup soho-field-options name="cost-center" id="cost-center" type="text" value="102" size="3"
              [autoWidth]="true"
              [(ngModel)]="model.costCenter"
              [columns]="columns"
              [dataset]="costCenterData"
              field="column1">

            <button soho-button="icon" icon="more" class="btn-actions btn-menu" soho-context-menu trigger="click"></button>
            <ul soho-popupmenu>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
              <li soho-popupmenu-item>
                <a soho-popupmenu-label>Drill Around</a>
                <ul soho-popupmenu>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="field">
            <label soho-label for="department">Department</label>
            <input soho-lookup soho-field-options name="department" id="department" type="text" value="102" size="3"
              [autoWidth]="true"
              [(ngModel)]="model.department"
              [columns]="columns"
              [dataset]="departmentData"
              field="column1">

            <button soho-button="icon" icon="more" class="btn-actions btn-menu" soho-context-menu trigger="click"></button>
            <ul soho-popupmenu>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
              <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
              <li soho-popupmenu-item>
                <a soho-popupmenu-label>Drill Around</a>
                <ul soho-popupmenu>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
                  <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
                </ul>
              </li>
            </ul>
          </div>
          -->

      </div>
  `,
    standalone: false
})
export class CodeBlockEditorComponent implements SohoDataGridCellEditor {
  @ViewChild(CodeBlockComponent, { static: true }) codeblock?: CodeBlockComponent;

  value: string;
  public className = '.code-block';

  public model = {
    ledger: 'CORE',
    accountingEntity: '1001',
    accountingUnit: '99 CORP',
    costCenter: '102',
    department: '102'
  };

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.value = args.value;
  }

  // @region Soho Editor Implementation
  val(value?: any) {
    if (value) {
      this.value = value;
    }
    return this.value;
  }

  focus() {
    this.codeblock?.focus();
  }

  get columns(): SohoDataGridColumn[] {
    return COLUMNS; // eslint-disable-line
  }

  ledgerData(): any[] {
    return [];
  }

  accountingData(): any[] {
    return [];
  }

  departmentData(): any[] {
    return [];
  }

  costCenterData(): any[] {
    return [];
  }
}

export const COLUMNS: SohoDataGridColumn[] = [
  {
    id: 'selectionCheckbox',
    sortable: false,
    resizable: false,
    width: 50,
    formatter: Soho.Formatters.SelectionCheckbox,
    align: 'center'
  },

  {
    id: 'companyId',
    name: 'Company',
    field: 'companyId',
    filterType: 'text',
    // width: 200,
    editor: Soho.Editors.Input
  },

  {
    id: 'codeBlock',
    name: 'Code Block',
    field: 'codeBlock',
    sortable: false,
    formatter: CodeBlockFormatter,
    filterType: 'text',
    // expandOnActivate: true,
    textOverflow: 'ellipsis',
    editorComponent: CodeBlockEditorComponent,
    editorComponentInputs: {},
    width: 570
  },

  {
    id: 'companyName',
    name: 'Name',
    field: 'companyName',
    filterType: 'text',
    // width: 200,
    editor: Soho.Editors.Input
  },

  /*
  { id: 'codeBlock',
    name: 'Code Block',
    field: 'codeBlock',
    sortable: false,
    formatter: CodeBlockFormatter,
    filterType: 'text',
    expandOnActivate: true,
    textOverflow: 'ellipsis',
    editorComponent: CodeBlockEditorComponent,
    editorComponentInputs: {}
  }
  */
];

@Component({
    selector: 'app-datagrid-code-block-editor',
    templateUrl: 'datagrid-code-block-editor.demo.html',
    styleUrls: ['../code-block/code-block.formatter.css'],
    standalone: false
})
export class DataGridCodeBlockEditorDemoComponent implements OnInit {
  gridOptions?: SohoDataGridOptions = undefined;

  ngOnInit(): void {
    const tooltipCallback = (_cell: number, value: any): string => {
      return 'Test: ' + value;
    };

    COLUMNS[1].tooltip = tooltipCallback;
    COLUMNS[2].tooltip = tooltipCallback;

    this.gridOptions = {
      columns: COLUMNS, // eslint-disable-line
      dataset: CODE_BLOCK_DATA,
      editable: true,
      filterable: false,
      enableTooltips: true,
      redrawOnResize: false,
      rowHeight: 'small',
      selectable: 'mixed',
      showDirty: true,
      cellNavigation: true,
      actionableMode: true,
    };
  }
}
