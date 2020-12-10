import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy
} from '@angular/core';

/**
 * Angular Directive for keeping a homepage elements height correctly up to date.
 */
@Directive({
  selector: '[soho-homepage-sizer]', // eslint-disable-line
})
export class SohoHomepageSizerDirective implements AfterViewInit, OnDestroy {
  @HostBinding('style.height.px') get heightStyle() {
 return this.containerHeight;
}

  private jQueryElement?: JQuery;
  private containerHeight?: number;

  constructor(public elementRef: ElementRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement.on('resize', (_e, _columns, stats: SohoHomePageResizeEvent) =>
        this.ngZone.run(() => setTimeout(() =>
          this.containerHeight = stats.containerHeight)));
    });
  }

  ngOnDestroy(): void {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement?.off();
    });
  }
}
