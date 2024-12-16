import {
  Component,
  AfterViewInit
} from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-validation-form-group-demo',
    templateUrl: 'validation-form-group.demo.html',
    standalone: false
})
export class ValidationFormGroupDemoComponent implements AfterViewInit {

  demoForm!: UntypedFormGroup;

  public maskedValue = '111.1';
  public notmaskedValue = '111.1';
  public datevalue = '';

  constructor(private formBuilder: UntypedFormBuilder) {
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      masked: [this.maskedValue, [Validators.required, Validators.minLength(1)]],
      notmasked: [this.notmaskedValue, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      datepick: [this.datevalue]
    });

    this.demoForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    console.log(`onValueChanged: '${data}`);
  }

  onSubmit() {
    console.log('in onSubmit');
  }

  onChange(_event: any) {
    console.log('in onChange');
  }
}

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): string[] | null => {
    console.log(`Custom Validator ${control.valid} - ${control.value}`);
    const name = control.value;

    return name && name.length > 0 ? null : ['Error'];
  };
}
