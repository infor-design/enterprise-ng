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
  selector: '[soho-bar]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoBarComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoBarOptions = {};

  @HostBinding('class.chart-container.bar-chart') get isBar() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.bar) {
      this.bar.settings.dataset = dataset;
      this.bar.updated(this.bar.settings);
    }
  }

   /** Chart Type */
  @Input() set type(value: string) {
    this.options.type = value;

    if (this.bar) {
      this.bar.settings.type = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** Default is a single or stacked chart. */
  @Input() set isStacked(value: boolean) {
    this.options.isStacked = value;

    if (this.bar) {
      this.bar.settings.isStacked = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** If true its a 100% bar chart. */
  @Input() set isNormalized(value: boolean) {
    this.options.isNormalized = value;

    if (this.bar) {
      this.bar.settings.isNormalized = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** If true its a grouped bar chart. */
  @Input() set isGrouped(value: boolean) {
    this.options.isGrouped = value;

    if (this.bar) {
      this.bar.settings.isGrouped = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.bar) {
      this.bar.settings.showLegend = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.bar) {
      this.bar.settings.animate = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** If true, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.bar) {
      this.bar.settings.redrawOnResize = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** Use d3 format some examples can be found on http://bit.ly/1IKVhHh */
  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.bar) {
      this.bar.settings.formatterString = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** The d3 axis format. */
  @Input() set format(value: string) {
    this.options.format = value;

    if (this.bar) {
      this.bar.settings.format = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** A tooltip for the whole chart. */
  @Input() set tooltip(value: string) {
    this.options.tooltip = value;

    if (this.bar) {
      this.bar.settings.tooltip = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** If true log scale is enabled. */
  @Input() set useLogScale(value: boolean) {
    this.options.useLogScale = value;

    if (this.bar) {
      this.bar.settings.useLogScale = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** Settings for the chart ticks. Can set ticks: {format: d3Format, number: n} */
  @Input() set ticks(value: object[]) {
    this.options.ticks = value;

    if (this.bar) {
      this.bar.settings.ticks = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** Show the in the axis lines or not. */
  @Input() set showLines(value: boolean) {
    this.options.showLines = value;

    if (this.bar) {
      this.bar.settings.showLines = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** How far out than the outer circle should the labels be placed, this
    * may be useful to adjust for some labels. */
  @Input() set labelFactor(value: number) {
    this.options.labelFactor = value;

    if (this.bar) {
      this.bar.settings.labelFactor = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** The number of pixels after which a label needs to be given a new line.
    * You may want to change this based on label data. */
  @Input() set wrapWidth(value: number) {
    this.options.wrapWidth = value;

    if (this.bar) {
      this.bar.settings.wrapWidth = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: object[]) {
    this.options.emptyMessage = value;

    if (this.bar) {
      this.bar.settings.emptyMessage = value;
      this.bar.updated(this.bar.settings);
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoBarSelectEvent> = new EventEmitter<SohoBarSelectEvent>();
  @Output() unselected: EventEmitter<SohoBarSelectEvent> = new EventEmitter<SohoBarSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private bar: SohoBar;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.chart(this.options);
    this.bar = this.jQueryElement.data('bar');

    // Setup the events
    this.jQueryElement.on('selected', (e: any, args: SohoBarSelectEvent) => this.selected.emit(args));
    this.jQueryElement.on('unselected', (e: any, args: SohoBarSelectEvent) => this.unselected.emit(args));
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.bar) {
      this.bar.destroy();
      this.bar = null;
    }
  }

  public setSelected(selected: SohoBarSelected) {
    this.bar.setSelected(selected);
  }

  public toggleSelected(selected: SohoBarSelected) {
    this.bar.toggleSelected(selected);
  }

  public getSelected():  SohoBarSelected {
    return this.bar.getSelected();
  }

}
