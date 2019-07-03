import {
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar.demo.html',
  providers: [CalendarDemoService]
})
export class CalendarDemoComponent {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent, { static: false }) sohoCalendarComponent: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = false;
  public eventTypes: [];
  public events: [];

  public onRenderMonthCallback = (node: Node, response: Function) => {
    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        response(this.events, this.eventTypes);
      });
    });
  }

  public onCalendarDateSelectedCallback = (node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }

  constructor(private monthViewService: CalendarDemoService) { }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }

  onDblClick(event: MouseEvent) {
    console.log('onDblClick', event);
  }
}
