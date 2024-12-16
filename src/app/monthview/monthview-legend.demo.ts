import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import { SohoMonthViewComponent } from 'ids-enterprise-ng';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Component({
    selector: 'app-monthview-legend-demo',
    templateUrl: 'monthview-legend.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MonthViewLegendDemoComponent {
  @ViewChild(SohoMonthViewComponent) sohoMonthViewComponent?: SohoMonthViewComponent;

  private cnt = 0;

  private _legendDataSubject = new BehaviorSubject<SohoMonthViewLegend[]>([]);

  public legendData$: Observable<SohoMonthViewLegend[]> = this._legendDataSubject.asObservable().pipe(delay(500));

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
  ) {}

  onRenderMonth(event: SohoMonthViewRenderEvent) {
    console.log('onRenderMonth', event);
    this.loadLegend([
      { name: `Warnings ${this.cnt}`, color: 'slate07', dates: [], dayOfWeek: [1] },
      { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: ['1/7/2017'], dayOfWeek: [] },
    ]);
  }

  public updateLegend(): void {
    this.loadLegend([
      { name: `Warnings ${this.cnt}`, color: 'amber07', dates: ['1/10/2017'], dayOfWeek: [] },
      { name: `Scheduled ${this.cnt}`, color: 'azure03', dates: [], dayOfWeek: [3, 5] },
      { name: `Public Holiday ${this.cnt}`, color: 'emerald06', dates: ['1/1/2017', '1/2/2017', '1/12/2017'], dayOfWeek: [] },
      { name: `Other ${this.cnt}`, color: 'ruby03', dates: ['1/8/2017', '1/9/2017', '1/23/2017'], dayOfWeek: [] },
      { name: `Half Days ${this.cnt}`, color: 'amethyst06', dates: ['1/21/2017', '1/22/2017'], dayOfWeek: [] },
    ]);
  }

  private loadLegend(legendList: SohoMonthViewLegend[]) {
    this.cnt++;
    this.legendData$.subscribe(() => this.ref.detectChanges());
    this._legendDataSubject.next(legendList);
  }

  public getLegend(): SohoMonthViewLegend[] | undefined {
    return this.sohoMonthViewComponent?.legend;
  }
}
