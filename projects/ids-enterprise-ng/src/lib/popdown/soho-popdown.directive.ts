/// <reference path="soho-popdown.d.ts" />

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

   /*
   * If defined, provides a way to place the popdown against an alternate element.
   */
  @Input()
  set trigger(trigger: any) {
    this.popdownOptions.trigger = trigger;
  }

   /*
   * If true, when the popdown is opened, the first available input/button in its content area will be focused.
   */
  @Input()
  set autoFocus(autoFocus: boolean) {
    this.popdownOptions.autoFocus = autoFocus;
  }

   /*
   * If true, popdown will be toggle soon focused on the popdown trigger.
   */
  @Input()
  set toggleOnFocus(toggleOnFocus: boolean) {
    this.popdownOptions.toggleOnFocus = toggleOnFocus;
  }

  /**
   * Hook to work with tabbing in and out of the popdown.
   */
  @Input()
  set firstLastTab(firstLastTab: any) {
    this.popdownOptions.firstLastTab = firstLastTab;
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
