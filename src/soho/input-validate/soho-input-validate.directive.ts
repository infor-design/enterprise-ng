import {
  AfterViewInit,
  Directive,
  ElementRef
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Input Validate Directive.
 *
 * This component searches for an element with the attribute
 * 'data-validate' or 'data-validate-on="submmit"'.
 */
@Directive({
  selector: 'input[data-validate], input[data-validate-on="submit"]', // tslint:disable-line
})
export class SohoInputValidateDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {
    const jQueryEl: any = jQuery(this.el.nativeElement);
    jQueryEl.validate();
  }
}
