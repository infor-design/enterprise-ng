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
  selector: '[soho-treemap]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoTreemapComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  /** If false, the component will not resize when resizing the page. */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.treemap) {
      this.treemap.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  /** The margins of the SVG, which you may want to adjust depending on text location. */
  @Input() set margin(value: Object[]) {
    this.options.margin = value;

    if (this.treemap) {
      this.treemap.settings.margin = value;
      this.updateRequired = true;
    }
  }

  /** An array of colors used in sequence from front to end of the array. */
  @Input() set colors(value: Array<any>) {
    this.options.colors = value;

    if (this.treemap) {
      this.treemap.settings.colors = value;
      this.updateRequired = true;
    }
  }

  /** If false then the percentage wont be shown in the blocks. */
  @Input() set showLabel(value: boolean) {
    this.options.showLabel = value;

    if (this.treemap) {
      this.treemap.settings.showLabel = value;
      this.updateRequired = true;
    }
  }

  /** The d3 formatter function for the value label. */
  @Input() set labelFormatter(value: string) {
    this.options.labelFormatter = value;

    if (this.treemap) {
      this.treemap.settings.labelFormatter = value;
      this.updateRequired = true;
    }
  }

  /** If true then the first name will be used for the title area. */
  @Input() set showTitle(value: boolean) {
    this.options.showTitle = value;

    if (this.treemap) {
      this.treemap.settings.showTitle = value;
      this.updateRequired = true;
    }
  }

  /** An empty message will be displayed when there is no chart data. */
  @Input() set emptyMessage(value: SohoEmptyMessageOptions) {
    this.options.emptyMessage = value;

    if (this.treemap) {
      this.treemap.settings.emptyMessage = value;
      this.updateRequired = true;
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(value: Array<Object> | Object) {
    this.options.attributes = value;

    if (this.treemap) {
      this.treemap.settings.attributes = value;
      this.updateRequired = true;
    }
  }

  /** Events */
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement?: JQuery;
  private treemap?: SohoTreemap | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // this.options.type = 'treemap';
      this.jQueryElement.treemap(this.options);
      this.treemap = this.jQueryElement.data('treemap');

      // Setup the events
      this.jQueryElement.on('rendered', (...args) =>
        this.ngZone.run(() => this.rendered.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.treemap && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.treemap?.updated(this.treemap.settings));
      this.updateRequired = false;
    }
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.treemap) {
        this.treemap.destroy();
        this.treemap = null;
      }
    });
  }
}
