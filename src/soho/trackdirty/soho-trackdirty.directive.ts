import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[soho-trackdirty]'
})
export class SohoTrackDirtyDirective implements AfterViewInit, OnDestroy {

  @HostBinding('attr.data-trackdirty') get trackDirtyAttr() { return true; }

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
  private jQueryElement: JQuery;
  private trackDirty: TrackDirtyStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // no options available for control
    this.jQueryElement.trackdirty();

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('dirty', (event: SohoTrackDirtyEvent) => this.dirty.emit(event));
    this.jQueryElement.on('pristine', (event: SohoTrackDirtyEvent) => this.pristine.emit(event));
    this.jQueryElement.on('afterresetdirty', (event: SohoTrackDirtyEvent) => this.afterResetDirty.emit(event));

    // returns a boolean, not an object
    this.trackDirty = this.jQueryElement.data('trackdirty');
  }

  ngOnDestroy() {
    if (this.trackDirty) {
     this.trackDirty.destroy();
      this.trackDirty = null;
    }
  }

  changeDirty() {
    if (this.trackDirty) {
      this.jQueryElement.trigger('change.dirty');
    }
  }

  resetDirty() {
    if (this.trackDirty) {
      this.jQueryElement.trigger('resetdirty.dirty');
    }
  }

  updated() {
    if (this.trackDirty) {
      this.trackDirty.updated();
    }
  }
}
