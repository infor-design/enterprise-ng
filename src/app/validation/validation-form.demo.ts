import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';


@Component({
  selector: 'soho-validation-form-demo',
  templateUrl: 'validation-form.demo.html'
})
export class ValidationFormDemoComponent {

private email_addr: string;
private credit_card: string;
private credit_code1: number;
private credit_code2: number;
private states: string;

  constructor(private elementRef: ElementRef) {
  }

  onSubmit() {
    // TODO: Do something here?
    console.log("in onSubmit");
  }

}
