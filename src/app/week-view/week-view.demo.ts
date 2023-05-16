import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding, OnInit,
  ViewChild,
} from '@angular/core';

import { SohoToastService, SohoWeekViewComponent } from 'ids-enterprise-ng';

import { WeekViewDemoService } from './week-view.demo.service';

// eslint-disable-next-line no-shadow
export enum displayType { 'oneWeek', 'twoWeeks', 'oneDay', 'twoDays', 'stackedView' }

@Component({
  selector: 'app-week-view-demo',
  templateUrl: './week-view.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekViewDemoService]
})
export class WeekViewDemoComponent implements OnInit {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = '100%';
  @HostBinding('style.display') block = 'flex';
  @HostBinding('style.fontSize') fontSize = '16px';

  @ViewChild(SohoWeekViewComponent, { static: true }) sohoWeekViewComponent?: SohoWeekViewComponent;

  public startDate = new Date('2019-02-10');
  public endDate = new Date('2019-02-16');
  public showViewChanger = false;
  public eventTypes?: [];
  public events?: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public dateIsSet = false;
  public demoType = displayType.oneWeek;
  public demoTypeEnum = displayType;
  public stacked = false;
  public showFooter = false;
  public responsive = false;
  public hideToolbar = false;

  ngOnInit(): void {
    this.demoType = displayType.oneWeek;
    this.demoTypeEnum = displayType;
  }

  public onRenderWeekCallback = (_node: Node, response: Function) => {
    this.weekViewService.getWeekviewEventTypes().subscribe((types) => {
      this.weekViewService.getWeekviewEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        response(this.events, this.eventTypes);
      });
    });
  }

  public onWeekviewDateSelectedCallback = (_node: Node, args: SohoWeekViewDateSelectedEvent) => {
    console.log('onWeekviewDateSelectedCallback', args);
  }

  constructor(private weekViewService: WeekViewDemoService,
    private toastService: SohoToastService,
    private changeDetectorRef: ChangeDetectorRef) { }

  showOneWeek() {
    this.startDate = new Date('2019-02-10');
    this.endDate = new Date('2019-02-16');

    this.demoType = displayType.oneWeek;
    this.changeDetectorRef.markForCheck();
  }

  showTwoWeeks() {
    this.startDate = new Date('2019-02-10');
    this.endDate = new Date('2019-02-23');

    this.demoType = displayType.twoWeeks;
    this.changeDetectorRef.markForCheck();
  }

  showOneDay() {
    this.startDate = new Date('2019-02-10');
    this.endDate = new Date('2019-02-10');

    this.demoType = displayType.oneDay;
    this.changeDetectorRef.markForCheck();
  }

  showTwoDays() {
    this.startDate = new Date('2019-02-10');
    this.endDate = new Date('2019-02-11');

    this.demoType = displayType.twoDays;
    this.changeDetectorRef.markForCheck();
  }

  showStackedView() {
    this.startDate = new Date('2019-02-11');
    this.endDate = new Date('2019-02-17');
    this.showFooter = true;
    this.hideToolbar = false;
    this.responsive = true;
    this.stacked = true;
    this.demoType = displayType.stackedView;
    this.changeDetectorRef.markForCheck();
  }

  onRenderWeek(event: SohoWeekViewRenderWeekEvent) {
    console.log('onRenderWeek', event);

    // Popuplate footer with placeholder elem (stacked view mode only)
    if (this.stacked && this.showFooter) {
      event.api.dayMap?.forEach((day: any) => {
        const footerElem = day.footer;
        if (footerElem) footerElem.innerHTML = `<div>Open Shift(s)</div>`
      });
    }
  }

  onEventClicked(event: SohoWeekViewClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Clicked' });
    console.log('onEventClick', event);
  }

  onEventDblClicked(event: SohoWeekViewClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }
}
