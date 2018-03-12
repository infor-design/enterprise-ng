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
  selector: '[soho-radar]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoRadarComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoRadarOptions = {};

  @HostBinding('class.chart-container') get isRadar() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.radar) {
      this.radar.settings.dataset = dataset;
      this.radar.updated(this.radar.settings);
    }
  }

  /* Events*/
  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() rendered: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement: JQuery;
  private radar: SohoRadar;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.options.type = 'radar';
    this.jQueryElement.chart(this.options);
    this.radar = this.jQueryElement.data('radar');

    // Setup the events
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.radar) {
      this.radar.destroy();
      this.radar = null;
    }
  }

  /** Reinit blockgrid settings */
  public updated(settings: any): SohoRadarComponent {
    this.radar.updated(settings);
    return this;
  }

}
