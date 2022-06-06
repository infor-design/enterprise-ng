import {
  Component,
  ViewChild
} from '@angular/core';

import { SohoMonthViewComponent } from 'ids-enterprise-ng';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-monthview-label-demo',
  templateUrl: 'monthview-label.demo.html',
})
export class MonthViewLabelDemoComponent {
  @ViewChild(SohoMonthViewComponent) sohoMonthViewComponent?: SohoMonthViewComponent;

  private cnt = 0;

  private _legendDataSubject = new BehaviorSubject<SohoMonthViewLegend[]>([]);

  public readonly legendData$: Observable<SohoMonthViewLegend[]> = this._legendDataSubject.asObservable();

  public readonly monthViewOptions: SohoMonthViewOptions = {
    day: 5,
    month: 0,
    year: 2017,
    inPage: true,
    inPageExpanded: true,
    showMonthYearPicker: false,
    showLegend: true,
  };

  onRenderMonth(event: SohoMonthViewRenderEvent) {
    console.log('onRenderMonth', event);
    // Fake Ajax Call
    setTimeout(() => {
      console.log('Fake ajax call')
      this._legendDataSubject.next([
        { name: `Warnings ${this.cnt}`, color: 'amber07', dates: [], dayOfWeek: [] },
        { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: ['1/7/2017'], dayOfWeek: [] },
      ]);
    }, 250);
  }

  public updateLegend(): void {
    this.cnt++;
    this._legendDataSubject.next([
      { name: `Warnings ${this.cnt}`, color: 'amber07', dates: ['1/10/2017'], dayOfWeek: [] },
      { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: [], dayOfWeek: [3, 5] },
      { name: `Public Holiday ${this.cnt}`, color: 'emerald06', dates: ['1/1/2017', '1/2/2017', '1/12/2017'], dayOfWeek: [] },
      { name: `Other ${this.cnt}`, color: 'ruby03', dates: ['1/8/2017', '1/9/2017', '1/23/2017'], dayOfWeek: [] },
      { name: `Half Days ${this.cnt}`, color: 'amethyst06', dates: ['1/21/2017', '1/22/2017'], dayOfWeek: [] },
    ]);
  }
}
