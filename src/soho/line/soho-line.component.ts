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
  selector: '[soho-line]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoLineComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoLineOptions = {};

  @HostBinding('class.chart-container') get isLine() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.line) {
      this.line.settings.dataset = dataset;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set tooltip(value: string) {
    this.options.tooltip = value;

    if (this.line) {
      this.line.settings.tooltip = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set isArea(value: boolean) {
    this.options.isArea = value;

    if (this.line) {
      this.line.settings.isArea = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set isBubble(value: boolean) {
    this.options.isBubble = value;

    if (this.line) {
      this.line.settings.isBubble = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.line) {
      this.line.settings.showLegend = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set xAxis(value: object) {
    this.options.xAxis = value;

    if (this.line) {
      this.line.settings.xAxis = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set yAxis(value: object) {
    this.options.yAxis = value;

    if (this.line) {
      this.line.settings.yAxis = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set hideDots(value: boolean) {
    this.options.hideDots = value;

    if (this.line) {
      this.line.settings.hideDots = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set axisLabels(value: any) {
    this.options.axisLabels = value;

    if (this.line) {
      this.line.settings.axisLabels = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.line) {
      this.line.settings.animate = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.line) {
      this.line.settings.redrawOnResize = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set dots(value: object) {
    this.options.dots = value;

    if (this.line) {
      this.line.settings.dots = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.line) {
      this.line.settings.formatterString = value;
      this.line.updated(this.line.settings);
    }
  }

  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.line) {
      this.line.settings.emptyMessage = value;
      this.line.updated(this.line.settings);
    }
  }

  @Output() selected: EventEmitter<SohoLineSelectEvent> = new EventEmitter<SohoLineSelectEvent>();
  @Output() unselected: EventEmitter<SohoLineSelectEvent> = new EventEmitter<SohoLineSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private line: SohoLine;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.options.type = 'line';
    this.jQueryElement.chart(this.options);
    this.line = this.jQueryElement.data('line');

    // Setup the events
    this.jQueryElement.on('selected', (e: any, args: SohoLineSelectEvent) => this.selected.emit(args));
    this.jQueryElement.on('unselected', (e: any, args: SohoLineSelectEvent) => this.unselected.emit(args));
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.line) {
      this.line.destroy();
      this.line = null;
    }
  }

  public setSelected(selected: SohoLineSelected) {
    this.line.setSelected(selected);
  }

  public toggleSelected(selected: SohoLineSelected) {
    this.line.toggleSelected(selected);
  }

  public getSelected() {
    this.line.getSelected();
  }
}
