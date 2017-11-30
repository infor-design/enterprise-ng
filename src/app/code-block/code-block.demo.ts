import {
  Component,
  OnInit,
  ChangeDetectionStrategy, ViewChild
} from '@angular/core';

import {
  columns,
  ledgerData,
  accountingData,
  departmentData,
  costCenterData
} from './mock.data';

@Component({
  selector: 'soho-codeblock-demo',
  templateUrl: './code-block.demo.html'
})
export class CodeBlockDemoComponent implements OnInit {

  public model = {
    ledger: 'CORE',
    accountingEntity: '1001',
    accountingUnit: '99 CORP',
    costCenter: '102',
    department: '102',
    AlphaField: 'ABC',
    DateField: '12/01/2017',
    DropdownField: 'Option #1',
    CheckBoxField: 'false',
    PercentField: '123 %'
  };

  public columns = columns;
  public ledgerData = ledgerData;
  public accountingData = accountingData;
  public departmentData = departmentData;
  public costCenterData = costCenterData;

  constructor() { }
  ngOnInit() { }

}
