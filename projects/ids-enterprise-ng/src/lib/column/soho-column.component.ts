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
  selector: '[soho-column]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoColumnComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  /** Chart Type */
  @Input() set type(value: SohoColumnType) {
    this.options.type = value;

    if (this.column) {
      this.column.settings.type = value;
      this.updateRequired = true;
    }
  }

  /** Default is a single or stacked chart. */
  @Input() set isStacked(value: boolean) {
    this.options.isStacked = value;

    if (this.column) {
      this.column.settings.isStacked = value;
      this.updateRequired = true;
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.column) {
      this.column.settings.showLegend = value;
      this.updateRequired = true;
    }
  }

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.column) {
      this.column.settings.animate = value;
      this.updateRequired = true;
    }
  }

  /** If true, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.column) {
      this.column.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** The d3 axis format. */
  @Input() set format(value: string) {
    this.options.format = value;

    if (this.column) {
      this.column.settings.format = value;
      this.updateRequired = true;
    }
  }

  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.column) {
      this.column.settings.formatterString = value;
      this.updateRequired = true;
    }
  }

  /** Settings for the chart ticks. Can set ticks: {format: d3Format, number: n} */
  @Input() set ticks(value: object) {
    this.options.ticks = value;

    if (this.column) {
      this.column.settings.ticks = value;
      this.updateRequired = true;
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.column) {
      this.column.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** Settings for the chart xAxis. */
  @Input() set xAxis(value: object) {
    this.options.xAxis = value;

    if (this.column) {
      this.column.settings.xAxis = value;
      this.updateRequired = true;
    }
  }

  /** Settings for the chart yAxis. */
  @Input() set yAxis(value: object) {
    this.options.yAxis = value;

    if (this.column) {
      this.column.settings.yAxis = value;
      this.updateRequired = true;
    }
  }

  /** Settings for the chart tooltip. */
  @Input() set tooltip(tooltip: string | SohoColumnTooltipFunction) {
    this.options.tooltip = tooltip;

    if (this.column) {
      this.column.settings.tooltip = tooltip;
      this.updateRequired = true;
    }
  }

  /**
   * Add extra attributes like id's to the component
   */
  @Input() set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;

    if (this.column) {
      this.column.settings.attributes = attributes;
      this.updateRequired = true;
    }
  }

  /**
   * Add extra options to control axisLabels
   */
  @Input() set axisLabels(value: any) {
    this.options.axisLabels = value;

    if (this.column) {
      this.column.settings.axisLabels = value;
      this.updateRequired = true;
    }
  }

  /**
   * Adds the ability to use line chart if set to true. This will need a target value to the dataset.
   */
  @Input() set hideDots(value: boolean) {
    this.options.hideDots = value;

    if (this.column) {
      this.column.settings.hideDots = value;
      this.updateRequired = true;
    }
  }

  @Input() set useLine(value: boolean) {
    this.options.useLine = value;

    if (this.column) {
      this.column.settings.useLine = value;
      this.updateRequired = true;
    }
  }


  /** Events */
  @Output() selected: EventEmitter<SohoColumnSelectEvent> = new EventEmitter<SohoColumnSelectEvent>();
  @Output() unselected: EventEmitter<SohoColumnSelectEvent> = new EventEmitter<SohoColumnSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() contextmenu: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement?: JQuery;
  public column?: SohoColumn | null;
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
      this.column = this.jQueryElement.data('column');

      // Setup the events
      this.jQueryElement.on('selected', (_e: any, args: SohoColumnSelectEvent) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (_e: any, args: SohoColumnSelectEvent) =>
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
    if (this.column && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.column?.updated(this.column.settings));
      this.updateRequired = false;
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.options.type = 'column';
      this.jQueryElement?.chart(this.options);
      this.column = this.jQueryElement?.data('column');
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
      if (this.column) {
        this.column.destroy();
        this.column = null;
      }
    });
  }

  public setSelected(selected: SohoColumnSelected) {
    this.ngZone.runOutsideAngular(() => this.column?.setSelected(selected));
  }

  public toggleSelected(selected: SohoColumnSelected) {
    this.ngZone.runOutsideAngular(() => this.column?.toggleSelected(selected));
  }

  public getSelected() {
    return this.ngZone.runOutsideAngular(() => this.column?.getSelected());
  }
}
