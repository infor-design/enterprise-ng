import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';


@Component({
    templateUrl: 'contextual-action-panel-buttonsetapi.component.html',
    standalone: false
})

export class ContextualActionPanelButtonsetAPIComponent {
  form: UntypedFormGroup;

  constructor(private readonly fb: UntypedFormBuilder) {
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
