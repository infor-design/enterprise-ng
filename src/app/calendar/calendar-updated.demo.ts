import {
  Component,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
// @ts-ignore
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-calendar-updated-demo',
    templateUrl: 'calendar-updated.demo.html',
    providers: [CalendarDemoService],
    standalone: false
})
export class CalendarUpdatedDemoComponent {

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = false;
  public eventTypes?: [];
  public events?: [];
  public eventsLoaded = false;
  public iconTooltip = 'Tooltip';

  constructor(
    private monthViewService: CalendarDemoService
  ) { }

  public iconToolTip = (_eventData: any) => {
    console.log('iconToolTip');
  }

  public eventTooltip = (_eventData: any) => {
    console.log('iconToolTip');
  }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
    if (this.eventsLoaded) {
      return;
    }

    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        this.eventsLoaded = true;
      });
    });
  }

  reverseSort() {
    if (this.sohoCalendarComponent) {
      this.sohoCalendarComponent.updated({
        customSort: (a: SohoCalendarEvent, b: SohoCalendarEvent) => {
          const aStart = a.starts ? a.starts : 0;
          const bStart = b.starts ? b.starts : 0;
          return (aStart > bStart ? -1 : (aStart < bStart ? 1 : 0))
        }
      });
    }
  }

  sort() {
    if (this.sohoCalendarComponent) {
      this.sohoCalendarComponent.updated({
        customSort: (a: SohoCalendarEvent, b: SohoCalendarEvent) => {
          const aStart = a.starts ? a.starts : 0;
          const bStart = b.starts ? b.starts : 0;
          return (aStart < bStart ? -1 : (aStart > bStart ? 1 : 0))
        }
      });
    }
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }

  onDblClick(event: MouseEvent) {
    console.log('onDblClick', event);
  }
}
