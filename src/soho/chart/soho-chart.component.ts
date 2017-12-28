import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy, EventEmitter, Output,
} from '@angular/core';

@Component({
  selector: 'div[soho-chart]', // tslint:disable-line
  template: ' '
})

export class SohoChartComponent implements AfterViewInit, OnDestroy {

  @Input() set chartOptions(chartOptions: SohoChartOptions) {
      this._chartOptions = chartOptions;
      if (this.jQueryElement) {
        this.updated();
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
      this.updated();
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
      this._chartOptions['labels'] = {hideLabels: !hideLabels};
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

  @Output() contextmenu = new EventEmitter<ChartEvent>();

  // An internal chartOptions object that gets updated by using
  // the component's Inputs()
  private _chartOptions: SohoChartOptions = {animate: true};

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the soho chart control api.
  private chart: SohoChartStatic;

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    this.jQueryElement.chart(this._chartOptions);

    this.chart = this.jQueryElement.data('chart');

    this.jQueryElement.on('selected', (event: JQuery.Event, ui: any, data: any) => {
      this.selected.emit({ event, ui, data });
    }).on('unselected', (event: JQuery.Event, ui: any, data: any) => {
      this.unselected.emit({ event, ui, data });
    }).on('rendered', (event: JQuery.Event, ui: any, data: any) => {
      this.rendered.emit({ event, ui, data });
    }).on('contextmenu', (event, ui, data) => {
      this.contextmenu.emit({ event, ui, data });
    });
  }

  ngOnDestroy() {
  }

  public getChartOptions(): SohoChartOptions {
    return this._chartOptions;
  }

  updated() {
    this.jQueryElement.chart(this._chartOptions);
    this.chart = this.jQueryElement.data('chart');
  }

  getSelected() {
    if (this.jQueryElement) {
      return this.chart.getSelected();
    }
    return undefined;
  }

  setSelectRef(ref: any): void {
    if (this.jQueryElement) {
      let selectOptions: ChartSelectionOptions;
      if (this._chartOptions.type.indexOf('grouped') >= 0 || this._chartOptions.type === 'column') {
        selectOptions = {groupName: 'ref', groupValue: ref};
      } else {
        selectOptions = {fieldName: 'ref', fieldValue: ref};
      }

      this.chart.setSelected(selectOptions);
    }
  }

  setSelectDataIndex(selectIndex: number) {
    if (this.jQueryElement) {
      const dataArray = this._chartOptions.dataset;
      if (this._chartOptions.type === 'pie' || this._chartOptions.type === 'donut') {
        for (let i = 0; i < dataArray.length; i++) {
          const dataNode = dataArray[ i ];
          for (let j = 0; j < dataNode.data.length; j++) {
            const data = dataNode.data[ j ];
            if (selectIndex === j) {
              data.selected = true;
            } else {
              delete data.selected;
            }
          }
        }
      } else {
        for (let i = 0; i < dataArray.length; i++) {
          const data = dataArray[ i ];
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
