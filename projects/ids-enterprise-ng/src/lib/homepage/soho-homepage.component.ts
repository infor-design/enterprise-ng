import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'div[soho-homepage]', // eslint-disable-line
  template: `<div class="content"><ng-content></ng-content></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHomePageComponent implements AfterViewInit, OnDestroy {

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output() resize = new EventEmitter<SohoHomePageEvent>();
  @Output() resizecard = new EventEmitter<SohoHomePageEditEvent>();
  @Output() reordercard = new EventEmitter<SohoHomePageEditEvent>();
  @Output() removecard = new EventEmitter<SohoHomePageEditEvent>();

  @Input() set homePageOptions(homePageOptions: SohoHomePageOptions) {
    this._homePageOptions = homePageOptions;
  }
  get homePageOptions(): SohoHomePageOptions {
    return this._homePageOptions;
  }

  /**
   * Whether to animate widget placement
   */
  @Input() set animate(animate: boolean | undefined) {
    this._homePageOptions.animate = animate;
    if (this.homepage) {
      this.homepage.settings.animate = animate;
    }
  }

  get animate(): boolean | undefined {
    return this._homePageOptions.animate;
  }

  /**
   * Sets the maximum number of widget columns
   */
  @Input() set columns(columns: number | undefined) {
    this._homePageOptions.columns = columns;
    if (this.homepage) {
      this.homepage.settings.columns = columns;
    }
  }

  get columns(): number | undefined {
    return this._homePageOptions.columns;
  }

  /**
   * Set edit for rearranging/reordering cards.
   */
  @Input() set editing(editing: boolean | undefined) {
    this._homePageOptions.editing = editing;
    if (this.homepage) {
      this.homepage.setEdit((editing as any));
    }
  }

  get editing(): boolean | undefined {
    return this._homePageOptions.editing;
  }

  /**
   * Specify the speed at which an animation progresses at different points within the animation.
   */
  @Input() set easing(easing: EasingType | undefined) {
    this._homePageOptions.easing = easing;
    if (this.homepage) {
      this.homepage.settings.easing = easing;
    }
  }

  get easing(): EasingType | undefined {
    return this._homePageOptions.easing;
  }

  /**
   * Sets gutter size in between widgets
   */
  @Input() set gutterSize(gutterSize: number | undefined) {
    this._homePageOptions.gutterSize = gutterSize;
    if (this.homepage) {
      this.homepage.settings.gutterSize = gutterSize;
    }
  }

  get gutterSize(): number | undefined {
    return this._homePageOptions.gutterSize;
  }

  /**
   * Sets the default widget width in pixels
   */
  @Input() set widgetWidth(widgetWidth: number | undefined) {
    this._homePageOptions.widgetWidth = widgetWidth;
    if (this.homepage) {
      this.homepage.settings.widgetWidth = widgetWidth;
    }
  }

  get widgetWidth(): number | undefined {
    return this._homePageOptions.widgetWidth;
  }

  /**
   * Sets the default widget height in pixels
   */
  @Input() set widgetHeight(widgetHeight: number | undefined) {
    this._homePageOptions.widgetHeight = widgetHeight;
    if (this.homepage) {
      this.homepage.settings.widgetHeight = widgetHeight;
    }
  }

  get widgetHeight(): number | undefined {
    return this._homePageOptions.widgetHeight;
  }

  /**
   * Sets the widgets to smaller size
   */
  @Input() set useSmall(useSmall: boolean | undefined) {
    this._homePageOptions.useSmall = useSmall;
    if (this.homepage) {
      this.homepage.settings.useSmall = useSmall;
    }
  }

  get useSmall(): boolean | undefined {
    return this._homePageOptions.useSmall;
  }

  /**
   * this ...
   */
  @Input() set timeout(timeout: number | undefined) {
    this._homePageOptions.timeout = timeout;
    if (this.homepage) {
      this.homepage.settings.timeout = timeout;
    }
  }

  get timeout(): number | undefined {
    return this._homePageOptions.timeout;
  }

  /**
   * Event fired before a card is removed
   *
   * @param beforeSelectFunction Function callback
   */
  @Input() set onBeforeRemoveCard(beforeSelectFunction: SohoHomePageBeforeRemoveCardFunction | undefined) {
    this._homePageOptions.onBeforeRemoveCard = beforeSelectFunction;
    if (this.homepage) {
      this.homepage.settings.onBeforeRemoveCard = beforeSelectFunction;
    }
  }

  get onBeforeRemoveCard(): SohoHomePageBeforeRemoveCardFunction | undefined {
    if (this.homepage) {
      return this.homepage.settings.onBeforeRemoveCard;
    }
    return this._homePageOptions.onBeforeRemoveCard;
  }

  @HostBinding('class.homepage') isHomepage = true;

  // Reference to the jQuery element.
  private jQueryElement?: JQuery;

  // Reference to the annotated SoHoXi control
  private homepage?: SohoHomePageStatic | null;

  private _homePageOptions: SohoHomePageOptions = {};

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  /**
   * Reset columns to their defaults (used on restore menu item).
   */
  refresh(animate?: boolean): void {
    return this.ngZone.runOutsideAngular(() => {
      this.homepage?.refresh(animate);
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Initialise the SoHoXi control.
      this.jQueryElement.homepage(this._homePageOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case is 'homepage'.
      this.homepage = this.jQueryElement.data('homepage');

      this.jQueryElement
        .on('resize', (_e: JQuery.TriggeredEvent, columns: number, metadata: object) => this.onResize(columns, metadata))
        .on('resizecard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onResizeCard(card, metadata))
        .on('reordercard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onReorderCard(card, metadata))
        .on('removecard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onRemoveCard(card, metadata));
    });
  }

  onResize(columns: number, metadata: object) {
    const event: SohoHomePageEvent = { columns: undefined, metadata: undefined };
    event.columns = columns;
    event.metadata = metadata;

    this.ngZone.run(() => {
      this.resize.emit(event);
    });
  }

  onResizeCard(card: JQuery, metadata: object) {
    const event: SohoHomePageEditEvent = { homepage: this, card, metadata };

    this.ngZone.run(() => {
      this.resizecard.emit(event);
    });
  }

  onReorderCard(card: JQuery, metadata: object) {
    const event: SohoHomePageEditEvent = { homepage: this, card, metadata };

    this.ngZone.run(() => {
      this.reordercard.emit(event);
    });
  }

  onRemoveCard(card: JQuery, metadata: object) {
    const event: SohoHomePageEditEvent = { homepage: this, card, metadata };

    this.ngZone.run(() => {
      this.removecard.emit(event);
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.homepage) {
        this.homepage.destroy();
        this.homepage = null;
      }
    });
  }
}
