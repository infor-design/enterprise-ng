import {
  AfterViewInit,
  Directive,
  ElementRef
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Personalise Directive.
 *
 * This component searches for a div element with the attribute
 * 'soho-personalize'.
 */
@Directive({
  selector: 'div[soho-personalize]',
})
export class SoHoPersonalizeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised, and the view is ready,
   * get the SoHoXi controls to apply any renderings.
   */
  ngAfterViewInit() {
    // @todo on the body?
    jQuery('body').personalize();
  }
}
