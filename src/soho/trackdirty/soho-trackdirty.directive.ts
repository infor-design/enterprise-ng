import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[soho-trackdirty]'
})
export class SohoTrackDirtyDirective implements AfterViewInit, OnDestroy {
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
  private jQueryElement: any;
  private trackDirty: any;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.attr('data-trackdirty', 'true');

    // no options available for control
    this.jQueryElement.trackdirty();

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('dirty', (event: SohoTrackDirtyEvent) => this.dirty.emit(event));
    this.jQueryElement.on('pristine', (event: SohoTrackDirtyEvent) => this.pristine.emit(event));

    this.trackDirty = this.jQueryElement.data('trackDirty');
  }

  ngOnDestroy() {
    if (this.trackDirty) {
//      this.trackDirty.destroy();
      this.trackDirty = null;
    }
  }
}
