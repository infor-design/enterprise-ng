import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: 'label[soho-label]' // tslint:disable-line
})
export class SohoLabelDirective implements AfterViewInit, OnDestroy {
  /**
   * Indicate that the label is audible
   */
  @Input() audible: boolean;

  /**
   * Indicate that the label is required
   */
  @Input() required: boolean;

  /**
   * Bind attributes to the host label element
   */

  @HostBinding('class.audible') get isAudible() {
    return this.audible ? true : false;
  }

  @HostBinding('class.required') get isRequired() {
    return this.required ? true : false;
  }

  /**
   * Local variables
   */
  private jQueryElement: any;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // no control initializer for label
  }

  ngOnDestroy() {
  }
}
