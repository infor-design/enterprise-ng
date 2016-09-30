import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'fieldset[soho-radiobutton]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoRadioButtonComponent {
  @HostBinding('attr.disabled')
  @Input() disabled: boolean;

  @HostBinding('attr.disabled')
  @Input() readonly: boolean;
}
