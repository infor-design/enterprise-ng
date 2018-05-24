import {
  Component,
  OnInit,
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
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | undefined;

@Component({
  selector: '[soho-tag-list]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTagListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tag-list') get isTagList() {
    return true;
  }

  /**
   * Fired after a tag item is removed.
   */
  @Output() afterRemove = new EventEmitter<SohoTagAfterRemoveEvent>();

  /**
   * The wrapped jQuery element.
   *
   * @private
   * @type {JQuery}
   * @memberof SohoTagListComponent
   */
  private jQueryElement: JQuery;

  /**
   * Creates an instance of SohoTagListComponent.
   *
   * @param {ElementRef} element wrapped element.
   * @param {NgZone} ngZone angular zone.
   * @memberof SohoTagListComponent
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
        .on('aftertagremove', (e: JQuery.Event) => this.onAfterTagRemove(e) );
    });
  }

  private onAfterTagRemove(e: JQuery.Event) {
    this.ngZone.run(() => {
      setTimeout(() => this.afterRemove.next(e), 1);
     });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
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
 * @export
 * @class SohoTagListComponent
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */

@Component({
  selector: '[soho-tag]', // tslint:disable-line
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
  static DEFAULT: SohoTagType = undefined;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Fired before a tag item is removed.
   */
  @Output() beforeRemove = new EventEmitter<SohoTagBeforeRemoveEvent>();

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

  @HostBinding('class.is-clickable') @Input() isClickable: boolean;

  @HostBinding('class.is-dismissible') @Input() isDismissible: boolean;

  @Input('soho-tag') set sohoTag(type: SohoTagType) {
    this.tagType = type ? type : SohoTagComponent.DEFAULT;
  }

  private tagType: SohoTagType;

  private jQueryElement: JQuery;

  private tag: SohoTag;

  /**
   * Creates an instance of SohoTagComponent.
   *
   * @param {ElementRef} element
   * @param {NgZone} ngZone
   * @memberof SohoTagComponent
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

      this.jQueryElement
        .on('beforetagremove', (e: JQuery.Event, element: HTMLElement) => this.onBeforeTagRemove(e, element) )
        .on('click', (e: JQuery.Event) => this.onClick(e) );
    });
  }

  private onBeforeTagRemove(event: JQuery.Event, element: HTMLElement) {
    this.ngZone.run(() => {
      setTimeout(() => this.beforeRemove.next(event), 1);
     });
  }

  private onClick(event: JQuery.Event) {
    this.ngZone.run(() => {
      setTimeout(() => this.click.next(event), 1);
    });
  }

  /**
   * The settings have been updated.
   */
  public updated(): void {
    if (this.tag) {
      this.ngZone.runOutsideAngular( () => this.tag.updated(this.options) );
    }
  }

  /**
   * Destroys the component.
   *
   * @memberof SohoTagComponent
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
      }

      // Destroy any widget resources.
      if (this.tag) {
        this.tag.destroy();
        this.tag = null;
      }
    });
  }
}
