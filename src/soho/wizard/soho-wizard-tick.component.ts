import {
  ElementRef,
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  Input
} from '@angular/core';

/**
 * Angular wrapper for the soho wizard tick.
 *
 * This wraps anchor tags annotated with the `soho-wizard-tick`.
 */
@Component({
  selector: 'a[soho-wizard-tick]', // tslint:disable-line
  template: '<span class="label"><ng-content></ng-content></span>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardTickComponent implements AfterViewInit {

  /**
   * Ensure any classes are set correctly.
   */
  @HostBinding('class.tick') isWizardTick = true;

  /**
   * For the `href` use the id.
   */
  @HostBinding('attr.href') get hrefAttr() {
    return this.tickId ? '#' + this.tickId : null;
  }

  /**
   * The id, used to link back to the pages.
   */
  @Input() public tickId: string;

  @HostBinding('class.current')
  @Input() public current = false;

  /**
   * Disabled the tick.
   */
  @HostBinding('class.is-disabled')
  @Input() public disabled = false;

  public jQueryElement: JQuery;

  public isCurrentTick(): boolean {
    // A step is selected if the element has the current class.
    return this.jQueryElement && this.jQueryElement.hasClass('current');
  }

  /**
   * Constructor.
   *
   * @param elementRef - the element matching this component.
   */
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    // Wrap the "unordered list" element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);
  }
}
