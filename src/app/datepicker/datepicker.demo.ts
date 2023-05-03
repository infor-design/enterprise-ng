import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
// @ts-ignore
import { SohoDatePickerComponent } from 'ids-enterprise-ng';
import { delay, Subject } from 'rxjs';

@Component({
  selector: 'app-datepicker-demo',
  templateUrl: 'datepicker.demo.html'
})
export class DatepickerDemoComponent implements OnInit {

  private legendSubject = new Subject<SohoDatePickerLegend[]>();

  @ViewChild(SohoDatePickerComponent, { static: true }) datepicker?: SohoDatePickerComponent;
  @ViewChild('rangedate', { static: true }) rdatepicker?: SohoDatePickerComponent;
  @ViewChild('dynamicLegend', { static: true }) dynamicLegendDatePicker?: SohoDatePickerComponent;

  public model = {
    standard: new Date(),
    standard2: new Date(),
    validrange: '12/12/2016',
    anniversary: new Date(),
    birthday: '',
    year: '',
    datetime: '',
    datetime2: '05.04.2018 16:15',
    range: '12/12/2016 - 12/26/2016',
    range2: '1/12/2017 - 1/16/2017',
    range3: '28/01/2017 - 30/01/2017',
    umalqura: ''
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

  public rangeOptions2: SohoDatePickerRange = {
    start: new Date(2021, 1, 1),
    end: new Date(2021, 1, 31),
    useRange: true,
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
    legend: [{ name: 'Weekends', color: '#EFA836', dayOfWeek: [0, 6] }],
    calendarName: 'gregorian'
  };

  public umalquraOptions: SohoDatePickerOptions = {
    mode: 'standard',
    dateFormat: 'yyyy/MM/dd',
    showMonthYearPicker: true,
    calendarName: 'islamic-umalqura',
    locale: 'ar-SA'
  };

  public legend$ = this.legendSubject.asObservable().pipe(
    delay(250)
  );

  constructor() { }
  ngOnInit() {
    this.registerCustomValidator();
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  clear() {
    this.datepicker?.setValue('', true, true);
    this.rdatepicker?.setValue('', true, true);
  }

  onChange(event: SohoDatePickerEvent) {
    console.log('DatePickerDemoComponent.onChange: type=' + event.type, 'Has originalEvent: ' + (event.originalEvent !== undefined));
  }

  public onListOpened(): void {
    console.log(`DatePickerDemoComponent.listopened`);
  }

  public onListClosed(): void {
    console.log(`DatePickerDemoComponent.listclosed`);
  }

  public onBeforeMonthRendered(): void {
    console.log(`DatePickerDemoComponent.beforemonthrendered`);
  }

  public onMonthRendered(): void {
    console.log(`DatePickerDemoComponent.monthrendered`);
  }

  setEnable() {
    (this.datepicker as any).disabled = false;
    (this.rdatepicker as any).disabled = false;
    (this.datepicker as any).readonly = false;
    (this.rdatepicker as any).readonly = false;
    this.datepickerDisabled = (this.datepicker as any).disabled;
    this.datepickerReadOnly = (this.datepicker as any).readonly;
  }

  setDisable() {
    (this.datepicker as any).disabled = true;
    (this.rdatepicker as any).disabled = true;
    this.datepickerDisabled = (this.datepicker as any).disabled;
  }

  setReadonly() {
    (this.datepicker as any).readonly = true;
    (this.rdatepicker as any).readonly = true;
    this.datepickerReadOnly = (this.datepicker as any).readonly;
  }

  registerCustomValidator() {
    const customRule: any = {
      check: (value: any, field: any, grid: any) => {
        console.log(value, field, grid);
        return false;
      },
      id: 'custom',
      type: 'error',
      message: 'Test Error - Anything you enter will be wrong'
    };

    // @ts-ignore
    Soho.Validation.rules['customRule'] = customRule;
  }

  public openCalendar(): void {
    (this.datepicker as any).openCalendar();
  }

  public onDynamicMonthRendered(e: SohoDatePickerMonthRenderedEvent): void {
    this.legendSubject.next([{
      color: 'azure07',
      name: 'Shifts',
      dates: [new Date(e.year, e.month, 1), new Date(e.year, e.month, 2)]
    }]);
  }

  clearRangeByString() {
    this.model.range2 = '';
  }

  public onDynamicListOpened(): void {
    const currentDate = this.dynamicLegendDatePicker?.getValue(true) as Date;
    this.legendSubject.next([{
      color: 'azure07',
      name: 'Shifts',
      dates: [
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 3),
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 4)
      ]
    }]);
  }
}
