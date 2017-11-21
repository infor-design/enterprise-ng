import {
  Component,
  ContentChild,
  ViewChild,
  AfterViewInit,
  ComponentRef,
  ElementRef,
  Input,
  Inject,
  OnDestroy
} from '@angular/core';

import {
  SohoDataGridComponent,
} from '@infor/sohoxi-angular';

import {
  CODE_BLOCK_DATA
} from '../demodata/code-block-data';

import {
  CodeBlockComponent
} from '../code-block/code-block.component';

@Component({
  //  template: `<div lm-code-block [(ngModel)]="value"></div>`
  // TODO: Probably use an ngIf and insert these from data
  template: `
      <div lm-code-block ngDefaultControl>

          <div class="field">
            <label soho-label for="ledger">Ledger</label>
            <input soho-lookup soho-field-options name="ledger" id="ledger" value="CORE" size="4"
              [autoWidth]="true"
              [(ngModel)]="model.ledger"
              [columns]="columns"
              [dataset]="ledgerData"
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
            <label soho-label for="accounting-entity">Accounting Entity</label>
            <input soho-lookup soho-field-options name="accounting-entity" id="accounting-entity" type="text" value="1001" size="4"
              [autoWidth]="true"
              [(ngModel)]="model.accountingEntity"
              [columns]="columns"
              [dataset]="accountingData"
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
            <label soho-label for="accounting-unit">Accounting Unit</label>
            <input soho-lookup soho-field-options name="accounting-unit" id="accounting-unit" type="text" value="99 CORP" size="6"
              [autoWidth]="true"
              [(ngModel)]="model.accountingUnit"
              [columns]="columns"
              [dataset]="accountingData"
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

      </div>
  `
})
export class CodeBlockEditorComponent  implements SohoDataGridCellEditor {
  @ViewChild(CodeBlockComponent) codeblock: CodeBlockComponent;

  value: string;

  public model = {
    ledger: 'CORE',
    accountingEntity: '1001',
    accountingUnit: '99 CORP',
    costCenter: '102',
    department: '102'
  };

  constructor( @Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.value = args.value;
    console.log(args);
  }

  // @region Soho Editor Implementation
  val(value?: any) {
    if (value) {
      this.value = value;
    }
    return this.value;
  }

  focus() {
    this.codeblock.focus();
  }
}

export const COLUMNS: SohoDataGridColumn[] = [
  {
    id: 'companyId',
    name: 'Company',
    field: 'companyId',
    filterType: 'text',
    width: 200,
    editor: Editors.Input
  },

  {
    id: 'companyName',
    name: 'Name',
    field: 'companyName',
    filterType: 'text',
    width: 200,
    editor: Editors.Input
  },

  {
    id: 'code-block',
    name: 'Code Block',
    field: 'code-block',
    sortable: false,
    filterType: 'text',
    editorComponent: CodeBlockEditorComponent,
    editorComponentInputs: {}
  }
];

@Component({
  selector: 'soho-datagrid-code-block-editor',
  templateUrl: './datagrid-code-block-editor.demo.html'
})
export class DataGridCodeBlockEditorDemoComponent implements AfterViewInit {

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor() { }

  ngAfterViewInit(): void {

    this.sohoDataGridComponent.gridOptions = {
      columns: COLUMNS,
      dataset: CODE_BLOCK_DATA,
      selectable: 'single',
      idProperty: 'productId',
      editable: true,
      filterable: true
    };

  }
}
