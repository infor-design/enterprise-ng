import {
  ElementRef,
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  Input
} from '@angular/core';

/**
 * Angular wrapper for the wizard tick.
 */
@Component({
  selector: 'a[soho-wizard-tick]', // tslint:disable-line
  template: '<span class="label">{{label}}</span>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardTickComponent implements AfterViewInit {

  @Input() label: string;

  @Input() @HostBinding('attr.href') href: string;

  @HostBinding('class.tick') isWizardTick = true;

  @HostBinding('attr.href') get hrefAttr() {
    return this.tickId ? '#' + this.tickId : null;
  }

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
