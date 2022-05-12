import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-sparkline]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoSparklineComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  /** Chart Type */
  @Input() set type(value: SohoSparklineType) {
    this.options.type = value;

    if (this.sparkline) {
      this.sparkline.settings.type = value;
      this.updateRequired = true;
    }
  }

  /** An array of color sequences in hex format fx #1D5F8A, defaulting to the correct standard colors. */
  @Input() set colors(value: Array<any>) {
    this.options.colors = value;

    if (this.sparkline) {
      this.sparkline.settings.colors = value;
      this.updateRequired = true;
    }
  }

  /** Shows dots on the data points. */
  @Input() set isDots(value: boolean) {
    this.options.isDots = value;

    if (this.sparkline) {
      this.sparkline.settings.isDots = value;
      this.updateRequired = true;
    }
  }

  /** Highlights the top value as peak with a special dot. */
  @Input() set isPeakDot(value: boolean) {
    this.options.isPeakDot = value;

    if (this.sparkline) {
      this.sparkline.settings.isPeakDot = value;
      this.updateRequired = true;
    }
  }

  /** Shows a continuous shading to highlight the min and max values. */
  @Input() set isMinMax(value: boolean) {
    this.options.isMinMax = value;

    if (this.sparkline) {
      this.sparkline.settings.isMinMax = value;
      this.updateRequired = true;
    }
  }

  /** Adds a median range display. */
  @Input() set isMedianRange(value: boolean) {
    this.options.isMedianRange = value;

    if (this.sparkline) {
      this.sparkline.settings.isMedianRange = value;
      this.updateRequired = true;
    }
  }

  /* Events*/
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo remove override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() contextmenu: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement?: JQuery;
  private sparkline?: SohoSparkline | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.jQueryElement.chart(this.options);
      this.sparkline = this.jQueryElement.data('sparkline');

      // Setup the events
      this.jQueryElement.on('rendered', (...args) =>
        this.ngZone.run(() => this.rendered.emit(args)));
      this.jQueryElement.on('contextmenu', (...args) =>
        this.ngZone.run(() => this.contextmenu?.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.sparkline && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.sparkline?.updated(this.sparkline.settings));
      this.updateRequired = false;
    }
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.sparkline) {
        this.sparkline.destroy();
        this.sparkline = null;
      }
    });
  }
}
