import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SohoDatePickerComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-datepicker-demo',
  templateUrl: './datepicker.demo.html'
})
export class DatepickerDemoComponent implements OnInit {

  @ViewChild(SohoDatePickerComponent) datepicker: SohoDatePickerComponent;

  public model = {
    standard: '12/12/2016',
    validrange: '12/12/2016',
    anniversary: '',
    birthday: '',
    year: '',
    datetime: '',
    datetime2: '05.04.2018 16:15',
    range: '12/12/2016 - 12/26/2016',
    range2: '1/12/2017 - 1/16/2017'
  };
  public showModel = false;
  public datepickerDisabled = false;
  public datepickerReadOnly = false;

  public disableOptions: SohoDatePickerDisable = {
    dates: '',
    minDate: '12/31/2015',
    maxDate: '1/1/2017',
    dayOfWeek: []
  };

  public disableOptions2: SohoDatePickerDisable = {
    dates: '',
    minDate: new Date(2018, 2, 8),
    maxDate: new Date(2018, 3, 10),
    dayOfWeek: []
  };

  public rangeOptions: SohoDatePickerRange = {
    start: new Date(2016, 12, 12),
    end: new Date(2016, 12, 16),
    useRange: true
  };

  public datePickerOptions: SohoDatePickerOptions = {
    showTime: true,
    timeFormat: 'HH:mm:ss',
    minuteInterval: 10,
    secondInterval: 10,
    roundToInterval: true,
    dateFormat: 'mm/dd/yyyy',
    placeholder: 'placeholder',
    showLegend: true,
    showMonthYearPicker: true,
    advanceMonths: 3,
    legend: [{name: 'Weekends', color: '#EFA836', dayOfWeek: [0, 6]}],
    calendarName:  'gregorian'
  };

  constructor() { }
  ngOnInit() { }
  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: SohoDatePickerEvent) {
    console.log('DatePickerDemoComponent.onChange: type=' + event.type);
  }

  setEnable() {
    this.datepicker.disabled = false;
    this.datepickerDisabled = this.datepicker.disabled;
    this.datepickerReadOnly = this.datepicker.readonly;
  }

  setDisable() {
    this.datepicker.disabled = true;
    this.datepickerDisabled = this.datepicker.disabled;
  }

  setReadonly() {
    this.datepicker.readonly = true;
    this.datepickerReadOnly = this.datepicker.readonly;
  }
}
