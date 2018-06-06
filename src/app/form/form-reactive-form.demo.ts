import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

import { MOCK_STATES } from '../dropdown/dropdown-mock.data';

@Component({
  selector: 'soho-reactive-form.demo',
  templateUrl: './form-reactive-form.demo.html'
})
export class FormReactiveFormDemoComponent implements AfterViewInit {

  form: void;
  demoForm: FormGroup;

  public inputValue = 'Hello World!';
  public datevalue;
  public timevalue;
  public dropdownvValue = 'ND';
  public colorpickValue;

  public checked: boolean;
  public options = MOCK_STATES;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      input: [this.inputValue],
      datepick: [this.datevalue],
      timepick: [this.timevalue],
      dropdown: [this.dropdownvValue],
      colorpick: [this.colorpickValue],
      checkbox: [this.checked]
    });

    this.demoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.demoForm.disable();
  }

  toggleDisableForm() {
    if (this.demoForm.disabled) {
      this.demoForm.enable();
    } else {
      this.demoForm.disable();
    }
  }

  onValueChanged(data?: any) {
    console.log(`onValueChanged: '${data}`);
  }

  onSubmit() {
    console.log('in onSubmit');
  }

  onChange(event: any) {
    console.log('in onChange');
  }
}
