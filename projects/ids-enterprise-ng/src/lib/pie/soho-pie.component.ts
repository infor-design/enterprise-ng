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

import 'ids-enterprise-wc/components/ids-pie-chart/ids-pie-chart';
import type IdsPieChart from 'ids-enterprise-wc/components/ids-pie-chart/ids-pie-chart';

@Component({
  selector: '[soho-pie]', // eslint-disable-line
  template: '<ids-pie-chart><ng-content></ng-content></ids-pie-chart>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoPieComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoPieOptions = {};

  @HostBinding('class.chart-container') get isPie() {
    return true;
  }

  /** Defines the data to use, must be specified for this component.
   * @deprecated use data instead
   */
  @Input() set dataset(data: Array<any>) {
    this.options.dataset = data;
    this.data = (data as any).data;
    if (this.pie && (data as any).centerLabel) this.pie!.donutText = (data as any).centerLabel;
    if (this.pie && (data as any).centerLabel) this.pie!.tooltipData = (data as any).centerTooltip;
  }

  @Input() set data(data: Array<any>) {
    if (this.pie) {
      this.pie.data = data;
    }
  }

  /** If true it renders as a donut chart. */
  @Input() set isDonut(value: boolean) {
    this.options.isDonut = value;

    if (this.pie) {
      this.pie.donut = value;
      this.updateRequired = true;
    }
  }

  /** Controls the animation speed. */
  @Input() set animationSpeed(value: number) {
    this.options.animationSpeed = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.animationSpeed = value;
      this.updateRequired = true;
    }
  }

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  @Input() set animate(value: any) {
    this.options.animate = value;

    if (this.pie) {
      this.pie.animate = value;
      this.updateRequired = true;
    }
  }

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
   * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** If false the center label will not be shown. */
  @Input() set hideCenterLabel(value: boolean) {
    this.options.hideCenterLabel = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.hideCenterLabel = value;
      this.updateRequired = true;
    }
  }

  /** If false connector lines wont be shown. */
  @Input() set showLines(value: boolean) {
    this.options.showLines = value;

    if (this.pie) {
      // TODO: Gap / Deprecated
      // this.pie.settings.showLines = value;
      this.updateRequired = true;
    }
  }

  /** This defaults to false, when false and under 450px the lines. */
  @Input() set showLinesMobile(value: boolean) {
    this.options.showLinesMobile = value;

    if (this.pie) {
      // TODO: Gap / Deprecated
      // this.pie.settings.showLinesMobile = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the line values and format. */
  @Input() set lines(value: SohoPieLinesOptions) {
    this.options.lines = value;

    if (this.pie) {
      // TODO: Gap / Deprecated - and can not be backwards compatible
      // this.pie.settings.lines = value;
      this.updateRequired = true;
    }
  }

  /** If false the legend will not be shown. */
  @Input() set showLegend(value: boolean) {
    this.options.showLegend = value;

    if (this.pie) {
      // TODO: Maybe wont work
      this.pie.legendPlacement = value ? 'none' : '';
      this.updateRequired = true;
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set legendPlacement(value: string) {
    this.options.legendPlacement = value;

    if (this.pie) {
      // TODO Map it
      this.pie.legendPlacement = value;
      this.updateRequired = true;
    }
  }

  /** Where to locate the legend. This can be bottom or right at the moment. */
  @Input() set forceLegendPopup(value: boolean) {
    this.options.forceLegendPopup = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.forceLegendPopup = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the legend values and format. */
  @Input() set legend(value: SohoPieLegendOptions) {
    this.options.legend = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.legend = value;
      this.updateRequired = true;
    }
  }

  /** If false now tooltips will be shown */
  @Input() set showTooltips(value: boolean) {
    this.options.showTooltips = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.showTooltips = value;
      this.updateRequired = true;
    }
  }

  /** A setting that controls the tooltip values and format. */
  @Input() set tooltip(value: SohoPieTooltipOptions) {
    this.options.tooltip = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.tooltip = value;
      this.updateRequired = true;
    }
  }

  /** If true center tooltip will be shown */
  @Input() set showCenterTooltip(value: boolean) {
    this.options.showCenterTooltip = value;

    if (this.pie) {
      // TODO: Gap - done by donut setting
      // this.pie.settings.showCenterTooltip = value;
      this.updateRequired = true;
    }
  }

  /** If true chart height will fit in parent available height. */
  @Input() set fitHeight(value: boolean) {
    this.options.fitHeight = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.fitHeight = value;
      this.updateRequired = true;
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.pie) {
      // TODO: Gap
      // this.pie.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** Events */
  @Output() selected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() unselected: EventEmitter<SohoPieSelectEvent> = new EventEmitter<SohoPieSelectEvent>();
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() dblclick: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * @todo remove override of native element
   */
  @Output() contextmenu?: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement?: JQuery;
  private pie?: IdsPieChart | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Map The API
      this.pie = this.element.nativeElement.querySelector('ids-pie-chart') as IdsPieChart;
      this.options.type = 'pie';

      const data = (this.options && this.options.dataset) ? (this.options.dataset[0] as any).data : [];
      this.pie.data = [{
        "data": [{
          "name": "Item A",
          "tooltip": "<b>Item A</b> ${value}",
          "value": 10.1
        }, {
          "name": "Item B",
          "tooltip": "<b>Item B</b> ${value}",
          "value": 12.2
        }, {
          "name": "Item C",
          "tooltip": "<b>Item C</b> ${value}",
          "value": 14.35
        }, {
          "name": "Item D",
          "tooltip": "<b>Item D</b> ${value}",
          "value": 15.6
        }, {
          "name": "Item E",
          "tooltip": "<b>Item E</b> ${value}",
          "value": 41.6
        }]
      }];

      // Setup the events
      this.pie.addEventListener('selected', (e) => this.selected.emit(e as any));

      // this.pie.addEventListener('selected', (_e: any, args: SohoPieSelectEvent) =>
      //   this.ngZone.run(() => this.selected.emit(args)));
      // this.pie.on('unselected', (_e: any, args: SohoPieSelectEvent) =>
      //   this.ngZone.run(() => this.unselected.emit(args)));
      // this.pie.on('rendered', (...args) =>
      //   this.ngZone.run(() => this.rendered.emit(args)));
      // this.pie.on('contextmenu', (...args) =>
      //   this.ngZone.run(() => this.contextmenu?.emit(args)));
      // this.pie.on('dblclick', (_e: any, args: Object) =>
      //   this.ngZone.run(() => this.dblclick.emit(args)));
    });
  }

  updated() {
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.pie) {
      this.pie = null;
    }
  }

  public setSelected(selected: SohoPieSelected) {
    this.ngZone.runOutsideAngular(() => this.pie?.setSelected(selected));
  }

  public toggleSelected(selected: SohoPieSelected) {
    // TODO: Gap
    // this.ngZone.runOutsideAngular(() => this.pie?.toggleSelected(selected));
  }

  public getSelected() {
    return this.ngZone.runOutsideAngular(() => this.pie?.getSelected());
  }
}
