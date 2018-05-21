import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: './dropdown.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownDemoComponent {
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
    single: '',
    readOnly: 'DE',
    source: '',
    modifiable: this.options[3],
    sourceAlpha: {
      value: 'MN',
      options: [
        { value: 'MN', label: 'Minnesota' },
      ]
    }
  };
  public showModel = true;
  public dropDownDisabled = false;
  public dropDownReadOnly = false;

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

  source = (response: any, searchTerm: any) => {
    const states = [
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' }
    ];

    this.model.sourceAlpha.options = states;

    setTimeout(() => {
      response(states, true);
    }, 1);
  }
}
