import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoTimePickerComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-timepicker-demo',
  templateUrl: './timepicker.demo.html',
})
export class TimePickerDemoComponent implements OnInit {

  @ViewChild(SohoTimePickerComponent) timepicker: SohoTimePickerComponent;

  public model = { // tslint:disable-line
    hhmm: '1:23 PM',
    HHmm24: '17:50'
  };
  public showModel = false;
  public timepickerDisabled = false;
  public timepickerReadOnly = false;

  constructor() { }

  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: Event) {
    console.log('TimepickerDemoComponent.onChange');
  }

  setEnable() {
    this.timepicker.disabled = false;
    this.timepickerDisabled = this.timepicker.disabled;
    this.timepickerReadOnly = this.timepicker.readonly;
  }

  setDisable() {
    this.timepicker.disabled = true;
    this.timepickerDisabled = this.timepicker.disabled;
  }

  setReadonly() {
    this.timepicker.readonly = true;
    this.timepickerReadOnly = this.timepicker.readonly;
  }
}
