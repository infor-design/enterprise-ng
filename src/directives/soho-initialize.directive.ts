import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Initialize Directive.
 *
 * This component searches for a div element with the attribute
 * 'soho-initialize'.
 */
@Directive({
  selector: 'div[soho-initialise]'
})
export class SoHoInitializeDirective implements AfterViewInit {

  // This needs to be input
  @Input() locale: string = 'en-US';

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    // @todo on the body?
    jQuery('body').initialize(this.locale);
  }
}
