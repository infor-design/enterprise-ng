import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: '[soho-swipe-action]', // eslint-disable-line
  template: `
    <div class="swipe-container">
      <ng-content></ng-content>
    </div>`,
})
export class SohoSwipeActionComponent implements AfterViewInit, OnDestroy {

  /** Options */
  private swipeaction?: SohoSwipeActionStatic | null;
  private jQueryElement!: JQuery | undefined;

  @HostBinding('class.swipe-action') get isSwipeAction() {
    return true;
  }

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialize the component
      this.jQueryElement.swipeaction();
    });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.swipeaction) {
        this.swipeaction.destroy();
        this.swipeaction = null;
      }
    });
  }

  public updated(settings: any): SohoSwipeActionComponent {
    this.ngZone.runOutsideAngular(() => this.swipeaction?.updated(settings));
    return this;
  }
}
