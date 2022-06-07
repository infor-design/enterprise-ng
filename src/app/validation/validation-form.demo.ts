import {
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { SohoInputValidateDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-validation-form-demo',
  templateUrl: 'validation-form.demo.html'
})
export class ValidationFormDemoComponent {
  @ViewChildren(SohoInputValidateDirective) validateDirectives!: QueryList<SohoInputValidateDirective>;

  demoForm!: UntypedFormGroup;
  email_addr!: string;
  credit_card!: string;
  credit_code1!: number;
  credit_code2!: number;
  requiredText!: string;
  states!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) {
    this.createForm();
  }
  createForm() {
    this.demoForm = this.formBuilder.group({
      email_addr: [this.email_addr, [Validators.required]],
      credit_card: [this.credit_card, [Validators.required]],
      credit_code1: [this.credit_code1],
      credit_code2: [this.credit_code2, [Validators.required]],
      required: [this.requiredText, [Validators.required]]
    });
  }

  public onClickTrigger(event: MouseEvent) {
    this.validateDirectives.forEach(item => {
      item.validate(event);
    });
  }

  public onClickReset() {
    this.validateDirectives.forEach(item => {
      item.removeMessage({ id: 'required', type: 'error' });
    });
  }

  public onReset() {
    this.demoForm.reset();
    ($('form') as any).resetForm();
  }
}
