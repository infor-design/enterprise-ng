import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {Component, DebugElement, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SohoDatePickerModule, SohoDatePickerComponent } from './index';

@Component({
  template: `
    <input soho-datepicker
      name="statechange"
      [options]="_options"
      [showTime]="_showTime"
      [timeFormat]="_timeFormat"
      [minuteInterval]="_minuteInterval"
      [secondInterval]="_secondInterval"
      [roundToInterval]="_roundToInterval"
      [dateFormat]="_dateFormat"
      [placeholder]="_placeholder"
      [showLegend]="_showLegend"
      [showMonthYearPicker]="_showMonthYearPicker"
      [advanceMonths]="_advanceMonths"
      [legend]="_legend"
      [calendarName]="_calendarName"
      [mode]="_mode"
      [range]="_range"
      [disable]="_disable"
      [customValidation]="_customValidation"
      [hideDays]="_hideDays"
      [useUTC]="_useUTC"
      [(ngModel)]="model"
      (change)="onChange($event)"/>
`
})
class TestDatePickerComponent {
  @ViewChild(SohoDatePickerComponent) datepicker: SohoDatePickerComponent;

  @Output() changed = new EventEmitter<SohoDatePickerEvent>();

  public model: string;
  public _options: SohoDatePickerOptions = {};

  @Input() set options(options: SohoDatePickerOptions) {
    this._options = options;
    if (this.datepicker) {
      this.datepicker.options = this._options;
    }
  }

  public _showTime: boolean;

  @Input() set showTime(showTime: boolean) {
    this._showTime = showTime;
    if (this.datepicker) {
      this.datepicker.showTime = this._showTime;
    }
  }

  public _timeFormat: string;
  @Input() set timeFormat(timeFormat: string) {
    this._timeFormat = timeFormat;
    if (this.datepicker) {
      this.datepicker.timeFormat = this._timeFormat;
    }
  }

  public _minuteInterval: number;
  @Input() set minuteInterval(minuteInterval: number) {
    this._minuteInterval = minuteInterval;
    if (this.datepicker) {
      this.datepicker.minuteInterval = this._minuteInterval;
    }
  }

  public _secondInterval: number;
  @Input() set secondInterval(secondInterval: number) {
    this._secondInterval = secondInterval;
    if (this.datepicker) {
      this.datepicker.secondInterval = this._secondInterval;
    }
  }

  public _roundToInterval: boolean;
  @Input() set roundToInterval(roundToInterval: boolean) {
    this._roundToInterval = roundToInterval;
    if (this.datepicker) {
      this.datepicker.roundToInterval = this._roundToInterval;
    }
  }

  public _dateFormat: string;
  @Input() set dateFormat(dateFormat: string) {
    this._dateFormat = dateFormat;
    if (this.datepicker) {
      this.datepicker.dateFormat = this._dateFormat;
    }
  }

  public _placeholder: string;
  @Input() set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    if (this.datepicker) {
      this.datepicker.placeholder = this._placeholder;
    }
  }

  public _showLegend: boolean;
  @Input() set showLegend(showLegend: boolean) {
    this._showLegend = showLegend;
    if (this.datepicker) {
      this.datepicker.showLegend = this._showLegend;
    }
  }

  public _showMonthYearPicker: boolean;
  @Input() set showMonthYearPicker(showMonthYearPicker: boolean) {
    this._showMonthYearPicker = showMonthYearPicker;
    if (this.datepicker) {
      this.datepicker.showMonthYearPicker = this._showMonthYearPicker;
    }
  }

  public _advanceMonths: number;
  @Input() set advanceMonths(advanceMonths: number) {
    this._advanceMonths = advanceMonths;
    if (this.datepicker) {
      this.datepicker.advanceMonths = this._advanceMonths;
    }
  }

  public _legend: Array<SohoDatePickerLegend>;
  @Input() set legend(legend:  Array<SohoDatePickerLegend>) {
    this._legend = legend;
    if (this.datepicker) {
      this.datepicker.legend = this._legend;
    }
  }

  public _calendarName:  SohoDatePickerCalendarName;
  @Input() set calendarName(calendarName:  SohoDatePickerCalendarName) {
    this._calendarName = calendarName;
    if (this.datepicker) {
      this.datepicker.calendarName = this._calendarName;
    }
  }

  public _mode:  SohoDatePickerMode;
  @Input() set mode(mode:  SohoDatePickerMode) {
    this._mode = mode;
    if (this.datepicker) {
      this.datepicker.mode = this._mode;
    }
  }

  public _range:  SohoDatePickerRange;
  @Input() set range(range:  SohoDatePickerRange) {
    this._range = range;
    if (this.datepicker) {
      this.datepicker.range = this._range;
    }
  }

  public _disable:  SohoDatePickerDisable;
  @Input() set disable(disable:  SohoDatePickerDisable) {
    this._disable = disable;
    if (this.datepicker) {
      this.datepicker.disable = this._disable;
    }
  }

  public _customValidation:  boolean;
  @Input() set customValidation(customValidation:  boolean) {
    this._customValidation = customValidation;
    if (this.datepicker) {
      this.datepicker.customValidation = this._customValidation;
    }
  }

  public _hideDays:  boolean;
  @Input() set hideDays(hideDays:  boolean) {
    this._hideDays = hideDays;
    if (this.datepicker) {
      this.datepicker.hideDays = this._hideDays;
    }
  }
  public _useUTC:  boolean;
  @Input() set useUTC(useUTC:  boolean) {
    this._useUTC = useUTC;
    if (this.datepicker) {
      this.datepicker.useUTC = this._useUTC;
    }
  }

  onChange(value) {
    this.changed.emit(value);
  }
}

describe('Soho Datepicker Unit Tests', () => {
  let comp:     TestDatePickerComponent;
  let fixture:  ComponentFixture<TestDatePickerComponent>;
  let de:       DebugElement;
  let el:       HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDatePickerComponent ],
      imports: [ FormsModule, ReactiveFormsModule, SohoDatePickerModule ]
    });

    fixture = TestBed.createComponent(TestDatePickerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
    Soho.Locale.set('en-US').done(() => {

    });
  }));

  it('Check events', async(() => {

    spyOn(comp, 'onChange');

    const date = new Date('1978-11-18T12:00:00Z');

    // comp.changed.map((x: SohoDatePickerEvent) => x.data).subscribe((x) => {
    //   expect(x).toBe(date, 'Incorrect value passed to event');
    // });

    comp.datepicker.setValue(date);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(comp.onChange).toHaveBeenCalled();
        expect(comp.model).toBe('11/18/1978', 'Model not updated to correct value.');
    });
  }));

  it('Check inputs', async(() => {
    fixture.autoDetectChanges();

    const testOptions: SohoDatePickerOptions = {
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

    const testOptionsTwo: SohoDatePickerOptions = {
      showTime: true,
      timeFormat: 'HH:mm',
      minuteInterval: 5,
      secondInterval: 5,
      roundToInterval: false,
      dateFormat: 'MMMM dd',
      placeholder: 'a different placeholder',
      showLegend: false,
      showMonthYearPicker: false,
      advanceMonths: 5,
      legend: [{name: 'Mondays', color: '#EFA880', dayOfWeek: [1]}],
      calendarName:  'islamic-umalqura',
      disable: {
        dates: '',
        minDate: '12/31/2015',
        maxDate: '1/1/2017',
        dayOfWeek: []
      },
      customValidation: false,
      hideDays: true,
      useUTC: false
    };

    // setting via options
    comp.options = testOptions;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(comp.datepicker.options).toEqual(testOptions, 'Options didn\'t match');
      comp.options = {};
      // fixture.detectChanges();

      // settings via individual methods
      comp.showTime = true;
      comp.timeFormat = 'HH:mm';
      comp.minuteInterval = 5;
      comp.secondInterval = 5;
      comp.roundToInterval = false;
      comp.dateFormat = 'MMMM dd';
      comp.placeholder = 'a different placeholder';
      comp.showLegend = false;
      comp.showMonthYearPicker = false;
      comp.advanceMonths = 5;
      comp.legend = [{name: 'Mondays', color: '#EFA880', dayOfWeek: [1]}];
      comp.calendarName = 'islamic-umalqura';
      comp.disable = {
        dates: '',
        minDate: '12/31/2015',
        maxDate: '1/1/2017',
        dayOfWeek: []
      };
      comp.customValidation = false;
      comp.hideDays = true;
      comp.useUTC = false;

      // fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(comp.datepicker.options).toEqual(testOptionsTwo, 'Options set via individual methods didn\'t match');
        expect(comp.datepicker.options.range).toBeUndefined('Range object created early');

        comp.mode = 'range';
        // fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(comp.datepicker.options.range).toEqual({useRange: true}, 'Range object nor set to useRange: true');

          comp.range = {};
          comp.mode = 'range';
        });
      });
    });
  }));
});
