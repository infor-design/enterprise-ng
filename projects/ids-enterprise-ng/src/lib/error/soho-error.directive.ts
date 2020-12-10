import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Error Directive.
 *
 * @deprecated - use SohoAlert instead
 */
@Directive({
  selector: '[soho-error]', // eslint-disable-line
  exportAs: 'soho-error'
})
export class SohoErrorDirective implements AfterViewInit {

  private _options: SohoErrorOptions = {}; // eslint:disable-line
  private jQueryElement?: JQuery;

  constructor(private el: ElementRef) {
  }

  /**
   *  message for the error.
   *
   * @deprecated - use SohoAlert instead
   */
  @Input()
  public set message(message: string) {
    this._options.message = message;
    if (this.jQueryElement) {
      if (message) {
        this.jQueryElement.addError(this._options);
      } else {
        this.jQueryElement.removeError(this._options);
      }
    }
  }

  /**
   *  set error in tooltip.
   *
   * @deprecated - use SohoAlert instead
   */
  @Input()
  public set showTooltip(showTooltip: boolean) {
    this._options.showTooltip = showTooltip;
  }

  /**
   * set error to be inline.
   *
   * @deprecated - use SohoAlert instead
   */
  @Input()
  public set inline(inline: boolean) {
    this._options.inline = inline;
  }

  /**
   * Returns the data object data-errormessage
   *
   * @deprecated - use SohoAlert instead
   */
  get errorMessage() {
    return this.jQueryElement?.getErrorMessage(this._options);
  }

  /**
   * add inline error
   *
   * @deprecated - use SohoAlert instead
   */
  addInlineError(message: string) {
    this.showTooltip = false; // eslint-disable-line
    this.inline = true; // eslint-disable-line
    this.message = message; // eslint-disable-line
  }

  /**
   * add tooltip error
   *
   * @deprecated - use SohoAlert instead
   */
  addTooltipError(message: string) {
    this.showTooltip = true; // eslint-disable-line
    this.inline = false; // eslint-disable-line
    this.message = message; // eslint-disable-line
  }

  /**
   * remove inline/tooltip error
   *
   * @deprecated - use SohoAlert instead
   */
  removeError() {
    this.message = ''; // eslint-disable-line
  }

  /**
   * Scrolls the element into the visible area of the browser window
   *
   * @deprecated - use SohoAlert instead
   * @param alignToTop (boolean) optional - true (default) element will be aligned to the top of the visible area of the scrollable ancestor
   */
  scrollIntoView(alignToTop?: boolean) {
    this.jQueryElement?.scrollIntoView(alignToTop, this._options);
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.el.nativeElement);
  }
}
