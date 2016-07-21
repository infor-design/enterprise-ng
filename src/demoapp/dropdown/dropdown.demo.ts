import { Component, OnInit } from '@angular/core';
import { SoHoDropdownComponent, SoHoButtonComponent } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-dropdown-demo',
  templateUrl: 'dropdown.demo.html',
  directives: [ SoHoButtonComponent, SoHoDropdownComponent ],
})
export class DropdownDemoComponent implements OnInit {
  private options: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  private multiOptions: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  private counter = 0;
  private multiCounter = 0;
  constructor() { }
  ngOnInit() { }
  getValue(dropdown: SoHoDropdownComponent) {
    return dropdown.value.join(', ');
  }
  onAddOption() {
    this.options.push({ value: 'test' + this.counter, text: 'Test ' + this.counter });
    this.counter++;
  }
  onAddMultiOption() {
    this.multiOptions.push({ value: 'test' + this.multiCounter, text: 'Test ' + this.multiCounter });
    this.multiCounter++;
  }
  onRemoveOption() {
    this.options.pop();
  }
  onRemoveMultiOption() {
    this.multiOptions.pop();
  }
}
