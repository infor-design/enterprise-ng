import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  templateUrl: 'contextual-action-panel-buttonsetapi.component.html'
})

export class ContextualActionPanelButtonsetAPIComponent {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: [''],
      address: [''],
    })

    setTimeout(() => {
      this.form.updateValueAndValidity();
    });
  }
}
