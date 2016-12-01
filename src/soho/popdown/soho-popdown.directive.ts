import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[soho-popdown]', // tslint:disable-line
})
export class SohoPopDownDirective implements AfterViewInit, OnDestroy {
  @HostBinding('attr.popdown') get isPopdown() { return true; }

  private jQueryElement: JQuery;
  private popdown: SohoPopDownStatic;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.popdown();
    this.popdown = this.jQueryElement.data('popdown');
  }

  ngOnDestroy() {
    if (this.popdown) {
      this.popdown.destroy();
    }
  }
}
