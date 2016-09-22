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

@Component({
  selector: 'input[soho-timepicker]',
  template: '<ng-content></ng-content>'
})
export class SohoTimepickerComponent implements AfterViewInit, OnDestroy {
  /**
   * Indicates mode, either 'standard' or 'range'; default value is 'standard'
   */
  @Input() mode: SohoTimeMode = undefined;
  /**
   * Indicates the pattern for the time format.
   */
  @Input() timeFormat: string = undefined;
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown;
   * default value is 5.
   */
  @Input() minuteInterval: number = undefined;
  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event;
   * default value is false;
   */
  @Input() roundToInterval: boolean = false;

  /**
   * Called when the datepicker value changes
   */
  @Output() change: EventEmitter<SohoTimepickerEvent> = new EventEmitter<SohoTimepickerEvent>();

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class') hostClass: string = 'timepicker';

  /**
   * Local variables
   */
  private jQueryElement: any;
  private timepicker: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    let options: SohoTimepickerOptions = {
      mode: this.mode,
      timeFormat: this.timeFormat,
      minuteInterval: this.minuteInterval,
      roundToInterval: this.roundToInterval
    };

    this.jQueryElement.timepicker(options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoTimepickerEvent) => this.change.emit(event));

    this.timepicker = this.jQueryElement.data('timepicker');
  }
  ngOnDestroy() {
    this.timepicker.destroy();
  }
}
