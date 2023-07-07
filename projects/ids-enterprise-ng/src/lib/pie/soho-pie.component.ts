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
  selector: '[soho-pie]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoPieComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /** Options. */
  private options: SohoPieOptions = {};

  @HostBinding('class.chart-container') get isPie() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.pie) {
      this.pie.settings.dataset = dataset;
      this.updateRequired = true;
    }
  }

  /** If true it renders as a donut chart. */
  @Input() set isDonut(value: boolean) {
    this.options.isDonut = value;

    if (this.pie) {
      this.pie.settings.isDonut = value;
      this.updateRequired = true;
    }
  }

  /** Controls the animation speed. */
  @Input() set animationSpeed(value: number) {
    this.options.animationSpeed = value;

    if (this.pie) {
      this.pie.settings.animationSpeed = value;
      this.updateRequired = true;
    }
  }

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  @Input() set animate(value: any) {
    this.options.animate = value;

    if (this.pie) {
      this.pie.settings.animate = value;
      this.updateRequired = true;
    }
  }

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
   * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.pie) {
      this.pie.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** If false the center label will not be shown. */
  @Input() set hideCenterLabel(value: boolean) {
    this.options.hideCenterLabel = value;

    if (this.pie) {
      this.pie.settings.hideCenterLabel = value;
      this.updateRequired = true;
    }
  }

  /** If false connector lines wont be shown. */
  @Input() set showLines(value: boolean) {
    this.options.showLines = value;

    if (this.pie) {
      this.pie.settings.showLines = value;
      this.updateRequired = true;
    }
  }

  /** This defaults to false, when false and under 450px the lines. */
  @Input() set showLinesMobile(value: boolean) {
    this.options.showLinesMobile = value;

    if (this.pie) {
      this.pie.settings.showLinesMobile = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the line values and format. */
  @Input() set lines(value: SohoPieLinesOptions) {
    this.options.lines = value;

    if (this.pie) {
      this.pie.settings.lines = value;
      this.updateRequired = true;
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.pie) {
      this.pie.settings.showLegend = value;
      this.updateRequired = true;
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set legendPlacement(value: string) {
    this.options.legendPlacement = value;

    if (this.pie) {
      this.pie.settings.legendPlacement = value;
      this.updateRequired = true;
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set forceLegendPopup(value: boolean) {
    this.options.forceLegendPopup = value;

    if (this.pie) {
      this.pie.settings.forceLegendPopup = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the legend values and format. */
  @Input() set legend(value: SohoPieLegendOptions) {
    this.options.legend = value;

    if (this.pie) {
      this.pie.settings.legend = value;
      this.updateRequired = true;
    }
  }

  /** If false now tooltips will be shown */
  @Input() set showTooltips(value: boolean) {
    this.options.showTooltips = value;

    if (this.pie) {
      this.pie.settings.showTooltips = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the tooltip values and format. */
  @Input() set tooltip(value: SohoPieTooltipOptions) {
    this.options.tooltip = value;

    if (this.pie) {
      this.pie.settings.tooltip = value;
      this.updateRequired = true;
    }
  }

  /** If true center tooltip will be shown */
  @Input() set showCenterTooltip(value: boolean) {
    this.options.showCenterTooltip = value;

    if (this.pie) {
      this.pie.settings.showCenterTooltip = value;
      this.updateRequired = true;
    }
  }

  /** If true chart height will fit in parent available height. */
  @Input() set fitHeight(value: boolean) {
    this.options.fitHeight = value;

    if (this.pie) {
      this.pie.settings.fitHeight = value;
      this.updateRequired = true;
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.pie) {
      this.pie.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() unselected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo remove override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() contextmenu?: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement?: JQuery;
  private pie?: SohoPie | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      this.jQueryElement = jQuery(this.element.nativeElement);

      this.options.type = 'pie';
      this.jQueryElement.chart(this.options);
      this.pie = this.jQueryElement.data('pie');

      // Setup the events
      this.jQueryElement.on('selected', (_e: any, args: SohoPieSelectEvent) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (_e: any, args: SohoPieSelectEvent) =>
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
    if (this.pie && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.pie?.updated(this.pie.settings));
      this.updateRequired = false;
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.options.type = 'pie';
      this.jQueryElement?.chart(this.options);
      this.pie = this.jQueryElement?.data('pie');
    });
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.pie) {
        this.pie.destroy();
        this.pie = null;
      }
    });
  }

  public setSelected(selected: SohoPieSelected) {
    this.ngZone.runOutsideAngular(() => this.pie?.setSelected(selected));
  }

  public toggleSelected(selected: SohoPieSelected) {
    this.ngZone.runOutsideAngular(() => this.pie?.toggleSelected(selected));
  }

  public getSelected() {
    return this.ngZone.runOutsideAngular(() => this.pie?.getSelected());
  }
}
