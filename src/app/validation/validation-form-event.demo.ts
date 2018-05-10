import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SohoTrackDirtyDirective } from 'soho/trackdirty';
import { SohoErrorDirective } from 'ids-enterprise-ng';

@Component({
  selector:    'soho-validation-form-event-demo',
  templateUrl: './validation-form-event.demo.html'
})
export class ValidationFormEventDemoComponent implements OnInit, AfterViewInit {
  @ViewChildren(SohoTrackDirtyDirective) trackDirtyComponents: QueryList<SohoTrackDirtyDirective>;
  @ViewChild(SohoErrorDirective) errorDirective: SohoErrorDirective;

  public dataView: any = {
    EventField:    {
      value: 'event',
      required: true
    },
    AlphaField:    {
      value:    'abc',
      required: true
    },
    NumericField:  {
      value:    '',
      required: true
    },
    DateField:     {
      value: ''
    },
    DropdownField: {
      value:    '',
      required: true
    }
  };

  public model: any = {};
  public showModel = true;
  public form: FormGroup;

  public events: any = {};

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

      this.model[ item ] = {
        value:    this.dataView[ item ].value,
        required: required
      };

      group[ item ] = new FormControl('');
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

  isRequired(id: string): string {
    // used to set the sohoxi required validator on the data-validate attribute on a control
    // return null means attribute is not set
    if (this.model[ id ].required) {
      return 'required';
    }
    return null;
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

  addError() {
    // don't add an error if field already has an error
    if (!this.errorDirective.errorMessage) {
      this.errorDirective.addInlineError('Field is in error');
    }
  }

  removeError() {
    // only remove an error if an error exists
    if (this.errorDirective.errorMessage) {
      this.errorDirective.removeError();
    }
  }

  goToError() {
    // scroll element into view if there is an error
    if (this.errorDirective.errorMessage) {
      this.errorDirective.scrollIntoView();
    }
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  event(key?: string): string {
    let msg = 'Event: {';
    if (this.events[key] !== undefined) {
      const event = this.events[key];
      msg += 'type:' + event['type'] + ', ';
      msg += 'time:' + event['timeStamp'];
    }
    msg += '}';
    return msg;
  }

  onValidationEvent(event) {
    const id = event.target.id;
    const type = event.type;
    const timeStamp = event.timeStamp;
    this.events[id] = {type, timeStamp};
  }
}
