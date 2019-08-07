/// <reference path="soho-homepage.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'div[soho-homepage]', // tslint:disable-line
  template: `<div class="content"><ng-content></ng-content></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHomePageComponent implements AfterViewInit, OnDestroy {

  @Input() maintainElementHeight: boolean;

  @Input() set homePageOptions(homePageOptions: SohoHomePageOptions) {
    this._homePageOptions = homePageOptions;
    if (this.jQueryElement) {
      // this.homepage.updated(); ???
    }
  }
  get homePageOptions(): SohoHomePageOptions {
    return this._homePageOptions;
  }

  /**
   * Sets the maximum number of widget columns
   */
  @Input() set columns(columns: number) {
    this._homePageOptions.columns = columns;
    if (this.homePage) {
      this.homePage.settings.columns = columns;
    }
  }

  get columns(): number {
    return this._homePageOptions.columns;
  }

  /**
   * Sets gutter size in between widgets
   */
  @Input() set gutterSize(gutterSize: number) {
    this._homePageOptions.gutterSize = gutterSize;
    if (this.homePage) {
      this.homePage.settings.gutterSize = gutterSize;
    }
  }

  get gutterSize(): number {
    return this._homePageOptions.gutterSize;
  }

  /**
   * Sets the default widget width in pixels
   */
  @Input() set widgetWidth(widgetWidth: number) {
    this._homePageOptions.widgetWidth = widgetWidth;
    if (this.homePage) {
      this.homePage.settings.widgetWidth = widgetWidth;
    }
  }

  get widgetWidth(): number {
    return this._homePageOptions.widgetWidth;
  }

  /**
   * Sets the default widget height in pixels
   */
  @Input() set widgetHeight(widgetHeight: number) {
    this._homePageOptions.widgetHeight = widgetHeight;
    if (this.homePage) {
      this.homePage.settings.widgetHeight = widgetHeight;
    }
  }

  get widgetHeight(): number {
    return this._homePageOptions.widgetHeight;
  }

  /**
   * Whether to animate widget placement
   */
  @Input() set animate(animate: boolean) {
    this._homePageOptions.animate = animate;
    if (this.homePage) {
      this.homePage.settings.animate = animate;
    }
  }

  get animate(): boolean {
    return this._homePageOptions.animate;
  }

  /**
   * this ...
   */
  @Input() set timeout(timeout: number) {
    this._homePageOptions.timeout = timeout;
    if (this.homePage) {
      this.homePage.settings.timeout = timeout;
    }
  }

  get timeout(): number {
    return this._homePageOptions.timeout;
  }

  /**
   * Specify the speed at which an animation progresses at different points within the animation.
   */
  @Input() set easing(easing: EasingType) {
    this._homePageOptions.easing = easing;
    if (this.homePage) {
      this.homePage.settings.easing = easing;
    }
  }

  get easing(): EasingType {
    return this._homePageOptions.easing;
  }

  // /**
  //  * The resize event is fired whenever a tab is selected giving the event handler a chance
  //  * to "veto" the tab selection change.
  //  *
  //  */
  // @Output() resize = new EventEmitter<SohoHomePageResizeEvent>();

  @HostBinding('class.homepage') isHomepage = true;

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the annotated SoHoXi control
  private homePage: SohoHomePageStatic;

  private _homePageOptions: SohoHomePageOptions = {};

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement.on('resize', (e, columns, stats: SohoHomePageResizeEvent) =>
        this.onResize(stats));

      // Initialise the SoHoXi control.
      this.jQueryElement.homepage(this._homePageOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case is 'homepage'.
      this.homePage = this.jQueryElement.data('homepage');
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.homePage) {
        this.homePage.destroy();
        this.homePage = null;
      }
    });
  }

  private onResize(stats: SohoHomePageResizeEvent) {
    if (this.maintainElementHeight) {
      (this.elementRef.nativeElement as HTMLElement).style.height = stats.containerHeight + 'px';
    }
  }
}
