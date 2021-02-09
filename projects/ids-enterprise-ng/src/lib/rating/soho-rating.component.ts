import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: '[soho-rating]', // eslint-disable-line
  template: '<ng-content></ng-content>'
})

export class SohoRatingComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private settings: SohoRatingOptions = {};

  @HostBinding('class.rating') get isRating() {
    return true;
  }

  private jQueryElement?: JQuery;
  private rating?: SohoRating | null;
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
      this.jQueryElement?.off();
      this.rating = null;
    }
  }

  /** Make control read only **/
  public readonly(): void {
    if (this.rating) {
      this.rating.readonly();
    }
  }

  /** Enable the control **/
  public enable(): void {
    if (this.rating) {
      this.rating.enable();
    }
  }

  /** Gets the current value of the control. If the control doesn't exist, will return -1 */
  public get currentValue() {
    if (this.rating) {
      return this.rating.val();
    }
    return -1;
  }

  /** Sets the value for the control */
  public set currentValue(newValue: number) {
    if (this.rating) {
      this.rating.val(newValue);
    }
  }
}
