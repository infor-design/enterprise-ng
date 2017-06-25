import {
  Component,
  ElementRef,
  OnInit
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'soho-validation-form-group-demo',
  templateUrl: './validation-form-group.demo.html'
})
export class ValidationFormGroupDemoComponent implements OnInit {

  demoForm: FormGroup;

  public maskedValue = '111.1';
  public notmaskedValue = '111.1';

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder) {
  }

ngOnInit(): void {
  this.createForm();
}

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      masked: [this.maskedValue, requiredValidator],
      notmasked: [this.notmaskedValue, requiredValidator]
    });

    this.demoForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
  }

onValueChanged(t: any) {
console.log(`value has changed: ${this.maskedValue}`)
}

  onSubmit() {
    // TODO: Do something here?
    console.log('in onSubmit');
  }
}


export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    console.log(control);
    const name = control.value;
    return null;
  };
}
