import { Component } from '@angular/core';
import { CODE_BLOCK_DATA } from '../demodata/code-block-data';

export const CodeBlockFormatter = (_row: any, _cell: any, _value: any, _col: any, rowData: any, _api: any): string => {
  console.log(rowData);

  /* eslint-disable */
  return `
    <span class="code-block">

        <label for="ledger" soho-label="" class="label">Ledger</label>
        <span class="data">CORE</span>

        <label for="accounting-entity" soho-label="" class="label">Accounting Entity</label>
        <span class="data">1001</span>

        <label for="accounting-unit" soho-label="" class="label">Accounting Unit</label>
        <span class="data">99 CORP</span>

        <label for="cost-center" soho-label="" class="label">Cost Center</label>
        <span class="data">102</span>

        <label for="department" soho-label="" class="label">Department</label>
        <span class="data">102</span>

  </span>`;
  /* eslint-enable */
};

@Component({
  selector: 'app-datagrid-code-block-formatter-demo',
  templateUrl: 'datagrid-code-block-formatter.demo.html',
  styleUrls: ['../code-block/code-block.formatter.css']
})
export class DataGridCodeBlockFormatterDemoComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'companyId', name: 'Company', field: 'companyId', width: 200},
    { id: 'companyName', name: 'Name', field: 'companyName', width: 200},
    { id: 'codeBlock', name: 'Code Block',
      sortable: false,
      formatter: CodeBlockFormatter,
      expandOnActivate: true,
      textOverflow: 'ellipsis'
    }
  ];

  public data = CODE_BLOCK_DATA;

  constructor() {}

  onClick(_args: any) {
    console.log('click');
  }
}
