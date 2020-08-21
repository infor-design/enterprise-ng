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
  selector: '[soho-rating]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoRatingComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private settings: SohoRatingOptions = {};

  @HostBinding('class.rating') get isRating() {
    return true;
  }

  private jQueryElement: JQuery;
  private rating: SohoRating;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.rating(this.settings);
    this.rating = this.jQueryElement.data('rating');
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.rating) {
      this.rating.destroy();
      this.jQueryElement.off();
      this.rating = null;
    }
  }
}
