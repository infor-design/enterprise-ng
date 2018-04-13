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
  selector: '[soho-circlepager]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoCirclepagerComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoCirclepagerOptions = {};

  @HostBinding('class.circlepager') get isCirclePager() {
    return true;
  }

  /** The number of slides to show in one view / pane. */
  @Input() set slidesToShow(value: number) {
    this.options.slidesToShow = value;

    if (this.circlepager) {
      this.circlepager.settings.slidesToShow = value;
      this.circlepager.updated(this.circlepager.settings);
    }
  }

  /** First showing slide/group, an 0-based integer */
  @Input() set startingSlide(value: number) {
    this.options.startingSlide = value;

    if (this.circlepager) {
      this.circlepager.settings.startingSlide = value;
      this.circlepager.updated(this.circlepager.settings);
    }
  }

  /** Setting loop: true will loop back after next/previous reached to end */
  @Input() set loop(value: boolean) {
    this.options.loop = value;

    if (this.circlepager) {
      this.circlepager.settings.loop = value;
      this.circlepager.updated(this.circlepager.settings);
    }
  }

  /** Events */
  @Output() rendered: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private circlepager: SohoCirclepager;
  constructor(private element: ElementRef) {}

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.circlepager(this.options);
    this.circlepager = this.jQueryElement.data('circlepager');

    // Setup the events
    this.jQueryElement.on('rendered', (...args) => this.rendered.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.circlepager) {
      this.circlepager.destroy();
      this.circlepager = null;
    }
  }
}
