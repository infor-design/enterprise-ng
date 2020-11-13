import {
  AfterViewInit,
  Component, ElementRef,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPopDownDirective } from 'ids-enterprise-ng';
import { columns, ledgerData } from './mock.data';

@Component({
  selector: 'app-codeblock-demo',
  templateUrl: './code-block.demo.html',
  styleUrls: ['./code-block.demo.scss']
})
export class CodeBlockDemoComponent implements AfterViewInit {

  @ViewChild(SohoPopDownDirective, { static: true }) popdown?: SohoPopDownDirective;
  @ViewChild('compound_field_popdown_contents', { static: true }) contents?: ElementRef;

  public model = {
    ledger: { title: 'Ledger', value: 'CORE' },
    accountingEntity: { title: 'Accounting Entity', value: '1001' },
    date: { title: 'Date', value: '12/04/2019' },
    costCenter: {
      title: 'Cost Center', value: 'AL', options: [{ value: 'AL', text: 'Alabama' },
      { value: 'CA', text: 'California' },
      { value: 'DE', text: 'Delaware' },
      { value: 'NY', text: 'New York' },
      { value: 'WY', text: 'Wyoming' }]
    },
    department: { title: 'Department', value: '102' },
    AlphaField: { title: 'Alpha Field', value: 'ABC' },
    DateField: { title: 'Date Field', value: '12/01/2017' },
    DropdownField: { title: 'Dropdown Field', value: 'Option #1' },
    CheckBoxField: { title: 'CheckBox Field', value: 'false' },
    PercentField: { title: 'Percent Field', value: '123 %' }
  };

  public firstFieldValue = '';
  public secondFieldValue = '';

  public columns = columns;
  public ledgerData = ledgerData;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.popdown) { }
  }

  onFocusCompoundField() {
    if (this.popdown) {
      this.popdown?.open();
      $('#compound_field_popdown_contents .field:first-child :focusable:first-child').trigger('focus');
      $('#compound_field_popdown_contents .field:last-of-type :focusable').on('blur', () => {
        this.popdown?.close();
        setTimeout(() => $('#lm-code-block + div.field :focusable').trigger('focus'), 1);
      });
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.popdown?.close();
      $('#lm-code-block + div.field :focusable').trigger('focus');
    }
  }
}
