import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { SohoTrackDirtyDirective, SohoErrorDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-validation-form-event-demo',
  templateUrl: 'validation-form-event.demo.html'
})
export class ValidationFormEventDemoComponent implements OnInit, AfterViewInit {
  @ViewChildren(SohoTrackDirtyDirective) trackDirtyComponents: QueryList<SohoTrackDirtyDirective>;
  @ViewChild(SohoErrorDirective, { static: true }) errorDirective: SohoErrorDirective; // eslint-disable-line

  public dataView: any = {
    EventField: {
      value: 'event',
      required: true
    },
    AlphaField: {
      value: 'abc',
      required: true
    },
    NumericField: {
      value: '',
      required: true
    },
    DateField: {
      value: ''
    },
    DropdownField: {
      value: '',
      required: true
    }
  };

  public model: any = {};
  public showModel = true;
  public form!: FormGroup;

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
    const elem = event.currentTarget.getAttribute('formControlName');
    if (elem) {
      this.form.controls[elem].markAsPristine();
    }
  }

  onDirty(_event: SohoTrackDirtyEvent) {
  }

  onPristine(event: SohoTrackDirtyEvent) {
    const elem = event.currentTarget.getAttribute('formControlName');
    if (elem) {
      this.form.controls[elem].markAsPristine();
    }
  }

  onError(event: SohoInputValidateEvent) {
    this.form.controls[event.validation.field.getAttribute('formControlName')].setErrors({ inError: true });
  }

  onValid(event: SohoInputValidateEvent) {
    this.form.controls[event.validation.field.getAttribute('formControlName')].setErrors(null);
  }

  private buildModel() {
    // build model and form group
    const group: { [key: string]: any } = [];

    Object.keys(this.dataView).map((item) => {
      const required = this.dataView[item].required;

      this.model[item] = {
        value: this.dataView[item].value,
        required
      };

      group[item] = new FormControl('');
    });

    this.form = new FormGroup(group);
    this.changeDetector.detectChanges();
  }

  // Enables/Disables Save Button
  get disableSave(): boolean {
    return (this.form.valid && this.form.dirty);
  }

  isRequired(id: string): string | null {
    // used to set the sohoxi required validator on the data-validate attribute on a control
    // return null means attribute is not set
    if (this.model[id].required) {
      return 'required';
    }
    return null;
  }

  status(key?: string): string {
    const fc: AbstractControl = (key)
      ? this.form.controls[key]
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
    if (!this.errorDirective.errorMessage) { // eslint-disable-line
      this.errorDirective.addInlineError('Field is in error'); // eslint-disable-line
    }
  }

  removeError() {
    // only remove an error if an error exists
    if (this.errorDirective.errorMessage) { // eslint-disable-line
      this.errorDirective.removeError(); // eslint-disable-line
    }
  }

  goToError() {
    // scroll element into view if there is an error
    if (this.errorDirective.errorMessage) { // eslint-disable-line
      this.errorDirective.scrollIntoView(); // eslint-disable-line
    }
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  event(key: string): string {
    let msg = 'Event: {';
    if (this.events[key] !== undefined) {
      const event = this.events[key];
      msg += 'type:' + event.type + ', ';
      msg += 'time:' + event.timeStamp;
    }
    msg += '}';
    return msg;
  }

  onValidationEvent(event: SohoInputValidateEvent) {
    const id = event.target?.id;
    const type = event.type;
    const timeStamp = event.timeStamp;
    this.events[id] = { type, timeStamp };
  }
}
