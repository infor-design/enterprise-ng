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

/**
 * Support Tag types.
 *
 * `error` displayed as an error (for example with a red background).
 * `good` displayed to mean correct or valid (for example with a green background).
 * `alert` displayed as an alert (for example with a yellow background).
 * `secondary` displayed as grey - like a secondary button.
 *
 * Leaving the value off the element displays the element in it's default state.
 *
 * Note: You should not use color alone to indicate state, this should be either
 * supplemented with off-screen labels or visual labels near the element explaining the state.
 */
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | undefined;

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
 *
 *
 *
 */

@Component({
  selector: '[soho-tag]', // eslint-disable-line
  template: '<ng-content></ng-content>',
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
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('soho-tag') set sohoTag(type: SohoTagType) {
    if (!type) {
      type = SohoTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;
    this.updated();
  }

  private tagType: SohoTagType;

  private jQueryElement?: JQuery;

  tag?: SohoTag | null;

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
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the tag control
      this.jQueryElement.tag(this.options);

      // extract the api
      this.tag = this.jQueryElement.data('tag');

      // @todo - add event binding control so we don't bind if not required.
      // this.jQueryElement
      const tagElem = this.tag?.element;
      const parent = tagElem ? jQuery(tagElem).parent() : null;

      this.jQueryElement
        .on('click', (e: JQuery.TriggeredEvent) => this.onClick(e));

      if (parent) {
        parent.on('beforetagremove', (e: JQuery.TriggeredEvent, tag: SohoTag) => this.onBeforeTagRemove(e, tag));
      }
    });
  }

  private onBeforeTagRemove(event: SohoTagBeforeRemoveEvent, tag: SohoTag) {
    this.ngZone.run(() => {
      event.tag = tag;
      this.beforeTagRemove.next(event)
    });
  }

  private onClick(event: JQuery.TriggeredEvent) {
    this.ngZone.run(() =>
      this.click.next(event));
  }

  /**
   * The settings have been updated.
   */
  public updated(): void {
    if (this.tag) {
      this.ngZone.runOutsideAngular(() => this.tag?.updated(this.options));
    }
  }

  /**
   * Destroys the component.
   *
   *
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      // Destroy any widget resources.
      if (this.tag) {
        this.tag.destroy();
        this.tag = null;
      }
    });
  }
}
