import {
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
// @ts-ignore
import { SohoCalendarComponent, SohoToastService } from 'ids-enterprise-ng';

@Component({
    selector: 'app-calendar-demo',
    templateUrl: 'calendar.demo.html',
    providers: [CalendarDemoService],
    standalone: false
})
export class CalendarDemoComponent {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = true;
  public eventTypes?: [];
  public events?: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';

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

  constructor(private monthViewService: CalendarDemoService, private toastService: SohoToastService) { }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }

  onEventClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Clicked' });
    console.log('onEventClick', event);
  }

  onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }

  onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) {
    if (event) {
      this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" ContextMenu' });
      console.log('onEventContextMenu', event);
    }
  }
}
