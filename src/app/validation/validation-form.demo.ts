import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

import { SohoInputValidateDirective } from 'soho/input-validate';

@Component({
  selector: 'soho-validation-form-demo',
  templateUrl: './validation-form.demo.html'
})
export class ValidationFormDemoComponent {

  @ViewChildren(SohoInputValidateDirective) validateDirectives: QueryList<SohoInputValidateDirective>;

  email_addr: string;
  credit_card: string;
  credit_code1: number;
  credit_code2: number;
  requiredText: string;
  states: string;

  constructor(private elementRef: ElementRef) {
  }

  onSubmit() {
    // TODO: Do something here?
    console.log('in onSubmit');
  }

  public onClickTrigger(event) {
    this.validateDirectives.forEach((item) => {
      item.validate(event);
    });
  }

  public onClickReset() {
    this.validateDirectives.forEach((item) => {
      item.removeMessage('error');
    });
  }
}
