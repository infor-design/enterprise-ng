import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';

//@ts-ignore
import { SohoMonthViewComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-monthview-inpage-demo',
  templateUrl: 'monthview-inpage.demo.html',
  styleUrls: ['./monthview-inpage.demo.scss']
})
export class MonthViewDemoInPageComponent implements AfterViewInit {

  @ViewChild(SohoMonthViewComponent, { static: true }) sohoMonthViewComponent!: SohoMonthViewComponent;

  private jQueryElement?: JQuery;
  public initialMonth = 8;
  public initialYear = 2021;
  public initialDay = 7;
  public scheduledDates = [
    '9/4/2021',
    '9/10/2021',
    '9/11/2021',
    '9/15/2021',
    '9/16/2021',
    '9/17/2021',
    '9/18/2021',
    '9/21/2021',
    '9/22/2021',
    '9/23/2021',
    '9/25/2021',
  ];
  public notScheduledDates = [
    '9/5/2021',
    '9/12/2021',
    '9/19/2021',
    '9/26/2021',
  ];
  public legends = [
    { name: 'Scheduled', color: 'azure03', dates: this.scheduledDates },
    { name: 'Not Scheduled', color: 'slate03', dates: this.notScheduledDates }
  ];

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {


    });
  }

  public onMonthRendered(event: SohoMonthViewRenderMonthEvent) {
    console.log('onMonthRendered', event);
  }
}
