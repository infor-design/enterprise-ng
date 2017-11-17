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
  template: `<input lm-code-block [(ngModel)]="value"/>`
  //               soho-mask
  //               alignRight="true"
  //               [process]="'number'"
  //               [integerLimit]="3"
  //               (write)="onMaskWrite($event)"/>
})
export class CodeBlockEditorComponent  implements SohoDataGridCellEditor {
  @ViewChild(CodeBlockComponent) codeblock: CodeBlockComponent;

  value: string;

  constructor( @Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.value = args.value;
  }

  // onMaskWrite(event: any) {
  //   console.log(`CodeBlockEditorComponent ${this.args.row} onMaskWrite: ${event}`);
  // }

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
    width: 200
  },

  {
    id: 'companyName',
    name: 'Name',
    field: 'companyName',
    filterType: 'text',
    width: 200
  },

  {
    id: 'code-block',
    name: 'Code BlocK',
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
