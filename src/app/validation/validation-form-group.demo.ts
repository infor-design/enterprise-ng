import {
  Component,
  ElementRef
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'soho-validation-form-group-demo',
  templateUrl: './validation-form-group.demo.html'
})
export class ValidationFormGroupDemoComponent  {

  demoForm: FormGroup;

  constructor(private elementRef: ElementRef, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.fb.group({
      masked: ['123', [Validators.required, Validators.minLength(1)]],
      notmasked: ['123', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    // TODO: Do something here?
    console.log('in onSubmit');
  }
}
