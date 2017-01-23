import {
  AfterViewInit,
  Directive,
  ElementRef, Input
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Error Directive.
 *
 */
@Directive({
  selector: '[soho-error]', // tslint:disable-line
  exportAs: 'soho-error'
})
export class SohoErrorDirective implements AfterViewInit {

  private _options: SohoErrorOptions = {};
  private error: SohoErrorStatic;
  private jQueryElement: JQuery;

  constructor(private el: ElementRef) {
  }

  /** message for the error. */
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
    this.error = this.jQueryElement.data('data-errormessage');
  }

  /** set error in tooltip. */
  @Input()
  public set showTooltip(showTooltip: boolean) {
    this._options.showTooltip = showTooltip;
  }

  /** set error to be inline. */
  @Input()
  public set inline(inline: boolean) {
    this._options.inline = inline;
  }

  get errorMessage() {
    return this.error;
  }

  /** add inline error */
  addInlineError(message: string) {
    this.showTooltip = false;
    this.inline = true;
    this.message = message;
  }

  /** add tooltip error */
  addTooltipError(message: string) {
    this.showTooltip = true;
    this.inline = false;
    this.message = message;
  }

  /** remove inline/tooltip error */
  removeError() {
    this.message = '';
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any validations.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.el.nativeElement);

    this.error = this.jQueryElement.data('data-errormessage');
  }
}
