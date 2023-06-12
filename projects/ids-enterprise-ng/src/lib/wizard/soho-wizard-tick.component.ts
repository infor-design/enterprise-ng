import {
  ElementRef,
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  Input,
  HostListener
} from '@angular/core';

/**
 * Angular wrapper for the soho wizard tick.
 *
 * This wraps anchor tags annotated with the `soho-wizard-tick`.
 */
@Component({
  selector: 'a[soho-wizard-tick]', // eslint-disable-line
  template: '<span class="label" attr.data-shortLabel="{{shortLabel}}"><ng-content></ng-content></span>',
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
   * A shorter label.
   */
  @Input() public shortLabel?: string;

  /**
   * The id, used to link back to the pages.
   */
  @HostBinding('attr.tickid')
  @Input() public tickId!: string;

  /**
   *
   */
  @HostBinding('class.current')
  @Input() public current = false;

  /**
   * Disabled the tick.
   */
  @HostBinding('class.is-disabled')
  @Input() public disabled = false;

  /**
   * JQuery Element.
   */
  public jQueryElement?: JQuery;

  /**
   * Disable the click handler.
   */
  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public isCurrentTick(): boolean {
    // A step is selected if the element has the current class.
    return this.jQueryElement?.hasClass('current') || false;
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
