import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding, OnInit,
  ViewChild,
} from '@angular/core';
import { SohoToastService } from 'ids-enterprise-ng';
import { SohoWeekviewComponent } from '../../../projects/ids-enterprise-ng/src/lib/weekview/soho-weekview.component';
import { WeekviewDemoService } from './weekview.demo.service';

export enum displayType { 'oneWeek', 'twoWeeks', 'oneDay', 'twoDays' }

@Component({
  selector: 'app-weekview-demo',
  templateUrl: './weekview.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekviewDemoService]
})
export class WeekviewDemoComponent implements OnInit {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoWeekviewComponent, { static: true }) sohoWeekviewComponent: SohoWeekviewComponent;

  public startDate = new Date('2019-02-10');
  public endDate = new Date('2019-02-16');
  public showViewChanger = false;
  public eventTypes: [];
  public events: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public dateIsSet = false;
  public demoType;
  public demoTypeEnum;

  ngOnInit(): void {
    this.demoType = displayType.oneWeek;
    this.demoTypeEnum = displayType;
  }

  public onRenderWeekCallback = (node: Node, response: Function) => {
    this.weekViewService.getWeekviewEventTypes().subscribe((types) => {
      this.weekViewService.getWeekviewEvents().subscribe((events) => {
        this.eventTypes = types;
        this.events = events;
        response(this.events, this.eventTypes);
      });
    });
  }

  public onWeekviewDateSelectedCallback = (node: Node, args: SohoWeekviewDateSelectedEvent) => {
    console.log('onWeekviewDateSelectedCallback', args);
  }

  constructor(private weekViewService: WeekviewDemoService,
              private toastService: SohoToastService,
              private changeDetectorRef: ChangeDetectorRef) { }

  showOneWeek() {
    this.startDate = new Date('2019-02-10');
    this.endDate = new Date('2019-02-26');

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

  onRenderWeek(event: SohoWeekviewRenderWeekEvent) {
    console.log('onRenderWeek', event);
  }

  onEventClicked(event: SohoWeekviewClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event.event.subject + '" Clicked' });
    console.log('onEventClick', event);
  }

  onEventDblClicked(event: SohoWeekviewClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event.event.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }
}
