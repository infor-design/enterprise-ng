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
  selector: '[soho-treemap]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoTreemapComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoTreemapOptions = {};

  @HostBinding('class.chart-container.chart-treemap') get isTreemap() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Object) {
    this.options.dataset = dataset;

    if (this.treemap) {
      this.treemap.settings.dataset = dataset;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** If false, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.treemap) {
      this.treemap.settings.redrawOnResize = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** The margins of the SVG, which you may want to adjust depending on text location. */
  @Input() set margin(value: Object[]) {
    this.options.margin = value;

    if (this.treemap) {
      this.treemap.settings.margin = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** An array of colors used in sequence from front to end of the array. */
  @Input() set colors(value: Array<any>) {
    this.options.colors = value;

    if (this.treemap) {
      this.treemap.settings.colors = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** If false then the percentage wont be shown in the blocks. */
  @Input() set showLabel(value: boolean) {
    this.options.showLabel = value;

    if (this.treemap) {
      this.treemap.settings.showLabel = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** The d3 formatter function for the value label. */
  @Input() set labelFormatter(value: string) {
    this.options.labelFormatter = value;

    if (this.treemap) {
      this.treemap.settings.labelFormatter = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** If true then the first name will be used for the title area. */
  @Input() set showTitle(value: boolean) {
    this.options.showTitle = value;

    if (this.treemap) {
      this.treemap.settings.showTitle = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: object[]) {
    this.options.emptyMessage = value;

    if (this.treemap) {
      this.treemap.settings.emptyMessage = value;
      this.treemap.updated(this.treemap.settings);
    }
  }

  /** Events */
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private treemap: SohoTreemap;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // this.options.type = 'treemap';
    this.jQueryElement.treemap(this.options);
    this.treemap = this.jQueryElement.data('treemap');

    // Setup the events
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.treemap) {
      this.treemap.destroy();
      this.treemap = null;
    }
  }

}
