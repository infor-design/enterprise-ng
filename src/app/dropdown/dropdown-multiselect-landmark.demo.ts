import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-dropdown-multiselect-landmark-demo',
    templateUrl: './dropdown-multiselect-landmark.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DropdownMultiselectLandmarkDemoComponent implements OnInit {
  @ViewChild(SohoDropDownComponent) dropdown?: SohoDropDownComponent;
  @ViewChild(SohoDropDownComponent, { read: ElementRef }) dropdownElement?: ElementRef;

  public counter = 0;
  public model: Options = {
    value: ['AK', 'CA'],
    options: [
      { value: 'AK', label: 'Alaska', selected: true },
      { value: 'CA', label: 'California', selected: true }
    ]
  };

  public showModel = false;

  statesAlpha: Array<OptionValue> = [
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

  private aStates: Array<OptionValue> = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' }];

  private ctodStates: Array<OptionValue> = [
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    {
      value: 'GU', label: 'Guam'
    }];

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  sourceAlpha = (response: SohoDropDownResponseFunction, searchTerm: any) => {
    const responseValues = [];
    const selectedValues = (this.dropdownElement as any).nativeElement.querySelectorAll('option:checked');

    for (let i = 0; i < selectedValues.length; i++) {
      const optionValue = selectedValues[i].value;
      const array = optionValue.split(':');
      const tempValue1 = array[1];
      const tempValue2 = tempValue1.split('\'');
      const finalValue = tempValue2[1];

      responseValues.push({
        value: finalValue,
        label: selectedValues[i].label,
        selected: true
      });
    }

    if (searchTerm.length > 0 && searchTerm === 'c') {
      const diff = this.diffContains(this.ctodStates, responseValues);

      const returnArray = diff.concat(this.ctodStates);
      this.model.options = returnArray;
      response(returnArray, true);
    } else {
      const diff = this.diffContains(this.aStates, responseValues);

      const returnArray = diff.concat(this.aStates);
      this.model.options = returnArray;
      response(returnArray, true);
    }
  }

  private diffContains(containsArray: any, valueArray: any): Array<OptionValue> {
    let diffArray = [];
    if (containsArray.length < 1) {
      return valueArray;
    }

    diffArray = valueArray.filter((x: any) => !this.arrayContains(containsArray, x.value));
    return diffArray;
  }

  private arrayContains(array: any, value: any): boolean {
    return array.find((x: any) => x.value === value);
  }

  public get stateAsText(): string {
    if (this.model.options.length > 0) {
      return this.model.options.filter((state) => {
        if (this.model.value.includes(state.value)) {
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
