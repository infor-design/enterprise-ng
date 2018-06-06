import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MOCK_STATES } from '../dropdown/dropdown-mock.data';

@Component({
  selector: 'soho-validation-form-group-demo',
  templateUrl: './validation-form-group.demo.html'
})
export class ValidationFormGroupDemoComponent implements AfterViewInit {

  form: void;
  demoForm: FormGroup;

  public maskedValue = '111.1';
  public notmaskedValue = '111.1';
  public datevalue;
  public timevalue;

  public dropdownvValue = 'ND';

  public colorpickValue;

  public options = MOCK_STATES;

  private formErrors = {
    'masked': '',
    'notmasked': ''
  };

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      masked: [this.maskedValue, [Validators.required, Validators.minLength(1)]],
      notmasked: [this.notmaskedValue, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      datepick: [this.datevalue],
      timepick: [this.timevalue],
      dropdown: [this.dropdownvValue],
      colorpick: [this.colorpickValue]
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

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(`Custom Validator ${control.valid} - ${control.value}`);
    const name = control.value;

    return name && name.length > 0 ? null : ['Error'];
  };
}
