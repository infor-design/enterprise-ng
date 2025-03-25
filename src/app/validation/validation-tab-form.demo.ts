import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  ViewChildren,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { SohoInputValidateDirective } from 'ids-enterprise-ng';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { delay, ReplaySubject, takeUntil } from 'rxjs';

export interface ITabs {
  id: string;
  title: string;
}

@Component({
    selector: 'app-validation-tab-form-demo',
    templateUrl: 'validation-tab-form.demo.html',
    standalone: false
})
export class ValidationTabFormDemoComponent {
  tabs: ITabs[] = [
    { id: 'tab1', title: 'Tab 1' },
    { id: 'tab2', title: 'Tab 2' },
    { id: 'tab3', title: 'Tab 3' },
  ];
  @ViewChildren(SohoInputValidateDirective)
  validators?: SohoInputValidateDirective[];

  validatorSignal = signal<string>('required');
  validator$ = toObservable(this.validatorSignal);

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {
    this.validator$
      .pipe(takeUntilDestroyed(), delay(250))
      .subscribe((validator) => {
        this.validators?.forEach((validator) => {
          validator.validate({});
        });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  removeValidator() {
    this.validators?.forEach((validator) => {
      validator.removeMessage(
        Soho.Validation.rules['required' as keyof typeof Soho.Validation.rules]
      );
    });

    this.validatorSignal.set('');
    // this.inputValidateDirective?.removeMessage(validator);
  }
}
