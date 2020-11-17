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
  selector: '[soho-bullet]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoBulletComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
      this.updateRequired = true;
    }
  }

  /** true|false - will do or not do the animation and 'initial' will do only first time the animation. */
  @Input() set animate(value: any) {
    this.options.animate = value;

    if (this.bullet) {
      this.bullet.settings.animate = value;
      this.updateRequired = true;
    }
  }

  /** If true, the component will not resize when resizing the page. There is tooltip values provided.
   * It will not be shown. If you still want lines at the lower breakpoint you can set this to true */
  @Input() set redrawOnResize(value: boolean) {
    this.options.redrawOnResize = value;

    if (this.bullet) {
      this.bullet.settings.redrawOnResize = value;
      this.updateRequired = true;
    }
  }

  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() contextmenu: EventEmitter<Object> = new EventEmitter<Object[]>();

  private jQueryElement: JQuery;
  private bullet: SohoBullet;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.options.type = 'bullet';
      this.jQueryElement.chart(this.options);
      this.bullet = this.jQueryElement.data('bullet');

      // Setup the events
      this.jQueryElement.on('rendered', (...args) =>
        this.ngZone.run(() => this.rendered.emit(args)));
      this.jQueryElement.on('contextmenu', (...args) =>
        this.ngZone.run(() => this.contextmenu.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.bullet && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.bullet.updated(this.bullet.settings));
      this.updateRequired = false;
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => {
      this.options.type = 'bullet';
      this.jQueryElement.chart(this.options);
      this.bullet = this.jQueryElement.data('bullet');
    });
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.bullet) {
        this.bullet.destroy();
        this.bullet = null;
      }
    });
  }
}
