import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Personalise Directive.
 *
 * This component searches for an element with the attribute
 * 'soho-personalize'.
 */
@Directive({
  selector: '[soho-personalize]',
})
export class SohoPersonalizeDirective implements AfterViewInit {
  @Input() startingColor: string;
  @Input() startingTheme: string; // SOHO-4626: TODO not implemented in base soho library
  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised, and the view is ready,
   * get the SoHoXi controls to apply any renderings.
   */
  ngAfterViewInit() {
    // @todo on the body?
    jQuery('body').personalize({
      startingColor: this.startingColor
    });
  }
}
