import {
  Component,
  OnInit
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

  private MENU_RESPONSE_HTML = '' +
    '<li><a href="#" id="ShowFieldHistory">Show Field History</a></li>' +
    '<li><a href="#" id="ShowPendingChanges">Show Pending Changes</a></li>' +
    '';

  public columns = columns;
  public ledgerData = ledgerData;
  public accountingData = accountingData;
  public departmentData = departmentData;
  public costCenterData = costCenterData;

  private isPopupBuilt = false;

  public id1 = 'checkbox1';

  constructor() { }
  ngOnInit() { }

  onBeforeContextMenuOpen = (response: AjaxBeforeOpenResponseFunction, options: any) => {
    if (!this.isPopupBuilt) {
      response(this.MENU_RESPONSE_HTML);
      return;
    }
  }

  onSelected($event) {
    alert($event.args[0].id + ' clicked');
  }
}
