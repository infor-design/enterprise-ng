import { Component, HostBinding, Input } from '@angular/core';

/**
 * This example shows basic field options functionality on input elements
 */
@Component({
  selector:    'soho-field-options-demo',
  templateUrl: './field-options.demo.html'
})
export class FieldOptionsDemoComponent {

  public model = {
    textValue: '012012'
  };

  constructor() {
  }

}
