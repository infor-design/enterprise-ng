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
import 'ids-enterprise-wc/components/ids-icon/ids-icon';
import type IdsTag from 'ids-enterprise-wc/components/ids-tag/ids-tag';
import { IdsColorValue } from 'ids-enterprise-wc/utils/ids-color-utils/ids-color-utils';
import { SohoTagAfterRemoveEvent, SohoTagBeforeRemoveEvent, SohoTagOptions } from 'projects/ids-enterprise-typings/lib/tag/soho-tag';

/**
 * Support Tag types:
 * `error` displayed as an error (for example with a red background). (danger deprecated)
 * `success` displayed to mean correct or valid (for example with a green background). (good deprecated)
 * `warning` displayed as an warning (for example with a orange background).
 * `caution` displayed as an caution (for example with a yellow background). (alert deprecated)
 * `secondary` displayed as white - sort of like a secondary button.
 *
 * Leaving the value off the element displays the element in it's default state.
 */
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | undefined;
const tagsMapped = {
  'danger': 'error',
  'error': 'error',
  'warning': 'warning',
  'alert': 'warning',
  'caution': 'caution',
  'info': 'info',
  'success': 'success',
  'good': 'success',
  'secondary': 'secondary'
};

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
      // Add event handlers for the outer tag list.
      //this.jQueryElement
      //  .on('aftertagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onAfterTagRemove(e, tag));
      this.element.nativeElement.addEventListener('aftertagremove', (e: CustomEvent) => {
        console.log('aftertagremove', e);
        this.onAfterTagRemove(e as any, e.target as any);
      });
      //  .on('beforetagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onBeforeTagRemove(e, tag));
    });
  }

  private onAfterTagRemove(e: SohoTagAfterRemoveEvent, tag: IdsTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.afterRemove.next(e)
    });
  }

  private onBeforeTagRemove(e: SohoTagBeforeRemoveEvent, tag: IdsTag) {
    this.ngZone.run(() => {
      e.tag = tag;
      this.beforeRemove.next(e);
    });
  }

  ngOnDestroy() {
  }
}

/**
 * Angular Support for elements styled as Ids tags.  The styling can be
 * controlled using the additional tag type, specified on element.
 *
 *<pre>
 * <span soho-tag="error">#Error</span>
 * <ids-tag type="error">#Error</ids-tag>
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
   *
   * @todo remove usage of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter<CustomEvent>();

  /** Options. */
  private options: SohoTagOptions = {};

  @Input() isClickable?: boolean;
  @Input() isDismissible?: boolean;

  /**
   * Allow override of element name, to match the component name.
   */
  @Input('soho-tag') set sohoTag(type: SohoTagType) {
    if (!type) {
      type = SohoTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;
    if (this.tag) this.tag!.color = type === undefined ? '' : tagsMapped[type] as IdsColorValue;
  }

  private tagType: SohoTagType;

  tag?: IdsTag | null;

  /**
   * Creates an instance of SohoTagComponent.
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Map The API
      this.tag = this.element.nativeElement.querySelector('ids-tag') as IdsTag;;
      this.tag.color = this.tagType === undefined ? '' : tagsMapped[this.tagType] as IdsColorValue;
      this.tag.dismissible = this.isDismissible || false;
      this.tag.clickable = this.isClickable || false;
      this.tag.onEvent('click', (e: CustomEvent) => this.onClick(e));
      this.tag.onEvent('beforetagremove', this.tag, (e: SohoTagBeforeRemoveEvent) => this.onBeforeTagRemove(e));
      this.tag.onEvent('aftertagremove', this.tag, (e: SohoTagAfterRemoveEvent) => this.onAfterTagRemove(e));

      // Prevent Redirects
      this.tag.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        return false;
      });
    });
  }

  private onBeforeTagRemove(event: SohoTagBeforeRemoveEvent) {
    this.ngZone.run(() => {
      (event as any).tag = this.tag;
      (event as any).sohoTag = this;
      this.beforeTagRemove.next(event);
    });
  }

  private onAfterTagRemove(event: SohoTagAfterRemoveEvent) {
    this.ngZone.run(() => {
      (event as any).tag = this.tag;
      (event as any).tag.settings.content = this.tag?.innerHTML;
      (event as any).sohoTag = this;
      this.beforeTagRemove.next(event);
    });
  }

  private onClick(event: CustomEvent) {
    this.ngZone.run(() =>
      this.click.next(event));
  }

  set settings(settings: SohoTagOptions) {
    for (const key in settings) {
      if (settings.hasOwnProperty(key) && (this.tag as any)[key]) {
        (this.tag as any)[key] = (settings as any)[key];
        (this.options as any)[key] = (settings as any)[key];
      }
    }
  }

  get settings(): SohoTagOptions {
    return this.options;
  }

  /**
   * The settings have been updated.
   * @deprecated no need to call this
   */
  public updated(): void {
  }

  /**
   * Destroys the component.
   * @deprecated no need to call this as component will destroy on disconnnected callback
   */
  ngOnDestroy() {
  }
}
