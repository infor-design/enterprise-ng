import {
  Component,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
// @ts-ignore
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-calendar-hide-legend-demo',
  templateUrl: 'calendar-hide-legend.demo.html',
  providers: [CalendarDemoService]
})
export class CalendarHideLegendDemoComponent {

  @ViewChild('SohoCalendarComponent') sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 11;
  public initialYear = 2018;
  public showViewChanger = true;
  public showEventLegend = false;
  public eventTypes?: [];
  public events?: [];

  constructor(private monthViewService: CalendarDemoService) { }

  public onRenderMonthCallback = (_node: Node, response: Function) => {
    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        response(this.events, this.eventTypes);
      });
    });
  }

  public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }
}
