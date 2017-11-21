import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[soho-field-options]' // tslint:disable-line
})
export class SohoFieldOptionsDirective implements AfterViewInit, OnDestroy {

  private _options: SohoFieldOptionsSettings;

  @HostBinding('class.field-options')
  allFieldOptions = true;

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private fieldOptions: SohoFieldOptionsStatic;

  constructor(private element: ElementRef) {
    this._options = {
    };
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.fieldoptions(this._options);

    this.fieldOptions = this.jQueryElement.data('field-options');
  }

  /** Destructor. */
  ngOnDestroy() {
    if (this.fieldOptions) {
      this.fieldOptions.destroy();
      this.fieldOptions = null;
    }
  }
}
