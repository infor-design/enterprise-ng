import {
  Component,
  HostBinding,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import TagList from './soho-tag.list';

/**
 * Soho Tag Component
 */
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | undefined;

@Component({
  selector: '[soho-tag-list]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.Emulated
})
export class SohoTagListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.soho-tag-list') get isTagList() {
    return true;
  }

  /**
   * Fired before a tag item is removed.
   */
  @Output() beforeRemove = new EventEmitter<SohoTagBeforeRemoveEvent>();

  /**
   * Fired after a tag item is removed.
   */
  @Output() afterRemove = new EventEmitter<SohoTagAfterRemoveEvent>();

  /**
   * The wrapped jQuery element.
   */
  private jQueryElement?: JQuery;

  /**
   * Creates an instance of SohoTagListComponent.
   *
   * @param element wrapped element.
   * @param ngZone angular zone.
   *
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  tagList?: TagList;

  ngAfterViewInit() {
    // Call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      this.tagList = new TagList(this.element.nativeElement, '');

      // Add event handlers for the outer tag list.
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement
        .on('aftertagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onAfterTagRemove(e, tag));
      this.jQueryElement
        .on('beforetagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onBeforeTagRemove(e, tag));
    });
  }

  private onAfterTagRemove(e: SohoTagAfterRemoveEvent, tag: SohoTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.afterRemove.next(e);
    });
  }

  private onBeforeTagRemove(e: SohoTagBeforeRemoveEvent, tag: SohoTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.beforeRemove.next(e);
    });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
    });
  }
}
