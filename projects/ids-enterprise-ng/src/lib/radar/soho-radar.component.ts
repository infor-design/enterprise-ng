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
  selector: '[soho-radar]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoRadarComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /** Options. */
  private options: SohoRadarOptions = {};

  @HostBinding('class.chart-container') get isRadar() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.radar) {
      this.radar.settings.dataset = dataset;
      this.updateRequired = true;
    }
  }

  /** If false, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.radar) {
      this.radar.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** Makes it possible to adjust the top margins */
  @Input() set margin(value: Object) {
    this.options.margin = value;

    if (this.radar) {
      this.radar.settings.margin = value;
      this.updateRequired = true;
    }
  }

  /** How many levels or inner circles should there be drawn. */
  @Input() set levels(value: number) {
    this.options.levels = value;

    if (this.radar) {
      this.radar.settings.levels = value;
      this.updateRequired = true;
    }
  }

  /** What is the value that the biggest circle will represent */
  @Input() set maxValue(value: number) {
    this.options.maxValue = value;

    if (this.radar) {
      this.radar.settings.maxValue = value;
      this.updateRequired = true;
    }
  }

  /** How far out than the outer circle should the labels be placed,
   * this may be useful to adjust for some charts. */
  @Input() set labelFactor(value: number) {
    this.options.labelFactor = value;

    if (this.radar) {
      this.radar.settings.labelFactor = value;
      this.updateRequired = true;
    }
  }

  /**  The number of pixels after which a label needs to be
   * given a new line. You may want to change this based on label data. */
  @Input() set wrapWidth(value: number) {
    this.options.wrapWidth = value;

    if (this.radar) {
      this.radar.settings.wrapWidth = value;
      this.updateRequired = true;
    }
  }

  /**  The opacity value of the blobs. */
  @Input() set opacityArea(value: number) {
    this.options.opacityArea = value;

    if (this.radar) {
      this.radar.settings.opacityArea = value;
      this.updateRequired = true;
    }
  }

  /**  The size of the colored circles of each blog. Set to zero to remove dots. */
  @Input() set dotRadius(value: number) {
    this.options.dotRadius = value;

    if (this.radar) {
      this.radar.settings.dotRadius = value;
      this.updateRequired = true;
    }
  }

  /**  The opacity of the circles of each blob 0 or .1 are good values. */
  @Input() set opacityCircles(value: number) {
    this.options.opacityCircles = value;

    if (this.radar) {
      this.radar.settings.opacityCircles = value;
      this.updateRequired = true;
    }
  }

  /** The width of the stroke around each blob. */
  @Input() set strokeWidth(value: number) {
    this.options.strokeWidth = value;

    if (this.radar) {
      this.radar.settings.strokeWidth = value;
      this.updateRequired = true;
    }
  }

  /** If true the area and stroke will follow a round path (cardinal-closed). */
  @Input() set roundStrokes(value: boolean) {
    this.options.roundStrokes = value;

    if (this.radar) {
      this.radar.settings.roundStrokes = value;
      this.updateRequired = true;
    }
  }

  /** If false the axis lines will not be shown in the diagonals. */
  @Input() set showCrosslines(value: boolean) {
    this.options.showCrosslines = value;

    if (this.radar) {
      this.radar.settings.showCrosslines = value;
      this.updateRequired = true;
    }
  }

  /** If false the axis labels will not be shown. */
  @Input() set showAxisLabels(value: boolean) {
    this.options.showAxisLabels = value;

    if (this.radar) {
      this.radar.settings.showAxisLabels = value;
      this.updateRequired = true;
    }
  }

  /** An array of colors to use for each blob */
  @Input() set colors(value: any) {
    this.options.colors = value;

    if (this.radar) {
      this.radar.settings.colors = value;
      this.updateRequired = true;
    }
  }

  /** If false no tooltips will be shown. */
  @Input() set showTooltips(value: boolean) {
    this.options.showTooltips = value;

    if (this.radar) {
      this.radar.settings.showTooltips = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the tooltip values and format. */
  @Input() set tooltip(value: SohoRadarTooltipOptions) {
    this.options.tooltip = value;

    if (this.radar) {
      this.radar.settings.tooltip = value;
      this.updateRequired = true;
    }
  }

  /** d3 formatter to use on the axis labels */
  @Input() set axisFormatter(value: string) {
    this.options.axisFormatter = value;

    if (this.radar) {
      this.radar.settings.axisFormatter = value;
      this.updateRequired = true;
    }
  }

  /**  If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.radar) {
      this.radar.settings.showLegend = value;
      this.updateRequired = true;
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set legendPlacement(value: string) {
    this.options.legendPlacement = value;

    if (this.radar) {
      this.radar.settings.legendPlacement = value;
      this.updateRequired = true;
    }
  }

  /**  An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.radar) {
      this.radar.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(value: Array<Object> | Object) {
    this.options.attributes = value;

    if (this.radar) {
      this.radar.settings.attributes = value;
      this.updateRequired = true;
    }
  }

  /* Events*/
  @Output() selected: EventEmitter<SohoRadarSelectEvent> = new EventEmitter<SohoRadarSelectEvent>();
  @Output() unselected: EventEmitter<SohoRadarSelectEvent> = new EventEmitter<SohoRadarSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo remove override of native elements
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() contextmenu: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement?: JQuery;
  private radar?: SohoRadar | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.options.type = 'radar';
      this.jQueryElement.chart(this.options);
      this.radar = this.jQueryElement.data('radar');

      // Setup the events
      this.jQueryElement.on('selected', (_e: any, args: SohoRadarSelectEvent) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (_e: any, args: SohoRadarSelectEvent) =>
        this.ngZone.run(() => this.unselected.emit(args)));
      this.jQueryElement.on('rendered', (...args) =>
        this.ngZone.run(() => this.rendered.emit(args)));
      this.jQueryElement.on('contextmenu', (...args) =>
        this.ngZone.run(() => this.contextmenu?.emit(args)));
      this.jQueryElement.on('dblclick', (_e: any, args: Object) =>
        this.ngZone.run(() => this.dblclick.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.radar && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.radar?.updated(this.radar.settings));
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
      if (this.radar) {
        this.radar.destroy();
        this.radar = null;
      }
    });
  }

  public setSelected(selected: SohoRadarSelected) {
    this.ngZone.runOutsideAngular(() => this.radar?.setSelected(selected));
  }

  public toggleSelected(selected: SohoRadarSelected) {
    this.ngZone.runOutsideAngular(() => this.radar?.toggleSelected(selected));
  }

  public getSelected() {
    return this.ngZone.runOutsideAngular(() => this.radar?.getSelected());
  }
}
