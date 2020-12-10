import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy, EventEmitter, Output, NgZone, AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'div[soho-chart]', // eslint-disable-line
  template: ' '
})

export class SohoChartComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() set chartOptions(chartOptions: SohoChartOptions) {
    this._chartOptions = chartOptions;
    if (this.jQueryElement) {
      this.updateRequired = true;
    }
  }

  @Input() set selectedIndex(index: number) {

    this.setSelectRef(index);

    // this.setSelectDataIndex(index);
    //
    // if (this.jQueryElement) {
    //   this.updated();
    // }
  }

  @Input() set dataSet(dataset: SohoDataSet) {
    this._chartOptions.dataset = dataset;

    if (this.jQueryElement) {
      this.updateRequired = true;
    }
  }

  @Input() set type(type: ChartTypes) {
    this._chartOptions.type = type;
  }

  @Input() set axisLabels(axisLabels: AxisLabels) {
    this._chartOptions.axisLabels = axisLabels;
  }

  @Input() set showLegend(showLegend: boolean) {
    this._chartOptions.showLegend = showLegend;
  }

  @Input() set hideLabels(hideLabels: boolean) {
    if (this._chartOptions.labels) {
      this._chartOptions.labels.hideLabels = !hideLabels;
    } else {
      this._chartOptions['labels'] = { hideLabels: !hideLabels };
    }
  }

  @Input() set formatterString(formatterString: string) {
    this._chartOptions.formatterString = formatterString;
  }

  @Input() set legendFormatter(legendFormatter: string) {
    this._chartOptions.legendFormatter = legendFormatter;
  }

  @Input() set chartLabel(chartLabel: ChartLabel) {
    this._chartOptions.chartLabel = chartLabel;
  }

  @Input() set chartredrawOnResizeLabel(redrawOnResize: boolean) {
    this._chartOptions.redrawOnResize = redrawOnResize;
  }

  @Input() set chartAnimate(animate: boolean) {
    this._chartOptions.animate = animate;
  }

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  @Output() selected = new EventEmitter<ChartEvent>();

  @Output() unselected = new EventEmitter<ChartEvent>();

  @Output() rendered = new EventEmitter<ChartEvent>();

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output() contextmenu = new EventEmitter<ChartEvent>();

  // An internal chartOptions object that gets updated by using
  // the component's Inputs()
  private _chartOptions: SohoChartOptions = { animate: true };

  // Reference to the jQuery element.
  private jQueryElement?: JQuery;

  // Reference to the soho chart control api.
  private chart?: SohoChartStatic;

  private updateRequired = false;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement.chart(this._chartOptions);

      this.chart = this.jQueryElement.data('chart');

      // bind to jquery events and emit as angular events
      this.jQueryElement.on('selected', (event: JQuery.TriggeredEvent, ui: any, data: any) =>
        this.ngZone.run(() => this.selected.emit({ event, ui, data })));

      this.jQueryElement.on('unselected', (event: JQuery.TriggeredEvent, ui: any, data: any) =>
        this.ngZone.run(() => this.unselected.emit({ event, ui, data })));

      this.jQueryElement.on('rendered', (event: JQuery.TriggeredEvent, ui: any, data: any) =>
        this.ngZone.run(() => this.rendered.emit({ event, ui, data })));

      this.jQueryElement.on('contextmenu', (event: JQuery.TriggeredEvent, ui: any, data: any) =>
        this.ngZone.run(() => this.contextmenu?.emit({ event, ui, data })));
    });
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.updated();
      this.updateRequired = false;
    }
  }

  ngOnDestroy() {
  }

  public getChartOptions(): SohoChartOptions {
    return this._chartOptions;
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement?.chart(this._chartOptions);
      this.chart = this.jQueryElement?.data('chart');
    });
  }

  getSelected() {
    if (this.jQueryElement) {
      return this.ngZone.runOutsideAngular(() => this.chart?.getSelected());
    }
    return undefined;
  }

  setSelectRef(ref: any): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        let selectOptions: ChartSelectionOptions;
        if ((this._chartOptions as any).type?.indexOf('grouped') >= 0 || this._chartOptions.type === 'column') {
          selectOptions = { groupName: 'ref', groupValue: ref };
        } else {
          selectOptions = { fieldName: 'ref', fieldValue: ref };
        }

        this.chart?.setSelected(selectOptions);
      }
    });
  }

  setSelectDataIndex(selectIndex: number) {
    if (this.jQueryElement) {
      const dataArray = this._chartOptions.dataset || [];
      if (this._chartOptions.type === 'pie' || this._chartOptions.type === 'donut') {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < dataArray.length; i++) {
          const dataNode = dataArray[i];
          for (let j = 0; j < dataNode.data.length; j++) {
            const data = dataNode.data[j];
            if (selectIndex === j) {
              data.selected = true;
            } else {
              delete data.selected;
            }
          }
        }
      } else {
        for (let i = 0; i < dataArray.length; i++) {
          const data = dataArray[i];
          if (selectIndex === i) {
            data.selected = true;
          } else {
            delete data.selected;
          }
        }
      }
    }
  }
}
