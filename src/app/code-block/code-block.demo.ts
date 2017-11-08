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
  templateUrl: './code-block.demo.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeBlockDemoComponent implements OnInit {
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

  constructor() { }
  ngOnInit() { }

  onUpdated(event: any) {
    console.log('onUpdated');
  }

  toggleLabels() {
    setTimeout(() => this.showLabels = !this.showLabels);
  }

}
