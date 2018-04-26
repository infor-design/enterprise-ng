import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  Input
} from '@angular/core';

@Directive({
  selector: '[soho-popdown]', // tslint:disable-line
})
export class SohoPopDownDirective implements AfterViewInit, OnDestroy {
  @HostBinding('attr.popdown') get isPopdown() { return true; }

  private jQueryElement: JQuery;

  private popdown: SohoPopDownStatic;

  private popdownOptions: SohoPopDownOptions = {};

  @Input()
  set keepOpen(keepOpen: boolean) {
    this.popdownOptions.keepOpen = keepOpen;
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.popdown(this.popdownOptions);
    this.popdown = this.jQueryElement.data('popdown');
  }

  ngOnDestroy() {
    if (this.popdown) {
      this.popdown.destroy();
    }
  }

  open() {
    this.popdown.open();
  }

  close() {
    this.popdown.close();
  }
}
