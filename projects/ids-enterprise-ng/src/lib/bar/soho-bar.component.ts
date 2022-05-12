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
  selector: '[soho-bar]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoBarComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  /** Chart Type */
  @Input() set type(value: SohoBarType) {
    this.options.type = value;

    if (this.bar) {
      this.bar.settings.type = value;
      this.updateRequired = true;
    }
  }

  /** Default is a single or stacked chart. */
  @Input() set isStacked(value: boolean) {
    this.options.isStacked = value;

    if (this.bar) {
      this.bar.settings.isStacked = value;
      this.updateRequired = true;
    }
  }

  /** If true its a 100% bar chart. */
  @Input() set isNormalized(value: boolean) {
    this.options.isNormalized = value;

    if (this.bar) {
      this.bar.settings.isNormalized = value;
      this.updateRequired = true;
    }
  }

  /** If true its a grouped bar chart. */
  @Input() set isGrouped(value: boolean) {
    this.options.isGrouped = value;

    if (this.bar) {
      this.bar.settings.isGrouped = value;
      this.updateRequired = true;
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.bar) {
      this.bar.settings.showLegend = value;
      this.updateRequired = true;
    }
  }

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.bar) {
      this.bar.settings.animate = value;
      this.updateRequired = true;
    }
  }

  /** If true, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.bar) {
      this.bar.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** Use d3 format some examples can be found on http://bit.ly/1IKVhHh */
  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.bar) {
      this.bar.settings.formatterString = value;
      this.updateRequired = true;
    }
  }

  /** The d3 axis format. */
  @Input() set format(value: string) {
    this.options.format = value;

    if (this.bar) {
      this.bar.settings.format = value;
      this.updateRequired = true;
    }
  }

  /** A tooltip for the whole chart. */
  @Input() set tooltip(value: string) {
    this.options.tooltip = value;

    if (this.bar) {
      this.bar.settings.tooltip = value;
      this.updateRequired = true;
    }
  }

  /** If true log scale is enabled. */
  @Input() set useLogScale(value: boolean) {
    this.options.useLogScale = value;

    if (this.bar) {
      this.bar.settings.useLogScale = value;
      this.updateRequired = true;
    }
  }

  /** Settings for the chart ticks. Can set ticks: {format: d3Format, number: n} */
  @Input() set ticks(value: object) {
    this.options.ticks = value;

    if (this.bar) {
      this.bar.settings.ticks = value;
      this.updateRequired = true;
    }
  }

  /** Show the in the axis lines or not. */
  @Input() set showLines(value: boolean) {
    this.options.showLines = value;

    if (this.bar) {
      this.bar.settings.showLines = value;
      this.updateRequired = true;
    }
  }

  /** How far out than the outer circle should the labels be placed, this
   * may be useful to adjust for some labels. */
  @Input() set labelFactor(value: number) {
    this.options.labelFactor = value;

    if (this.bar) {
      this.bar.settings.labelFactor = value;
      this.updateRequired = true;
    }
  }

  /** The number of pixels after which a label needs to be given a new line.
   * You may want to change this based on label data. */
  @Input() set wrapWidth(value: number) {
    this.options.wrapWidth = value;

    if (this.bar) {
      this.bar.settings.wrapWidth = value;
      this.updateRequired = true;
    }
  }

  /** If true chart height will fit in parent available height. */
  @Input() set fitHeight(value: boolean) {
    this.options.fitHeight = value;

    if (this.bar) {
      this.bar.settings.fitHeight = value;
      this.updateRequired = true;
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.bar) {
      this.bar.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /**
   * Add extra attributes like id's to the component
   *
   * @param attributes - the array or object of attributes to add
   */
  @Input() set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;

    if (this.bar) {
      this.bar.settings.attributes = attributes;
      this.updateRequired = true;
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoBarSelectEvent> = new EventEmitter<SohoBarSelectEvent>();
  @Output() unselected: EventEmitter<SohoBarSelectEvent> = new EventEmitter<SohoBarSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();
  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() contextmenu: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement?: JQuery;
  private bar?: SohoBar | null;
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
      this.bar = this.jQueryElement.data('bar');

      // Setup the events
      this.jQueryElement.on('selected', (_e: any, args: SohoBarSelectEvent) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (_e: any, args: SohoBarSelectEvent) =>
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
    if (this.bar && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.bar?.updated(this.bar.settings));
      this.updateRequired = false;
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.options.type = 'bar';
      this.jQueryElement?.chart(this.options);
      this.bar = this.jQueryElement?.data('bar');
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
      if (this.bar) {
        this.bar.destroy();
        this.bar = null;
      }
    });
  }

  public setSelected(selected: SohoBarSelected) {
    this.ngZone.runOutsideAngular(() => this.bar?.setSelected(selected));
  }

  public toggleSelected(selected: SohoBarSelected) {
    this.ngZone.runOutsideAngular(() => this.bar?.toggleSelected(selected));
  }

  public getSelected(): SohoBarSelected {
    return this.ngZone.runOutsideAngular(() => (this.bar as any).getSelected());
  }
}
