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
  template: '<span class="label">{{label}}</span>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardTickComponent implements AfterViewInit {

  /**
   * The label displayed on the tick.
   */
  @Input() label: string;

  /**
   * Ensure any classes are set correctly.
   */
  @HostBinding('class.tick') isWizardTick = true;

  /**
   * For the `href` use the tickid.
   */
  @HostBinding('attr.href') get hrefAttr() {
    return this.tickId ? '#' + this.tickId : null;
  }

  /**
   * The tickId, used to link back to the pages.
   */
  @Input()
  public tickId = 0;

  public jQueryElement: JQuery;

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
