import { Component, OnInit, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { SohoDropDownComponent } from 'soho/dropdown';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: './dropdown.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownDemoComponent implements OnInit {
  @ViewChildren(SohoDropDownComponent) dropDowns: QueryList<SohoDropDownComponent>;

  public options: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  sourceoptions: Array<Object> = [];
  public counter = 0;
  public model = {
    single: 'AL',
    readOnly: 'DE',
    source: '',
    modifiable: this.options[3],
  };
  public showModel = false;
  public dropDownDisabled = false;
  public dropDownReadOnly = false;

  constructor() { }
  ngOnInit() { }
  onAddOption() {
    this.options.push({ value: 'test' + this.counter, text: 'Test ' + this.counter });
    this.counter++;
  }
  onRemoveOption() {
    this.options.pop();
  }
  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.dropDowns.first.disabled = false;
    this.dropDownDisabled = this.dropDowns.first.disabled;
    this.dropDownReadOnly = this.dropDowns.first.readonly;
  }

  setDisable() {
    this.dropDowns.first.disabled = true;
    this.dropDownDisabled = true;
  }

  setReadonly() {
    this.dropDowns.first.readonly = true;
    this.dropDownReadOnly = true;
  }

  source(response: any, searchTerm: any) {
    const states = [
      { value: 'AK', label: 'Alaska'},
      { value: 'AZ', label: 'Arizona'},
      { value: 'CA', label: 'California'},
      { value: 'CO', label: 'Colorado'},
      { value: 'MN', label: 'Minnesota'},
      { value: 'ND', label: 'North Dakota'},
      { value: 'OR', label: 'Oregon'},
      { value: 'WA', label: 'Washington'},
      { value: 'WY', label: 'Wyoming'}
    ];

    this.sourceoptions = states;

    response(states, true);
  }
}
