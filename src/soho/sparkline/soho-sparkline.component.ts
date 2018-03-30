import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-sparkline]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoSparklineComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoSparklineOptions = {};

  @HostBinding('class.sparkline') get isSparkline() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.sparkline) {
      this.sparkline.settings.dataset = dataset;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

   /** Chart Type */
  @Input() set type(value: string) {
    this.options.type = value;

    if (this.sparkline) {
      this.sparkline.settings.type = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /** An array of color sequences in hex format fx #1D5F8A, defaulting to the correct standard colors. */
  @Input() set colors(value: Array<any>) {
    this.options.colors = value;

    if (this.sparkline) {
      this.sparkline.settings.colors = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /** Shows dots on the data points. */
  @Input() set isDots(value: boolean) {
    this.options.isDots = value;

    if (this.sparkline) {
      this.sparkline.settings.isDots = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /** Highlights the top value as peak with a special dot. */
  @Input() set isPeakDot(value: boolean) {
    this.options.isPeakDot = value;

    if (this.sparkline) {
      this.sparkline.settings.isPeakDot = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /** Shows a continuous shading to highlight the min and max values. */
  @Input() set isMinMax(value: boolean) {
    this.options.isMinMax = value;

    if (this.sparkline) {
      this.sparkline.settings.isMinMax = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /** Adds a median range display. */
  @Input() set isMedianRange(value: boolean) {
    this.options.isMedianRange = value;

    if (this.sparkline) {
      this.sparkline.settings.isMedianRange = value;
      this.sparkline.updated(this.sparkline.settings);
    }
  }

  /* Events*/
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private sparkline: SohoSparkline;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.chart(this.options);
    this.sparkline = this.jQueryElement.data('sparkline');

    // Setup the events
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.sparkline) {
      this.sparkline.destroy();
      this.sparkline = null;
    }
  }

}
