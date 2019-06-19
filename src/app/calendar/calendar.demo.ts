import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarDemoService } from './calendar.demo.service';
import { SohoCalendarComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarDemoService]
})
export class CalendarDemoComponent implements OnInit, AfterViewInit {

  @ViewChild('SohoCalendarComponent') sohoCalendarComponent: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = false;
  public eventTypes: [];
  public events: [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private monthViewService: CalendarDemoService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onRenderMonth(event: SohoMonthViewRenderMonthEvent) {
    this.monthViewService.getCalendarEventTypes().subscribe((types) => {
      this.monthViewService.getCalendarEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
      });
    });

    // this.monthViewService.getCalendarEventTypes().subscribe((types) => {
    //   this.eventTypes = types;
    //   this.monthViewService.getCalendarEvents().subscribe((events) => {
    //     this.events = events;
    //     event.response(this.events, this.eventTypes);
    //   });
    // });
  }

  onSelected(event: SohoMonthViewSelectedEvent) {
    console.log('onSelected', [event]);
  }

  onDblClick(event: any) {
    console.log('onDblClick', [event]);
  }
}
