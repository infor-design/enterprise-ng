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
    selector: 'app-dropdown-multiselect-attributes',
    templateUrl: './dropdown-multiselect-attributes-demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DropdownMultiselectAttributesDemoComponent implements OnInit {
  @ViewChild(SohoDropDownComponent) dropdown?: SohoDropDownComponent;
  @ViewChild(SohoDropDownComponent, { read: ElementRef }) dropdownElement?: ElementRef;

  public counter = 0;
  public model: Options = {
    value: [],
    options: [
      { value: 'WR', label: 'Wrightstown', selected: true },
      { value: 'BM', label: 'Bellmawr', selected: true }
    ]
  };

  public extraAttributes = {
    attributes: [
      {
        name: 'id',
        value: 'towns'
      },
      {
        name: 'data-automation-id',
        value: 'custom-automation-dropdown-id'
      }
    ]
  };

  public showModel = false;

  private aTowns: Array<OptionValue> = [
    { value: 'WR', label: 'Wrightstown' },
    { value: 'BM', label: 'Bellmawr' }
  ];

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

    const diff = this.diffContains(this.aTowns, responseValues);

    const returnArray = diff.concat(this.aTowns);
    this.model.options = returnArray;
    response(returnArray, true);
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
