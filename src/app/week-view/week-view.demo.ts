import {
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { WeekViewDemoService } from './week-view.demo.service';
import { SohoCalendarComponent, SohoWeekViewComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-week-view-demo',
  templateUrl: './week-view.demo.html',
  providers: [WeekViewDemoService]
})

export class WeekViewDemoComponent {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoWeekViewComponent, { static: false }) sohoWeekViewComponent: SohoWeekViewComponent;

  @ViewChild(SohoCalendarComponent, { static: false }) sohoCalendarComponent: SohoCalendarComponent;

  public firstDayOfWeek = 0;
  public showAllDay = true;
  public showViewChanger = false;
  public eventTypes: [];
  public events: [];
  public eventTooltip = 'overflow';

  public onRenderWeekCallback = (node: Node, response: Function) => {
    this.weekViewService.getWeekViewEventTypes().subscribe((types) => {
      this.weekViewService.getWeekViewEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        response(this.events, this.eventTypes);
      });
    });
  }

  constructor(private weekViewService: WeekViewDemoService) { }

  onRenderWeek(event: SohoWeekViewRenderMonthEvent) {
    console.log('onRenderWeek', event);
  }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }

}
