import {
  Component,
  ElementRef,
  OnChanges
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'soho-validation-form-group-demo',
  templateUrl: './validation-form-group.demo.html'
})
export class ValidationFormGroupDemoComponent implements OnChanges {

  demoForm: FormGroup;

  constructor(private elementRef: ElementRef, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    this.demoForm.reset();
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.fb.group({
      masked: ['123', [Validators.required]],
      notmasked: ['123', [Validators.required]]
    });
  }

  onSubmit() {
    // TODO: Do something here?
    console.log('in onSubmit');
  }
}
