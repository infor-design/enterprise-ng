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
  selector: '[soho-bullet]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoBulletComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoBulletOptions = {};

  @HostBinding('class.chart-container') get isBullet() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: SohoDatasetOptions) {
    this.options.dataset = dataset;

    if (this.bullet) {
      this.bullet.settings.dataset = dataset;
      this.bullet.updated(this.bullet.settings);
    }
  }

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  @Input() set animate(value: any) {
    this.options.animate = value;

    if (this.bullet) {
      this.bullet.settings.animate = value;
      this.bullet.updated(this.bullet.settings);
    }
  }

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
    * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.bullet) {
      this.bullet.settings.redrawOnResize = value;
      this.bullet.updated(this.bullet.settings);
    }
  }

  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private bullet: SohoBullet;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.options.type = 'bullet';
    this.jQueryElement.chart(this.options);
    this.bullet = this.jQueryElement.data('bullet');

    // Setup the events
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.bullet) {
      this.bullet.destroy();
      this.bullet = null;
    }
  }

}
