import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-dropdown-multiselect-demo',
  templateUrl: 'dropdown-multiselect.demo.html',
})
export class DropdownMultiselectDemoComponent implements OnInit {
  private options: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  multisourceoptions: Array<Object> = [];
  private counter = 0;
  private model: { // tslint:disable-line
    closes: string[],
    multi: string[],
    multisource: string[],
    modifiable: Object[]
  } = {
    closes: ['AL', 'DE'],
    multi: [],
    multisource: [],
    modifiable: [],
  };
  private showModel = false;

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

   source(response: any, searchTerm: any) {
     let states = [
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

    this.multisourceoptions = states;

    response(states);
  }
}
