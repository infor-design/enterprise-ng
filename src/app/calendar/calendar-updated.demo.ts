import {
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-calendar-updated-demo',
  templateUrl: './calendar-updated.demo.html',
  providers: [CalendarDemoService]
})
export class CalendarUpdatedDemoComponent {

  @ViewChild('SohoCalendarComponent', { static: false }) sohoCalendarComponent: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = false;
  public eventTypes: [];
  public events: [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private monthViewService: CalendarDemoService
  ) { }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);

    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
      });
    });
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }

  onDblClick(event: MouseEvent) {
    console.log('onDblClick', event);
  }
}
