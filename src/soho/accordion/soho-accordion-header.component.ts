import {
  Component,
  HostBinding,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'soho-accordion-header',
  templateUrl: './soho-accordion-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoAccordionHeaderComponent implements AfterViewInit {
  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  jQueryElement: JQuery;

  @HostBinding('style.display') get isBlockDisplay() { return 'block'; };
  @HostBinding('class.accordion-header') get isAccordionHeader() { return true; };
  @HostBinding('class.hide-focus') get isHideFocus() { return true; };
  @HostBinding('class.has-chevron') get hasChevron() { return true; };

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private elementRef: ElementRef) {
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit(): void {
    console.log('hkfslkf;lskf');
    this.jQueryElement = jQuery(this.elementRef.nativeElement);
  }
}
