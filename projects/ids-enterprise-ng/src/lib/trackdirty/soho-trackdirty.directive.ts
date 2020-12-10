import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[soho-trackdirty]',
  exportAs: 'soho-trackdirty'
})
export class SohoTrackDirtyDirective implements AfterViewInit, OnDestroy {

  @HostBinding('attr.data-trackdirty') get trackDirtyAttr() {
 return true;
}

  /**
   * Called when element value is different from original value
   */
  @Output() dirty: EventEmitter<SohoTrackDirtyEvent> = new EventEmitter<SohoTrackDirtyEvent>();
  /**
   * Called when element value is same as original value
   */
  @Output() pristine: EventEmitter<SohoTrackDirtyEvent> = new EventEmitter<SohoTrackDirtyEvent>();
  /**
   * Called when the element has its original value reset to the current value
   */
  @Output() afterResetDirty: EventEmitter<SohoTrackDirtyEvent> = new EventEmitter<SohoTrackDirtyEvent>();

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private trackDirty?: TrackDirtyStatic | null;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // no options available for control
      this.jQueryElement.trackdirty();

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('dirty', (event: SohoTrackDirtyEvent) =>
        this.ngZone.run(() => this.dirty.emit(event)));

      this.jQueryElement.on('pristine', (event: SohoTrackDirtyEvent) =>
        this.ngZone.run(() => this.pristine.emit(event)));

      this.jQueryElement.on('afterresetdirty', (event: SohoTrackDirtyEvent) =>
        this.ngZone.run(() => this.afterResetDirty.emit(event)));

      // returns a boolean, not an object
      this.trackDirty = this.jQueryElement.data('trackdirty');
    });
  }

  ngOnDestroy() {
    if (this.trackDirty) {
      this.ngZone.runOutsideAngular(() => this.trackDirty?.destroy());
      this.trackDirty = null;
    }
  }

  changeDirty() {
    if (this.trackDirty) {
      this.ngZone.runOutsideAngular(() => this.jQueryElement?.trigger('change.dirty'));
    }
  }

  resetDirty() {
    if (this.trackDirty) {
      this.ngZone.runOutsideAngular(() => this.jQueryElement?.trigger('resetdirty.dirty'));
    }
  }

  updated() {
    if (this.trackDirty) {
      this.ngZone.runOutsideAngular(() => this.trackDirty?.updated());
    }
  }
}
