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
  public multisourceoptions: Array<Object> = [
    { value: 'AK', label: 'Alaska', selected: true },
    { value: 'CA', label: 'California', selected: true }
  ];
  public counter = 0;
  public model: {
    closes: string[],
    multi: string[],
    multisource: string[],
    modifiable: Object[]
  } = {
    closes:      [ 'AL', 'DE' ],
    multi:       [],
    multisource: [ 'AK', 'CA' ],
    modifiable:  [],
  };
  public showModel = false;

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

  source = (response: any, searchTerm: any) => {
    const states = [
      { value: 'AK', label: 'Alaska', selected: true },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California', selected: true },
      { value: 'CO', label: 'Colorado' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' }
    ];

    this.multisourceoptions = states;

    response(states);
  }
}
