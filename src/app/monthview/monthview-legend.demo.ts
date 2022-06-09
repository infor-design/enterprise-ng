import {
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import { SohoMonthViewComponent } from 'ids-enterprise-ng';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-monthview-legend-demo',
  templateUrl: 'monthview-legend.demo.html',
})
export class MonthViewLegendDemoComponent {
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

  constructor(
    public ref: ChangeDetectorRef
  ) { }

  onRenderMonth(event: SohoMonthViewRenderEvent) {
    console.log('onRenderMonth', event);
    this.loadLegend([
      { name: `Warnings ${this.cnt}`, color: 'amber07', dates: [], dayOfWeek: [] },
      { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: ['1/7/2017'], dayOfWeek: [] },
    ]);
  }

  public updateLegend(): void {
    this.cnt++;
    this.loadLegend([
      { name: `Warnings ${this.cnt}`, color: 'amber07', dates: ['1/10/2017'], dayOfWeek: [] },
      { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: [], dayOfWeek: [3, 5] },
      { name: `Public Holiday ${this.cnt}`, color: 'emerald06', dates: ['1/1/2017', '1/2/2017', '1/12/2017'], dayOfWeek: [] },
      { name: `Other ${this.cnt}`, color: 'ruby03', dates: ['1/8/2017', '1/9/2017', '1/23/2017'], dayOfWeek: [] },
      { name: `Half Days ${this.cnt}`, color: 'amethyst06', dates: ['1/21/2017', '1/22/2017'], dayOfWeek: [] },
    ]);
  }

  private loadLegend(legendList: SohoMonthViewLegend[]) {
    setTimeout(() => {
      this._legendDataSubject.next(legendList);
      this.ref.detectChanges();
      console.log('Fake ajax call', this._legendDataSubject.value);
    }, 250);
  }
}
