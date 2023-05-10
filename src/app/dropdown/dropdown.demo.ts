import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-dropdown-demo',
  templateUrl: 'dropdown.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownDemoComponent {
  @ViewChildren(SohoDropDownComponent) dropDowns?: QueryList<SohoDropDownComponent>;

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
    },
    blank: ''
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

  onKeyDown(e: Event) {
    console.log('keydown', e);
  }

  onListClosed(e: SohoDropDownEvent) {
    console.log(`listclosed: ${e.action}`);
  }

  onListOpened(_e: SohoDropDownEvent) {
    console.log(`listopened`);
  }

  onChange(e: SohoDropDownEvent) {
    console.log(`change ${e.target}`);
  }
  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    (this.dropDowns as any).first.disabled = false;
    (this.dropDowns as any).first.readonly = false;
    this.dropDownDisabled = (this.dropDowns as any).first.disabled;
    this.dropDownReadOnly = (this.dropDowns as any).first.readonly;
  }

  setDisable() {
    (this.dropDowns as any).first.disabled = true;
    this.dropDownDisabled = true;
  }

  setReadonly() {
    (this.dropDowns as any).first.readonly = true;
    this.dropDownReadOnly = true;
  }

  source = (response: any, _searchTerm: any) => {
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
