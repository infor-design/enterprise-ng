import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {SohoDatepickerEvent} from './index';

export type SohoDateMode = 'standard' | 'range';

@Component({
  selector: 'input[soho-datepicker]',
  template: '<ng-content></ng-content>'
})
export class SohoDatepickerComponent implements AfterViewInit, OnDestroy {
  /**
   * Indicates to display the timepicker; defaults to false.
   */
  @Input() showTime: boolean = false;
  /**
   * Indicates the pattern for the time format.
   */
  @Input() timeFormat: string = undefined;
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown.
   */
  @Input() minuteInterval: number = undefined;
  /**
   * Indicates mode, either 'standard' or 'range'.
   */
  @Input() mode: SohoDateMode = undefined;
  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event.
   */
  @Input() roundToInterval: number = undefined;
  /**
   * Indicates the html markup for the timepicker.
   */
  @Input() timepickerMarkup: string = undefined;
  /**
   * Indicates the pattern for the date format or the value of 'locale'.
   */
  @Input() dateFormat: string = undefined;
  /**
   * Indicates a placeholder for an empty value; defaults to false.
   */
  @Input() placeholder: boolean = false;
  /**
   * Indicates an object containing a date or range of dates that are enabled or disabled.
   */
  @Input() disable: any = undefined;

  /**
   * Called when the datepicker value changes
   */
  @Output() change: EventEmitter<SohoDatepickerEvent> = new EventEmitter<SohoDatepickerEvent>();

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class') hostClass: string = 'datepicker';
  @HostBinding('class.timepicker') @Input() timepicker: boolean = false;

  /**
   * Local variables
   */
  private jQueryElement: any;
  private datepicker: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.datepicker({
      showTime: this.showTime,
      timeFormat: this.timeFormat,
      minuteInterval: this.minuteInterval,
      mode: this.mode,
      roundToInterval: this.roundToInterval,
      timepickerMarkup: this.timepickerMarkup,
      dateFormat: this.dateFormat,
      placeholder: this.placeholder,
      disable: this.disable
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoDatepickerEvent) => this.change.emit(event));

    this.datepicker = this.jQueryElement.data('datepicker');
  }
  ngOnDestroy() {
    // this.datepicker.destroy();
  }
}
