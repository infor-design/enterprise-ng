import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector:        'soho-dropdown-multiselect-demo',
  templateUrl:     './dropdown-multiselect.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMultiselectDemoComponent implements OnInit {
  public options: Array<Object> = [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'DE', label: 'Delaware' },
    { value: 'NY', label: 'New York' },
    { value: 'WY', label: 'Wyoming' },
  ];
  public multiSourceAlphaOptions: Array<Object> = [
    { value: 'AK', label: 'Alaska', selected: true },
    { value: 'CA', label: 'California', selected: true }
  ];
  public multiSourceNumericOptions: Array<Object> = [
    { value: '1', label: 'Alaska', selected: true },
    { value: '3', label: 'California', selected: true }
  ];
  public counter = 0;
  public model: {
    closes: string[],
    multi: string[],
    multiSourceAlpha: string[],
    multiSourceNumeric: string[],
    modifiable: Object[]
  } = {
    closes:             [ 'AL', 'DE' ],
    multi:              [],
    multiSourceAlpha:   [ 'AK', 'CA' ],
    multiSourceNumeric: [ '1', '3' ],
    modifiable:         [],
  };
  public showModel = false;
  private statesAlpha = [
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
  private statesNumeric = [
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

  constructor() {
  }

  ngOnInit() {
  }

  onAddOption() {
    this.options.push({ value: 'test' + this.counter, label: 'Test ' + this.counter });
    this.counter++;
  }

  onRemoveOption() {
    this.options.pop();
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  sourceAlpha = (response: any, searchTerm: any) => {
    // uses statesAlpha array as response
    // rebuild options using current model value to set the selected state
    const values = this.model.multiSourceAlpha;
    const options = [];
    for (let index = 0; index < this.statesAlpha.length; index++) {
      const state = this.statesAlpha[ index ];
      const isSelected = (values.includes(state.value)) ? true : undefined;
      options.push({ value: state.value, label: state.label, selected: isSelected });
    }

    this.multiSourceAlphaOptions = options;

    response(options);
  }

  sourceNumeric = (response: any, searchTerm: any) => {
    // uses statesNumeric array as response
    // rebuild options using current model value to set the selected state
    const values = this.model.multiSourceNumeric;
    const options = [];
    for (let index = 0; index < this.statesNumeric.length; index++) {
      const state = this.statesNumeric[ index ];
      const isSelected = (values.includes(state.value)) ? true : undefined;
      options.push({ value: state.value, label: state.label, selected: isSelected });
    }

    this.multiSourceNumericOptions = options;

    response(options);
  }
}
