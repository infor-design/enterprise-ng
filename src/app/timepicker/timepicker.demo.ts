import { Component, OnInit, ViewChild } from "@angular/core";

import { SohoTimePickerComponent } from "ids-enterprise-ng";

@Component({
    selector: "app-timepicker-demo",
    templateUrl: "timepicker.demo.html",
    standalone: false
})
export class TimePickerDemoComponent implements OnInit {
  @ViewChild(SohoTimePickerComponent, { static: true })
  timepicker!: SohoTimePickerComponent;

  public model = {
    // eslint-disable-line
    hhmmbv: "",
    hhmm: "1:23 PM",
    hhmmss: "1:23:43 PM",
    HHmm24: "17:50",
  };
  public showModel = false;
  public timepickerDisabled = false;
  public timepickerReadOnly = false;

  constructor() {}

  ngOnInit() {}

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(_event: SohoTimePickerEvent) {
    console.log("TimepickerDemoComponent.onChange");
  }

  onBeforeValidate = (args: any) => {
    const locale = Soho.Locale.currentLocale;
    let is12Hr = false;

    if (locale?.data?.calendars[0].timeFormat) {
      is12Hr = locale?.data?.calendars[0].timeFormat?.indexOf("a") > 1;
    }
    
    let value = args.api.element.val();

    if (value.indexOf("AM") > -1 || value.indexOf("PM") > -1) {
      return;
    }

    console.log("beforeValidate", args);

    if (value.length > 0) {
      value = value.indexOf(":") > -1 ? `${value}00` : `${value}:00`;
      value = `${value} ${ is12Hr ? locale.data?.calendars[0].dayPeriods[1] : "" }`;
    }

    return value;
  };

  setEnable() {
    this.timepicker.disabled = false;
    this.timepickerDisabled = this.timepicker.disabled;

    this.timepicker.readonly = false;
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
