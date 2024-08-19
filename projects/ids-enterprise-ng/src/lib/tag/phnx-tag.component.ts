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
  ViewEncapsulation,
  Input,
} from '@angular/core';

import Tag from './phnx-tag';
import { PhnxTagType } from './phnx-tag-list.component';

/**
 * Phnx Tag Angular Component
 */
@Component({
  selector: '[soho-tag], [phnx-tag], phnx-tag',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './phnx-tag.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PhnxTagComponent implements AfterViewInit, OnDestroy {
  // -------------------------------------------
  // Supported tag types.
  // -------------------------------------------

  static ALERT: PhnxTagType = 'alert';

  static GOOD: PhnxTagType = 'good';

  static SECONDARY: PhnxTagType = 'secondary';

  static ERROR: PhnxTagType = 'error';

  static INFO: PhnxTagType = 'info';

  static DEFAULT: PhnxTagType = undefined;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Fired before a tag item is removed.
   */
  @Output() beforeTagRemove = new EventEmitter<PhnxTagBeforeRemoveEvent>();

  /**
   * Fired after a tag item is removed.
   */
  @Output() click = new EventEmitter<any>();

  /** Options. */
  private options: PhnxTagOptions = {};

  @HostBinding('class.phnx-tag') get isTag() {
    return true;
  }

  @HostBinding('class.alert')
  get alert() {
    return this.tagType === PhnxTagComponent.ALERT;
  }

  @HostBinding('class.good')
  get good() {
    return this.tagType === PhnxTagComponent.GOOD;
  }

  @HostBinding('class.secondary')
  get secondary() {
    return this.tagType === PhnxTagComponent.SECONDARY;
  }

  @HostBinding('class.error')
  get error() {
    return this.tagType === PhnxTagComponent.ERROR;
  }

  @HostBinding('class.info')
  get info() {
    return this.tagType === PhnxTagComponent.INFO;
  }

  @HostBinding('class.is-linkable') @Input() isClickable?: boolean;

  @HostBinding('class.is-dismissible') @Input() isDismissible?: boolean;

  @HostBinding('class.is-disabled') @Input() isDisabled?: boolean | undefined;

  @Input('phnx-tag') set phnxTag(type: PhnxTagType) {
    if (!type) {
      type = PhnxTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;
    this.updated(this.options);
  }

  @Input('soho-tag') set sohoTag(type: PhnxTagType) {
    if (!type) {
      type = PhnxTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;
    this.updated(this.options);
  }

  @Input('type') set type(type: PhnxTagType) {
    if (!type) {
      type = PhnxTagComponent.DEFAULT;
    }
    this.tagType = type;
    this.options.style = type;
    this.updated(this.options);
  }

  private tagType: PhnxTagType;

  private jQueryElement?: JQuery;

  tag?: PhnxTag | null;

  /**
   * Creates an instance of PhnxTagComponent.
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    // call outside the angular zone so change detection isn't triggered
    this.ngZone.runOutsideAngular(() => {
      this.tag = new Tag(this.element.nativeElement, this.options as any);

      const tagElem = this.tag?.element;
      const parent = tagElem ? jQuery(tagElem).parent() : null;

      $(tagElem).on('click-internal', (e: JQuery.TriggeredEvent) => this.onClick(e));

      if (parent) {
        parent.on('beforetagremove', (e: JQuery.TriggeredEvent, tag: PhnxTag) => this.onBeforeTagRemove(e, tag));
      }
    });
  }

  private onBeforeTagRemove(event: PhnxTagBeforeRemoveEvent, tag: PhnxTag) {
    this.ngZone.run(() => {
      event.tag = tag;
      this.beforeTagRemove.next(event);
    });
  }

  private onClick(event?: JQuery.TriggeredEvent) {
    this.ngZone.run(() => this.click.next(event));
  }

  /**
   * Enables or disables the tag
   */
  @Input() set disabled(value: boolean | undefined) {
    this.isDisabled = true;
    (this.options as any).disabled = true;
  }

  get disabled() {
    return this.isDisabled;
  }

  /**
   * The settings have been updated.
   */
  public updated(options?: any): void {
    if (this.tag) {
      this.ngZone.runOutsideAngular(() => this.tag?.updated(options || this.options));
    }
  }

  /**
   * Destroys the component.
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
