import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import 'ids-enterprise-wc/components/ids-tag/ids-tag';
import type IdsTag from 'ids-enterprise-wc/components/ids-tag/ids-tag';
import { IdsColorValue } from 'ids-enterprise-wc/utils/ids-color-utils/ids-color-utils';

/**
 * Support Tag types. Leaving the value off the element displays the element in it's default state.
 *
 * `error` displayed as an error (for example with a red background). (danger deprecated)
 * `success` displayed to mean correct or valid (for example with a green background). (good deprecated)
 * `warning` displayed as an warning (for example with a orange background).
 * `caution` displayed as an caution (for example with a yellow background). (alert deprecated)
 * `secondary` displayed as grey - like a secondary button.
 */

// These are changed
// Was:
// danger / error / warning / alert / caution / info / success / good
// Now:
// error / warning / caution / info / success
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | undefined;
const tagsMapped = {
  'danger': 'error',
  'error': 'error',
  'warning': 'warning',
  'alert': 'caution',
  'caution': 'caution',
  'info': 'info',
  'success': 'success',
  'good': 'success',
  'secondary': 'secondary'
};

// This is not longer supposed to be a component
@Component({
  selector: '[soho-tag-list]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTagListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tag-list') get isTagList() {
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
    private ngZone: NgZone) { }

  ngAfterViewInit() {
    // Call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Add event handlers for the outer tag list.
      this.jQueryElement
        .on('aftertagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onAfterTagRemove(e, tag));
      this.jQueryElement
        .on('beforetagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onBeforeTagRemove(e, tag));
    });
  }

  private onAfterTagRemove(e: SohoTagAfterRemoveEvent, tag: SohoTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.afterRemove.next(e)
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

/**
 * Angular Support for elements styled as SohoXi tags.  The styling can be
 * controlled using the additional tag type, specified on element.
 *
 * They can be mixed in with other elements like lists, grids and search fields.
 *
 *<pre>
 * {@code
 * <span soho-tag='error'>#Error</span>
 * }
 *</pre>
 *
 * @export
 */

@Component({
  selector: '[soho-tag]', // eslint-disable-line
  template: '<ids-tag><ng-content></ng-content></ids-tag>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTagComponent implements AfterViewInit, OnDestroy {
  // -------------------------------------------
  // Supported tag types.
  // -------------------------------------------

  static ALERT: SohoTagType = 'alert';
  static GOOD: SohoTagType = 'good';
  static SECONDARY: SohoTagType = 'secondary';
  static ERROR: SohoTagType = 'error';
  static INFO: SohoTagType = 'info';
  static DEFAULT: SohoTagType = undefined;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Fired before a tag item is removed.
   */
  @Output() beforeTagRemove = new EventEmitter<SohoTagBeforeRemoveEvent>();

  /**
   * Fired after a tag item is removed.
   */
  @Output() click = new EventEmitter<SohoTagAfterRemoveEvent>();

  /** Options. */
  private options: SohoTagOptions = {};

  @HostBinding('class.tag') get isTag() {
    return true;
  }

  @HostBinding('class.alert')
  get alert() {
    return this.tagType === SohoTagComponent.ALERT;
  }

  @HostBinding('class.good')
  get good() {
    return this.tagType === SohoTagComponent.GOOD;
  }

  @HostBinding('class.secondary')
  get secondary() {
    return this.tagType === SohoTagComponent.SECONDARY;
  }

  @HostBinding('class.error')
  get error() {
    return this.tagType === SohoTagComponent.ERROR;
  }

  @HostBinding('class.info')
  get info() {
    return this.tagType === SohoTagComponent.INFO;
  }

  @HostBinding('class.is-linkable') @Input() isClickable?: boolean;

  @HostBinding('class.is-dismissible') @Input() isDismissible?: boolean;

  /**
   * Allow override of element name, to match the component name.
   */
  @Input('soho-tag') set sohoTag(type: SohoTagType) {
    if (type !== undefined) console.log('soho-tag', tagsMapped[type] || 'none');
    if (!type) {
      type = SohoTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;

    if (this.tagComponent)
      this.tagComponent!.color = type === undefined ? '' : tagsMapped[type] as IdsColorValue;
  }

  private tagType: SohoTagType;

  // This would break
  private jQueryElement?: JQuery;

  // This would break
  tag?: SohoTag | null;

  // Made a new one
  tagComponent?: IdsTag | null;

  /**
   * Creates an instance of SohoTagComponent.
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone) { }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      // This would break
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the tag control
      // this.jQueryElement.tag(this.options);

      // extract the api
      //  this.tag = this.jQueryElement.data('tag');
      // this.tag = this.element.nativeElement.parentNode;
      // document.createElement('ids-tag') as any;

      this.element.nativeElement.setAttribute('class', '');
      this.tagComponent = this.element.nativeElement.querySelector('ids-tag') as IdsTag;
      this.tagComponent.color = this.tagType === undefined ? '' : tagsMapped[this.tagType] as IdsColorValue;

      // this.jQueryElement
      //  .on('click', (e: JQuery.TriggeredEvent) => this.onClick(e));
      // Can we change this / e: JQuery.TriggeredEvent
      this.tagComponent.onEvent('click', (e: CustomEvent) => this.onClick(e));

      if (parent) {
        // TODO: Solve this / check history for the issue
        // this.element.nativeElement.parentNode?.on('beforetagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onBeforeTagRemove(e, tag));
      }
    });
  }

  private onBeforeTagRemove(event: SohoTagBeforeRemoveEvent, tag: SohoTag) {
    this.ngZone.run(() => {
      event.tag = tag;
      this.beforeTagRemove.next(event)
    });
  }

  private onClick(event: CustomEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.ngZone.run(() =>
      this.click.next(event as any));
    return false;
  }

  /**
   * The settings have been updated.
   */
  public updated(): void {
    // TODO: Update Each Setting on tagComponent
  }

  /**
   * Destroys the component.
   *
   *
   */
  ngOnDestroy() {
    // Will not doing this have memory leaks
  }
}
