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
  EventEmitter
} from '@angular/core';

export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | undefined;

@Component({
  selector: '[soho-tag-list]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
export class SohoTagListComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tag-list') get isTagList() {
    return true;
  }

  /**
   * Fired after a tag item is removed.
   */
  @Output() afterRemove = new EventEmitter<SohoTagAfterRemoveEvent>();

  private jQueryElement: JQuery;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone) { }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.jQueryElement
        .on('aftertagremove', (e: JQuery.Event) => this.onAfterTagRemove(e) );
    });
  }

  private onAfterTagRemove(e: JQuery.Event) {
    this.ngZone.run(() => {
      setTimeout(() => this.afterRemove.next(e));
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

@Component({
  selector: '[soho-tag]', // tslint:disable-line
  template: '<ng-content></ng-content>'
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
      setTimeout(() => this.beforeRemove.next(event));
     });
  }

  private onClick(e: JQuery.Event) {
    this.ngZone.run(() => {
      setTimeout(() => this.click.next(e));
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
      this.tag.destroy();
      this.tag = null;
    });
  }
}
