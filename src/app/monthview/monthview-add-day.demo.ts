import {
  Component,
  ViewChild,
} from '@angular/core';
// @ts-ignore
import { SohoDatePickerComponent, SohoMonthViewComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-monthview-add-day-demo',
  templateUrl: 'monthview-add-day.demo.html'
})
export class MonthViewAddDayDemoComponent {
  @ViewChild(SohoMonthViewComponent, { static: true }) monthview?: SohoMonthViewComponent;

  private _selectedDate: Date = new Date();
  public monthViewOptions: SohoMonthViewOptions = {
    inPage: true,
    inPageExpanded: false,
    showMonthYearPicker: false,
    showLegend: true,
    disable: {
      isEnable: false, // inverses the disable options
    },
  };

  onSelected(event: any) {
    console.log('Selected event');
  }

  onRenderMonth(event: any) {
    console.log('Month rendered event');
  }

  addDay() {
    this._selectedDate.setDate(this._selectedDate.getDate() + 1);
    this.monthViewOptions = {
      ...this.monthViewOptions,
      day: this._selectedDate.getDate(),
      month: this._selectedDate.getMonth(),
      year: this._selectedDate.getFullYear(),
      activeDate: this._selectedDate as any,
    };
    console.log(this._selectedDate.toDateString());
    this.monthview?.updated(this.monthViewOptions);
  }

  get selectedDate(): String {
    return this._selectedDate.toDateString();
  }
}
