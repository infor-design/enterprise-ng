import {
  Component,
  OnInit,
  ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarDemoService]
})
export class CalendarDemoComponent implements OnInit {

  @ViewChild('SohoCalendarComponent') sohoCalendarComponent: SohoCalendarComponent;

  public eventTypes: [];
  public events: [];

  constructor(private monthViewService: CalendarDemoService) {
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
