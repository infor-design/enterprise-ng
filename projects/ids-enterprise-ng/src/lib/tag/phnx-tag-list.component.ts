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

import TagList from './phnx-tag.list';

/**
 * Phnx Tag Component
 */
export type PhnxTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | undefined;

@Component({
  selector: '[phnx-tag-list], phnx-tag-list', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.Emulated
})
export class PhnxTagListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.phnx-tag-list') get isTagList() {
    return true;
  }

  /**
   * Fired before a tag item is removed.
   */
  @Output() beforeRemove = new EventEmitter<PhnxTagBeforeRemoveEvent>();

  /**
   * Fired after a tag item is removed.
   */
  @Output() afterRemove = new EventEmitter<PhnxTagAfterRemoveEvent>();

  /**
   * The wrapped jQuery element.
   */
  private jQueryElement?: JQuery;

  /**
   * Creates an instance of PhnxTagListComponent.
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
    // isn't triggered by the phnx component.
    this.ngZone.runOutsideAngular(() => {
      this.tagList = new TagList(this.element.nativeElement, '');

      // Add event handlers for the outer tag list.
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement
        .on('aftertagremove', (e: JQuery.TriggeredEvent, tag: PhnxTag) => this.onAfterTagRemove(e, tag));
      this.jQueryElement
        .on('beforetagremove', (e: JQuery.TriggeredEvent, tag: PhnxTag) => this.onBeforeTagRemove(e, tag));
    });
  }

  private onAfterTagRemove(e: PhnxTagAfterRemoveEvent, tag: PhnxTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.afterRemove.next(e);
    });
  }

  private onBeforeTagRemove(e: PhnxTagBeforeRemoveEvent, tag: PhnxTag) {
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
