import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SohoTrackDirtyDirective } from 'soho/trackdirty';

@Component({
  selector:    'soho-validation-form-event-demo',
  templateUrl: './validation-form-event.demo.html'
})
export class ValidationFormEventDemoComponent implements OnInit, AfterViewInit {
  @ViewChildren(SohoTrackDirtyDirective) trackDirtyComponents: QueryList<SohoTrackDirtyDirective>;

  public dataView: any = {
    AlphaField:   {
      value:    'abc',
      required: true
    },
    NumericField: {
      value:    '',
      required: true
    },
    DateField:    {
      value: ''
    }
  };

  public model: any = {};
  public showModel = true;
  public form: FormGroup;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.buildModel();
  }

  ngAfterViewInit(): void {
    this.form.markAsPristine();
    this.changeDetector.detectChanges();
  }

  onAfterResetDirty(event: SohoTrackDirtyEvent) {
    this.form.controls[ event.currentTarget.getAttribute('formControlName') ].markAsPristine();
  }

  onDirty(event: SohoTrackDirtyEvent) {
  }

  onPristine(event: SohoTrackDirtyEvent) {
    this.form.controls[ event.currentTarget.getAttribute('formControlName') ].markAsPristine();
  }

  onError(event: SohoInputValidateEvent) {
    this.form.controls[ event.validation.field.getAttribute('formControlName') ].setErrors({ 'inError': true });
  }

  onValid(event: SohoInputValidateEvent) {
    this.form.controls[ event.validation.field.getAttribute('formControlName') ].setErrors(null);
  }

  private buildModel() {
    // build model and form group
    const group: { [key: string]: any } = [];

    Object.keys(this.dataView).map((item, index, ary) => {
      const required = this.dataView[ item ].required;
      const validator: ValidatorFn = (required) ? Validators.required : null;

      this.model[ item ] = {
        value:    this.dataView[ item ].value,
        required: required
      };

      group[ item ] = new FormControl('', validator);
    });

    this.form = new FormGroup(group);
    this.changeDetector.detectChanges();
  }

  get disableSave(): boolean {
    if (this.form.valid && this.form.dirty) {
      // enables save button
      return null;
    }

    // disables save button
    return true;
  }

  status(key?: string): string {
    const fc: AbstractControl = (key)
      ? this.form.controls[ key ]
      : this.form;

    let msg = 'Status:';
    msg += (fc.pristine) ? ' pristine' : '';
    msg += (fc.dirty) ? ' dirty' : '';
    msg += (fc.valid) ? ' valid' : '';
    msg += (fc.invalid) ? ' invalid' : '';
    return msg;
  }

  saveForm() {
    this.trackDirtyComponents.forEach((trackDirty: SohoTrackDirtyDirective) => {
      trackDirty.resetDirty();
    });
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
