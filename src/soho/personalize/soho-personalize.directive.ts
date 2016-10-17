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

  /** Options. */
  @Input() options: SohoPersonalizeOptions = {};

  /** The starting colour. */
  @Input() set startingColor(value: string) {
    this.options.startingColor = value;
  }

  /** The starting theme. */
  @Input() set startingTheme(value: string) {
    // SOHO-4626: TODO not implemented in base soho library
    // this.options.startingTheme = value;
  }

  /**
   * Constructor.
   */
  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised, and the view is ready,
   * get the SoHoXi controls to apply any renderings.
   */
  ngAfterViewInit() {
    jQuery('body').personalize(this.options);
  }
}
