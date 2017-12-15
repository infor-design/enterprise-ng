import {
  Component,
  HostBinding,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  Input
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

  /**
   * Reference to the jQuery control - this is public so
   * it can be used in the api on the accordion control.
   */
  jQueryElement: JQuery;

  @HostBinding('class.is-disabled') isDisabled = false;
  @HostBinding('style.display') get isBlockDisplay() { return 'block'; }
  @HostBinding('class.accordion-header') get isAccordionHeader() { return true; }
  @HostBinding('class.is-expanded') @Input() isExpanded = false;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(public elementRef: ElementRef) {
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit(): void {
    this.jQueryElement = jQuery(this.elementRef.nativeElement);
  }
}
