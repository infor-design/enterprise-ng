import {
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'soho-validation-form-demo',
  templateUrl: 'validation-form.demo.html'
})
export class ValidationFormDemoComponent {

  email_addr: string;
  credit_card: string;
  credit_code1: number;
  credit_code2: number;
  states: string;

  constructor(private elementRef: ElementRef) {
  }

  onSubmit() {
    // TODO: Do something here?
    console.log('in onSubmit');
  }
}
