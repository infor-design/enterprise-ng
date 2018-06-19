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
  selector: '[soho-column]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoColumnComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoColumnOptions = {};

  @HostBinding('class.chart-container') get isColumn() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.column) {
      this.column.settings.dataset = dataset;
      this.column.updated(this.column.settings);
    }
  }

   /** Chart Type */
  @Input() set type(value: string) {
    this.options.type = value;

    if (this.column) {
      this.column.settings.type = value;
      this.column.updated(this.column.settings);
    }
  }

  /** Default is a single or stacked chart. */
  @Input() set isStacked(value: boolean) {
    this.options.isStacked = value;

    if (this.column) {
      this.column.settings.isStacked = value;
      this.column.updated(this.column.settings);
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.column) {
      this.column.settings.showLegend = value;
      this.column.updated(this.column.settings);
    }
  }

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.column) {
      this.column.settings.animate = value;
      this.column.updated(this.column.settings);
    }
  }

  /** If true, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.column) {
      this.column.settings.redrawOnResize = value;
      this.column.updated(this.column.settings);
    }
  }

  /** The d3 axis format. */
  @Input() set format(value: string) {
    this.options.format = value;

    if (this.column) {
      this.column.settings.format = value;
      this.column.updated(this.column.settings);
    }
  }

  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.column) {
      this.column.settings.formatterString = value;
      this.column.updated(this.column.settings);
    }
  }

  /** Settings for the chart ticks. Can set ticks: {format: d3Format, number: n} */
  @Input() set ticks(value: object[]) {
    this.options.ticks = value;

    if (this.column) {
      this.column.settings.ticks = value;
      this.column.updated(this.column.settings);
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: object[]) {
    this.options.emptyMessage = value;

    if (this.column) {
      this.column.settings.emptyMessage = value;
      this.column.updated(this.column.settings);
    }
  }

  /** Settings for the chart xAxis. */
  @Input() set xAxis(value: object) {
    this.options.xAxis = value;

    if (this.column) {
      this.column.settings.xAxis = value;
      this.column.updated(this.column.settings);
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoColumnSelectEvent> = new EventEmitter<SohoColumnSelectEvent>();
  @Output() unselected: EventEmitter<SohoColumnSelectEvent> = new EventEmitter<SohoColumnSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private column: SohoColumn;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.chart(this.options);
    this.column = this.jQueryElement.data('column');

    // Setup the events
    this.jQueryElement.on('selected', (e: any, args: SohoColumnSelectEvent) => this.selected.emit(args));
    this.jQueryElement.on('unselected', (e: any, args: SohoColumnSelectEvent) => this.unselected.emit(args));
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.column) {
      this.column.destroy();
      this.column = null;
    }
  }

  public setSelected(selected: SohoColumnSelected) {
    this.column.setSelected(selected);
  }

  public toggleSelected(selected: SohoColumnSelected) {
    this.column.toggleSelected(selected);
  }

  public getSelected() {
    this.column.getSelected();
  }
}
