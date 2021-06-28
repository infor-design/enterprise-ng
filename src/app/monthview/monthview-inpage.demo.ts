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

  @ViewChild(SohoMonthViewComponent, { static: true }) sohoMonthViewComponent?: SohoMonthViewComponent;

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

      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      const elem = jQuery(this.elementRef.nativeElement.querySelector('.monthview'));
      const container = jQuery(this.elementRef.nativeElement.querySelector('#test-content'));
      const maxContentItems = 3;
      let outHtml;

      elem.monthview()
        .on('selected', function (e, args) {
          handleSelected(args);
        }).on('monthrendered', function (e, args) {
          handleMonthChange(args);
        });

      // Init test content first time on load
      const dateOnLoad = new Date((this.initialMonth + 1) + '/' + this.initialDay + '/' + this.initialYear);
      updateContent(dateOnLoad);

      // handle selected date
      function handleSelected(args: any) {
        if (args) {
          const dt = new Date((args.month + 1) + '/' + args.day + '/' + args.year);
          const dtStr = getDateString(dt);

          updateContent(dt);
        }
      }

      // handle month change
      function handleMonthChange(args: any) {
        if (args && args.api) {
          const dt = args.api.currentDate;
          const dtStr = getDateString(dt);

          updateContent(dt);
        }
      }

      // Remove older api
      function cleanOlderApi() {
        const buttons = container.find('.btn-actions');
        buttons.each(function () {
          const thisBtn = jQuery(this);
          console.log(thisBtn)
          const popupmenuApi = thisBtn.data('popupmenu');
          if (popupmenuApi) {
            popupmenuApi.destroy();
          }
          if (popupmenuApi) {
            popupmenuApi.destroy();
          }

          const buttonApi = thisBtn.data('button');
          if (buttonApi) {
            buttonApi.destroy();
          }
        });
      }

      // Update test content for given date
      function updateContent(dt: Date) {
        const currentTime = dt.getTime();
        const oneDayTime = 86400000;
        const max = maxContentItems;
        outHtml = '';

        for (let i = 0, len = max; i < max; i++) {
          const thisDate = new Date(currentTime + (i * oneDayTime));
          const dtStr = getDateString(thisDate);
          const dayStr = getDayString(thisDate);
          const isActiveDate = currentTime === thisDate.getTime();
          outHtml += getCardHtml(dtStr, dayStr, isActiveDate);
        }
        cleanOlderApi();
        container.html(outHtml)
          .find('.btn-actions').popupmenu().button();
      }

      function getCardHtml(dtStr: any, dayStr: any, isActive: boolean) {
        const menuBtnHtml = '' +
          '<button type="button" class="btn-actions vertical" type="button">' +
          '<span class="audible">Actions</span>' +
          '<svg class="icon" focusable="false" aria-hidden="true" role="presentation">' +
          '<use href="#icon-more"></use>' +
          '</svg>' +
          '</button>' +
          '<ul class="popupmenu actions">' +
          '<li><a href="#" id="action-1">Action One</a></li>' +
          '<li><a href="#" id="action-2">Action Two</a></li>' +
          '</ul>';

        return '' +
          '<div class="card auto-height compact-bottom' + (isActive ? ' is-active' : '') + '">' +
          '<div class="card-content">' +
          '<div class="test-container">' +
          '<div class="start">' +
          '<h2 class="heading">' + dayStr + ', ' + dtStr + '</h2>' +
          '<h3 class="sub-heading">8:40 AM - 4:00 PM</h3>' +
          '</div>' +
          '<div class="end">' +
          menuBtnHtml +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
      }

      function getDayString(dt: Date) {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dt.getDay()];
      }

      // Update test content for given date
      function getDateString(dt: any, isYear?: boolean) {
        function nth(d: number) {
          if (d > 3 && d < 21) {
            return 'th';
          };
          switch (d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        }

        const date = dt.getDate();
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][dt.getMonth()];
        return date + nth(date) + ' ' + month + ' ' + (isYear ? dt.getFullYear() : '');
      }

    });
  }
}
