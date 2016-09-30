import { Component } from '@angular/core';

@Component({
  selector: 'fieldset[soho-radiobutton]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoRadioButtonComponent {
  // Radio button does not have an initializer
  // Might need to hookup events here?
}
