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
  selector: '[soho-line]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoLineComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  @Input() set tooltip(value: string) {
    this.options.tooltip = value;

    if (this.line) {
      this.line.settings.tooltip = value;
      this.updateRequired = true;
    }
  }

  @Input() set isArea(value: boolean) {
    this.options.isArea = value;

    if (this.line) {
      this.line.settings.isArea = value;
      this.updateRequired = true;
    }
  }

  @Input() set isBubble(value: boolean) {
    this.options.isBubble = value;

    if (this.line) {
      this.line.settings.isBubble = value;
      this.updateRequired = true;
    }
  }

  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.line) {
      this.line.settings.showLegend = value;
      this.updateRequired = true;
    }
  }

  @Input() set xAxis(value: object) {
    this.options.xAxis = value;

    if (this.line) {
      this.line.settings.xAxis = value;
      this.updateRequired = true;
    }
  }

  @Input() set yAxis(value: object) {
    this.options.yAxis = value;

    if (this.line) {
      this.line.settings.yAxis = value;
      this.updateRequired = true;
    }
  }

  @Input() set hideDots(value: boolean) {
    this.options.hideDots = value;

    if (this.line) {
      this.line.settings.hideDots = value;
      this.updateRequired = true;
    }
  }

  @Input() set axisLabels(value: any) {
    this.options.axisLabels = value;

    if (this.line) {
      this.line.settings.axisLabels = value;
      this.updateRequired = true;
    }
  }

  @Input() set animate(value: boolean) {
    this.options.animate = value;

    if (this.line) {
      this.line.settings.animate = value;
      this.updateRequired = true;
    }
  }

  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.line) {
      this.line.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  @Input() set dots(value: object) {
    this.options.dots = value;

    if (this.line) {
      this.line.settings.dots = value;
      this.updateRequired = true;
    }
  }

  @Input() set formatterString(value: string) {
    this.options.formatterString = value;

    if (this.line) {
      this.line.settings.formatterString = value;
      this.updateRequired = true;
    }
  }

  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.line) {
      this.line.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  @Output() selected: EventEmitter<SohoLineSelectEvent> = new EventEmitter<SohoLineSelectEvent>();
  @Output() unselected: EventEmitter<SohoLineSelectEvent> = new EventEmitter<SohoLineSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() contextmenu: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement?: JQuery;
  private line?: SohoLine | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      this.jQueryElement = jQuery(this.element.nativeElement);

      this.options.type = 'line';
      this.jQueryElement.chart(this.options);
      this.line = this.jQueryElement.data('line');

      // Setup the events
      this.jQueryElement.on('selected', (_e: any, args: SohoLineSelectEvent) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('unselected', (_e: any, args: SohoLineSelectEvent) =>
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
    if (this.line && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.line?.updated(this.line.settings));
      this.updateRequired = false;
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.options.type = 'line';
      this.jQueryElement?.chart(this.options);
      this.line = this.jQueryElement?.data('line');
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
      if (this.line) {
        this.line.destroy();
        this.line = null;
      }
    });
  }

  public setSelected(selected: SohoLineSelected) {
    this.ngZone.runOutsideAngular(() => this.line?.setSelected(selected));
  }

  public toggleSelected(selected: SohoLineSelected) {
    this.ngZone.runOutsideAngular(() => this.line?.toggleSelected(selected));
  }

  public getSelected() {
    return this.ngZone.runOutsideAngular(() => this.line?.getSelected());
  }
}
