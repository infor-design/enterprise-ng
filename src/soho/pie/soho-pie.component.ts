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
  selector: '[soho-pie]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoPieComponent implements AfterViewInit, OnDestroy {
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
      this.pie.updated(this.pie.settings);
    }
  }

  /** If true it renders as a donut chart. */
  @Input() set isDonut(value: boolean) {
    this.options.isDonut = value;

    if (this.pie) {
      this.pie.settings.isDonut = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** Controls the animation speed. */
  @Input() set animationSpeed(value: number) {
    this.options.animationSpeed = value;

    if (this.pie) {
      this.pie.settings.animationSpeed = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  @Input() set animate(value: any) {
    this.options.animate = value;

    if (this.pie) {
      this.pie.settings.animate = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
    * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.pie) {
      this.pie.settings.redrawOnResize = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** If false the center label will not be shown. */
  @Input() set hideCenterLabel(value: boolean) {
    this.options.hideCenterLabel = value;

    if (this.pie) {
      this.pie.settings.hideCenterLabel = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** If false connector lines wont be shown. */
  @Input() set showLines(value: boolean) {
    this.options.showLines = value;

    if (this.pie) {
      this.pie.settings.showLines = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** This defaults to false, when false and under 450px the lines. */
  @Input() set showLinesMobile(value: boolean) {
    this.options.showLinesMobile = value;

    if (this.pie) {
      this.pie.settings.showLinesMobile = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** A setting that controls the line values and format. */
  @Input() set lines(value: SohoPieLinesOptions) {
    this.options.lines = value;

    if (this.pie) {
      this.pie.settings.lines = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.pie) {
      this.pie.settings.showLegend = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set legendPlacement(value: string) {
    this.options.legendPlacement = value;

    if (this.pie) {
      this.pie.settings.legendPlacement = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** A setting that controls the legend values and format. */
  @Input() set legend(value: SohoPieLegendOptions) {
    this.options.legend = value;

    if (this.pie) {
      this.pie.settings.legend = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** If false now tooltips will be shown */
  @Input() set showTooltips(value: boolean) {
    this.options.showTooltips = value;

    if (this.pie) {
      this.pie.settings.showTooltips = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** A setting that controls the tooltip values and format. */
  @Input() set tooltip(value: SohoPieTooltipOptions) {
    this.options.tooltip = value;

    if (this.pie) {
      this.pie.settings.tooltip = value;
      this.pie.updated(this.pie.settings);
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() unselected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private pie: SohoPie;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.options.type = 'pie';
    this.jQueryElement.chart(this.options);
    this.pie = this.jQueryElement.data('pie');

    // Setup the events
    this.jQueryElement.on('selected', (e: any, args: SohoPieSelectEvent) => this.selected.emit(args));
    this.jQueryElement.on('unselected', (e: any, args: SohoPieSelectEvent) => this.unselected.emit(args));
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.pie) {
      this.pie.destroy();
      this.pie = null;
    }
  }

  public setSelected(selected: SohoPieSelected) {
    this.pie.setSelected(selected);
  }

  public toggleSelected(selected: SohoPieSelected) {
    this.pie.toggleSelected(selected);
  }

  public getSelected() {
    this.pie.getSelected();
  }
}
