import {
  Component,
  OnInit,
  ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import {MonthViewDemoService} from './monthview.demo.service';
import {SohoMonthViewComponent} from 'ids-enterprise-ng';

@Component({
  selector: 'app-monthview-demo',
  templateUrl: './monthview.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonthViewDemoService]
})
export class MonthViewDemoComponent implements OnInit {

  @ViewChild('SohoMonthViewComponent', { static: false }) sohoMonthView: SohoMonthViewComponent;

  public eventTypes: [];
  public events: [];

  constructor(private monthViewService: MonthViewDemoService) {
  }

  ngOnInit() {
  }

  onRenderMonth(event: SohoMonthViewRenderMonthEvent) {
    console.log('onRenderMonth', [event]);

    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.eventTypes = types;
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.events = events;
        event.response(this.events, this.eventTypes);
      });
    });
  }

  onSelected(event: SohoMonthViewSelectedEvent) {
    console.log('onSelected', [event]);
  }
}
