import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  Inject
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
// @ts-ignore

@Component({
    selector: 'app-datepicker-french-demo',
    templateUrl: 'datepicker-french.demo.html',
    standalone: false
})
export class DatepickerFrenchDemoComponent implements OnInit {
  private readonly SEPARATOR = ' - ';
  protected datepickerOptions: SohoDatePickerOptions = {
    dateFormat: 'MMM d, yyyy',
    firstDayOfWeek: 1,
    showToday: true,
    disable: {
      minDate: new Date(2024, 7, 7),
    }
  };

  constructor(
    private ngZone: NgZone, 
    private ref: ChangeDetectorRef,
    @Inject(APP_BASE_HREF) private readonly baseHref: string) {
    Soho.Locale.culturesPath = `${this.baseHref}assets/ids-enterprise/js/cultures/`;

    this.ngZone.runOutsideAngular(() => {
      Soho.Locale.set('fr-FR').then(() => {
        this.ngZone.run(() => {

          this.datepickerOptions = {
            dateFormat: 'MMM d, yyyy',
            firstDayOfWeek: 1,
            showToday: true,
            range: {
              useRange: true,
              separator: this.SEPARATOR,
              start: new Date(2024, 7, 8),
              end: new Date(2024, 7, 12),
              maxDays: 41,
              includeDisabled: true,
            },
            disable: {
              minDate: new Date(2024, 7, 7),
            }
          }

          this.ref.markForCheck();
        });
      });
    });
  }

  ngOnInit(): void {}

  onDateRangeChanged(event: SohoDatePickerEvent) {
    console.log('change', event);
  }
}
