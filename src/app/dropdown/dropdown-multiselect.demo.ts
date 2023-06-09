import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChildren,
  QueryList
} from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-dropdown-multiselect-demo',
  templateUrl: './dropdown-multiselect.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMultiselectDemoComponent implements OnInit {
  @ViewChildren(SohoDropDownComponent) dropDowns?: QueryList<SohoDropDownComponent>;

  public options: Array<OptionValue> = [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'DE', label: 'Delaware' },
    { value: 'NY', label: 'New York' },
    { value: 'WY', label: 'Wyoming' },
  ];
  public counter = 0;
  public model: {
    closes: string[],
    multi: string[],
    multiSourceAlpha: Options,
    multiSourceNumeric: Options,
    modifiable: Object[]
  } = {
      closes: ['AL', 'DE'],
      multi: [],
      multiSourceAlpha: {
        value: ['AK', 'CA'],
        options: [
          { value: 'AK', label: 'Alaska', selected: true },
          { value: 'CA', label: 'California', selected: true }
        ]
      },
      multiSourceNumeric: {
        value: ['1', '3'],
        options: [
          { value: '1', label: 'Alaska', selected: true },
          { value: '3', label: 'California', selected: true }
        ]
      },
      modifiable: [],
    };

  public showModel = false;
  public dropDownDisabled = false;
  public dropDownReadOnly = false;

  private statesAlpha: Array<OptionValue> = [
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
  private statesNumeric: Array<OptionValue> = [
    { value: '1', label: 'Alaska' },
    { value: '2', label: 'Arizona' },
    { value: '3', label: 'California' },
    { value: '4', label: 'Colorado' },
    { value: '5', label: 'Minnesota' },
    { value: '6', label: 'North Dakota' },
    { value: '7', label: 'Oregon' },
    { value: '8', label: 'Washington' },
    { value: '9', label: 'Wyoming' }
  ];

  constructor() { }
  ngOnInit() { }

  onAddOption() {
    const option: OptionValue = { value: 'test' + this.counter, label: 'Test ' + this.counter };
    this.options.push(option);

    this.counter++;
  }

  onRemoveOption() {
    this.options.pop();
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

  sourceAlpha = (response: SohoDropDownResponseFunction, _searchTerm: any) => {
    // uses statesAlpha array as response
    // rebuild options using current model value to set the selected state
    const values = this.model.multiSourceAlpha.value;
    const options: any = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.statesAlpha.length; index++) {
      const state = this.statesAlpha[index];
      const isSelected = (values.includes(state.value)) ? true : undefined;
      const option: OptionValue = { value: state.value, label: state.label, selected: isSelected };
      options.push(option);
    }

    this.model.multiSourceAlpha.options = options;

    setTimeout(() => {
      // indicate to sohoxi dropdown to not create option tags
      response(options, true);
    }, 1);
  }

  sourceNumeric = (response: SohoDropDownResponseFunction, _searchTerm: any) => {
    // uses statesNumeric array as response
    // rebuild options using current model value to set the selected state
    const values = this.model.multiSourceNumeric.value;
    const options: any = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.statesNumeric.length; index++) {
      const state = this.statesNumeric[index];
      const isSelected = (values.includes(state.value)) ? true : undefined;
      const option: OptionValue = { value: state.value, label: state.label, selected: isSelected };
      options.push(option);
    }

    this.model.multiSourceNumeric.options = options;

    setTimeout(() => {
      // indicate to sohoxi dropdown to not create option tags
      response(options, true);
    }, 1);
  }

  public get stateAsText(): string {
    if (this.model.multiSourceAlpha.options.length > 0) {
      return this.model.multiSourceAlpha.options.filter((state) => {
        if (this.model.multiSourceAlpha.value.includes(state.value)) {
          return state;
        }
      }).map((state) => {
        return state.label;
      }).join(', ');
    }

    return '';
  }
}

interface Options {
  value: any;
  options: Array<OptionValue>;
}

interface OptionValue {
  value: any;
  label: string;
  selected?: boolean;
}
