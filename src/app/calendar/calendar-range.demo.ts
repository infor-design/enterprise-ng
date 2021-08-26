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
  templateUrl: 'calendar-range.demo.html',
  providers: [CalendarDemoService]
})
export class CalendarRangeDemoComponent {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  public eventTypes?: [];
  public events?: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public displayRange = {
    start: '07/21/2018',
    end: '09/30/2018',
  }
  public disable = {
    dates: ['2018/08/08', '2018/09/01']
  }

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
