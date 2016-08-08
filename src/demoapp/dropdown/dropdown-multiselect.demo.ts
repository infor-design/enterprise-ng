import { Component, OnInit } from '@angular/core';
import { SohoDropdownComponent, SohoButtonComponent } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-dropdown-multiselect-demo',
  templateUrl: 'dropdown-multiselect.demo.html',
  directives: [ SohoButtonComponent, SohoDropdownComponent ],
})
export class DropdownMultiselectDemoComponent implements OnInit {
  private options: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  private counter = 0;
  constructor() { }
  ngOnInit() { }
  getValue(dropdown: SohoDropdownComponent) {
    return dropdown.value.join(', ');
  }
  onAddOption() {
    this.options.push({ value: 'test' + this.counter, text: 'Test ' + this.counter });
    this.counter++;
  }
  onRemoveOption() {
    this.options.pop();
  }
}
