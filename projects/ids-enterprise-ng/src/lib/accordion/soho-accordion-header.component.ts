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
  templateUrl: 'soho-accordion-header.component.html',
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
  jQueryElement!: JQuery;

  @HostBinding('class.is-disabled') isDisabled = false;
  @HostBinding('style.display') isBlockDisplay = 'block';
  @HostBinding('class.accordion-header') isAccordionHeader = true;
  @HostBinding('class.is-expanded') @Input() isExpanded = false;
  @HostBinding('class.module-nav-item') @Input() moduleNavItem = false;

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
