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

  @HostBinding('attr.data-trackdirty') get trackDirtyAttr() { return true; };

  /**
   * Called when element value is different from original value
   */
  @Output() dirty: EventEmitter<SohoTrackDirtyEvent> = new EventEmitter<SohoTrackDirtyEvent>();
  /**
   * Called when element value is same as original value
   */
  @Output() pristine: EventEmitter<SohoTrackDirtyEvent> = new EventEmitter<SohoTrackDirtyEvent>();

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

    this.trackDirty = this.jQueryElement.data('trackdirty');
  }

  ngOnDestroy() {
    if (this.trackDirty) {
// TODO: waiting on SOHO-4819
//      this.trackDirty.destroy();
      this.trackDirty = null;
    }
  }
}
