import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SohoDatePickerModule, SohoDatePickerComponent } from './index';

@Component({
  template: `
    <input soho-datepicker
      name="statechange"
      [options]="_options"
      [showTime]="_showTime"
      [useCurrentTime]="_useCurrentTime"
      [timeFormat]="_timeFormat"
      [minuteInterval]="_minuteInterval"
      [secondInterval]="_secondInterval"
      [roundToInterval]="_roundToInterval"
      [dateFormat]="_dateFormat"
      [placeholder]="_placeholder"
      [showLegend]="_showLegend"
      [showMonthYearPicker]="_showMonthYearPicker"
      [legend]="_legend"
      [locale]="_locale"
      [calendarName]="_calendarName"
      [mode]="_mode"
      [range]="_range"
      [disable]="_disable"
      [hideDays]="_hideDays"
      [yearsAhead]="_yearsAhead"
      [yearsBack]="_yearsBack"
      [useUTC]="_useUTC"
      [(ngModel)]="model"
      (change)="onChange($event)"/>
`
})
class TestDatePickerComponent {
  @ViewChild(SohoDatePickerComponent) datepicker?: SohoDatePickerComponent;

  @Output() changed = new EventEmitter<SohoDatePickerEvent>();

  public model?: string;
  public _options: SohoDatePickerOptions = {};

  @Input() set options(options: SohoDatePickerOptions) {
    this._options = options;
    if (this.datepicker) {
      this.datepicker.options = this._options;
    }
  }

  public _showTime?: boolean;

  @Input() set showTime(showTime: boolean) {
    this._showTime = showTime;
    if (this.datepicker) {
      this.datepicker.showTime = this._showTime;
    }
  }

  public _useCurrentTime?: boolean;

  @Input() set useCurrentTime(useCurrentTime: boolean) {
    this._useCurrentTime = useCurrentTime;
    if (this.datepicker) {
      this.datepicker.useCurrentTime = this._useCurrentTime;
    }
  }

  public _timeFormat?: string;
  @Input() set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
    if (this.datepicker) {
      this.datepicker.timeFormat = this._timeFormat;
    }
  }

  public _minuteInterval?: number;
  @Input() set minuteInterval(minuteInterval: number) {
    this._minuteInterval = minuteInterval;
    if (this.datepicker) {
      this.datepicker.minuteInterval = this._minuteInterval;
    }
  }

  public _secondInterval?: number;
  @Input() set secondInterval(secondInterval: number) {
    this._secondInterval = secondInterval;
    if (this.datepicker) {
      this.datepicker.secondInterval = this._secondInterval;
    }
  }

  public _firstDayOfWeek?: SohoDatePickerDayOfWeek;
  @Input() set firstDayOfWeek(firstDayOfWeek: SohoDatePickerDayOfWeek) {
    this._firstDayOfWeek = firstDayOfWeek;
    if (this.datepicker) {
      this.datepicker.firstDayOfWeek = this._firstDayOfWeek;
    }
  }

  public _showToday?: boolean;
  @Input() set showToday(showToday: boolean) {
    this._showToday = showToday;
    if (this.datepicker) {
      this.datepicker.showToday = this._showToday;
    }
  }

  public _autoSize?: boolean;
  @Input() set autoSize(autoSize: boolean) {
    this._autoSize = autoSize;
    if (this.datepicker) {
      this.datepicker.autoSize = this._autoSize;
    }
  }

  public _roundToInterval?: boolean;
  @Input() set roundToInterval(roundToInterval: boolean) {
    this._roundToInterval = roundToInterval;
    if (this.datepicker) {
      this.datepicker.roundToInterval = this._roundToInterval;
    }
  }

  public _dateFormat?: string;
  @Input() set dateFormat(dateFormat: string) {
    this._dateFormat = dateFormat;
    if (this.datepicker) {
      this.datepicker.dateFormat = this._dateFormat;
    }
  }

  public _placeholder?: string;
  @Input() set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    if (this.datepicker) {
      this.datepicker.placeholder = this._placeholder;
    }
  }

  public _showLegend?: boolean;
  @Input() set showLegend(showLegend: boolean) {
    this._showLegend = showLegend;
    if (this.datepicker) {
      this.datepicker.showLegend = this._showLegend;
    }
  }

  public _showMonthYearPicker?: boolean;
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean) {
    this._showMonthYearPicker = showMonthYearPicker;
    if (this.datepicker) {
      this.datepicker.showMonthYearPicker = this._showMonthYearPicker;
    }
  }

  public _legend?: Array<SohoDatePickerLegend>;
  @Input() set legend(legend: Array<SohoDatePickerLegend>) {
    this._legend = legend;
    if (this.datepicker) {
      this.datepicker.legend = this._legend;
    }
  }

  public _locale?: string;
  @Input() set locale(locale: string) {
    this._locale = locale;
    if (this.datepicker) {
      this.datepicker.locale = this._locale;
    }
  }

  public _calendarName?: SohoDatePickerCalendarName;
  @Input() set calendarName(calendarName: SohoDatePickerCalendarName) {
    this._calendarName = calendarName;
    if (this.datepicker) {
      this.datepicker.calendarName = this._calendarName;
    }
  }

  public _mode?: SohoDatePickerMode;
  @Input() set mode(mode: SohoDatePickerMode) {
    this._mode = mode;
    if (this.datepicker) {
      this.datepicker.mode = this._mode;
    }
  }

  public _range?: SohoDatePickerRange;
  @Input() set range(range: SohoDatePickerRange) {
    this._range = range;
    if (this.datepicker) {
      this.datepicker.range = this._range;
    }
  }

  public _disable?: SohoDatePickerDisable;
  @Input() set disable(disable: SohoDatePickerDisable) {
    this._disable = disable;
    if (this.datepicker) {
      this.datepicker.disable = this._disable;
    }
  }

  public _hideDays?: boolean;
  @Input() set hideDays(hideDays: boolean) {
    this._hideDays = hideDays;
    if (this.datepicker) {
      this.datepicker.hideDays = this._hideDays;
    }
  }

  public _yearsAhead?: number;
  @Input() set yearsAhead(yearsAhead: number) {
    this._yearsAhead = yearsAhead;
    if (this.datepicker) {
      this.datepicker.yearsAhead = this._yearsAhead;
    }
  }

  public _yearsBack?: number;
  @Input() set yearsBack(yearsBack: number) {
    this._yearsBack = yearsBack;
    if (this.datepicker) {
      this.datepicker.yearsBack = this._yearsBack;
    }
  }

  public _useUTC?: boolean;
  @Input() set useUTC(useUTC: boolean) {
    this._useUTC = useUTC;
    if (this.datepicker) {
      this.datepicker.useUTC = this._useUTC;
    }
  }

  onChange(value: any) {
    this.changed.emit(value);
  }
}

describe('Soho Datepicker Unit Tests', () => {
  let comp: TestDatePickerComponent;
  let fixture: ComponentFixture<TestDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestDatePickerComponent],
      imports: [FormsModule, ReactiveFormsModule, SohoDatePickerModule]
    });

    fixture = TestBed.createComponent(TestDatePickerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    Soho.Locale.set('en-US').done(() => {
      // We ought to wait!
    });
  }));

  it('Check events', waitForAsync(() => {

    spyOn(comp, 'onChange');

    const date = new Date('1978-11-11T12:00:00Z');

    // comp.changed.map((x: SohoDatePickerEvent) => x.data).subscribe((x) => {
    //   expect(x).toBe(date, 'Incorrect value passed to event');
    // });
    expect(Soho.Locale.currentLocale.name).toEqual('en-US');
    comp.datepicker?.setValue(date, true, false);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(Soho.Locale.currentLocale.name).toEqual('en-US');
      expect(comp.onChange).toHaveBeenCalled();
      expect(['11/11/1978', '1978-11-11']).toContain((comp.model as any));
    });
  }));

  it('Check inputs', waitForAsync(() => {
    fixture.autoDetectChanges();

    const testOptions: SohoDatePickerOptions = {
      showTime: true,
      useCurrentTime: true,
      timeFormat: 'HH:mm:ss',
      minuteInterval: 10,
      secondInterval: 10,
      firstDayOfWeek: 0,
      showToday: true,
      roundToInterval: true,
      dateFormat: 'mm/dd/yyyy',
      placeholder: 'placeholder',
      showLegend: true,
      showMonthYearPicker: true,
      legend: [{ name: 'Weekends', color: '#EFA836', dayOfWeek: [0, 6] }],
      calendarName: 'gregorian'
    };

    const testOptionsTwo: SohoDatePickerOptions = {
      showTime: true,
      useCurrentTime: true,
      timeFormat: 'HH:mm',
      minuteInterval: 5,
      secondInterval: 5,
      firstDayOfWeek: 1,
      roundToInterval: false,
      dateFormat: 'MMMM dd',
      placeholder: 'a different placeholder',
      showLegend: false,
      showMonthYearPicker: false,
      legend: [{ name: 'Mondays', color: '#EFA880', dayOfWeek: [1] }],
      locale: 'ar-SA',
      calendarName: 'islamic-umalqura',
      disable: {
        dates: '',
        minDate: '12/31/2015',
        maxDate: '1/1/2017',
        dayOfWeek: []
      },
      hideDays: true,
      yearsAhead: 5,
      yearsBack: 4,
      useUTC: false
    };

    // setting via options
    comp.options = testOptions;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(comp.datepicker?.options).toEqual(testOptions, 'Options didn\'t match');
      comp.options = {};
      // fixture.detectChanges();

      // settings via individual methods
      comp.showTime = true;
      comp.useCurrentTime = true;
      comp.timeFormat = 'HH:mm';
      comp.minuteInterval = 5;
      comp.secondInterval = 5;
      comp.firstDayOfWeek = 1;
      comp.roundToInterval = false;
      comp.dateFormat = 'MMMM dd';
      comp.placeholder = 'a different placeholder';
      comp.showLegend = false;
      comp.showMonthYearPicker = false;
      comp.legend = [{ name: 'Mondays', color: '#EFA880', dayOfWeek: [1] }];
      comp.locale = 'ar-SA';
      comp.calendarName = 'islamic-umalqura';
      comp.disable = {
        dates: '',
        minDate: '12/31/2015',
        maxDate: '1/1/2017',
        dayOfWeek: []
      };
      comp.hideDays = true;
      comp.yearsAhead = 5;
      comp.yearsBack = 4;
      comp.useUTC = false;

      // fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(comp.datepicker?.options).toEqual(testOptionsTwo, 'Options set via individual methods didn\'t match');
        expect(comp.datepicker?.options.range).toBeUndefined('Range object created early');

        comp.mode = 'range';
        // fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(comp.datepicker?.options.range).toEqual({ useRange: true }, 'Range object nor set to useRange: true');

          comp.range = {};
          comp.mode = 'range';
        });
      });
    });
  }));

  it('Check getting value for different date format', waitForAsync(() => {
    comp.dateFormat = 'dd:MM:yyyy';
    fixture.detectChanges();

    spyOn(comp, 'onChange');

    const date = new Date('1978-11-11T12:00:00Z');
    const dateWithoutTime = getDateWithoutTime(date);

    expect(Soho.Locale.currentLocale.name).toEqual('en-US');
    comp.datepicker?.setValue(date, true, false);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(Soho.Locale.currentLocale.name).toEqual('en-US');
      expect(comp.onChange).toHaveBeenCalled();
      expect('11:11:1978').toBe(comp.datepicker?.getValue() as any);
      expect(dateWithoutTime).toEqual(comp.datepicker?.getValue(true) as any);
    });
  }));

  it('Check getting value with time', waitForAsync(() => {
    comp.showTime = true;
    fixture.detectChanges();

    spyOn(comp, 'onChange');

    const date = new Date('1978-11-11T06:00:00Z');
    const dateWithoutTime = getDateWithoutTime(date);

    expect(Soho.Locale.currentLocale.name).toEqual('en-US');
    comp.datepicker?.setValue(date, true, false);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(Soho.Locale.currentLocale.name).toEqual('en-US');
      expect(comp.onChange).toHaveBeenCalled();
      expect('11/11/1978 12:00 AM').toBe(comp.datepicker?.getValue() as any);
      expect(dateWithoutTime).toEqual(comp.datepicker?.getValue(true) as any);
    });
  }));

  function getDateWithoutTime(date: Date): Date {
    const dateWithoutTime = date;
    dateWithoutTime.setHours(0);
    dateWithoutTime.setMinutes(0);
    dateWithoutTime.setSeconds(0);
    return dateWithoutTime;
  }
});
