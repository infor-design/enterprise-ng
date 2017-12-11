import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Angular Wrapper for the SohoAlert Directive.
 *
 */
@Directive({
  selector: '[soho-alert]', // tslint:disable-line
  exportAs: 'soho-alert'
})
export class SohoAlertDirective implements AfterViewInit {

  private _options: SohoAlertOptions = {};
  private jQueryElement: JQuery;

  /** Set or remove the message. */
  @Input()
  public set message(message: string) {
    this._options.message = message;
    if (this.jQueryElement) {
      if (message) {
        this.jQueryElement.addMessage(this._options);
      } else {
        this.jQueryElement.removeMessage(this._options);
      }
    }
  }

  /** Set message with the SohoAlertType. */
  @Input()
  public set type(type: SohoAlertType) {
    this._options.type = type;
  }

  /**
   * Returns the data object data-errormessage
   *
   * @returns {JQuery}
   */
  // TODO: consider a method for getting a message of SohoAlertType
  get errorMessage() {
    return this.jQueryElement.getErrorMessage(this._options);
  }

  constructor(private el: ElementRef) {
    this._options.inline = true;
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any alerts.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.el.nativeElement);
  }

  // public methods
  /**
   * Adds an inline error message
   * @deprecated use addInlineMessage() instead
   * @param message
   */
  addInlineError(message: string) {
    this.addInlineMessage(message, 'error');
  }

  /**
   * Adds an inline message of the type specified
   *
   * @param message
   * @param type; defaults to 'error'
   */
  addInlineMessage(message: string, type?: SohoAlertType) {
    this.type = type || 'error';
    this.message = message;
  }

  /**
   * Removes the error message and/or tooltip error
   * @deprecated use removeMessage() instead
   */
  removeError() {
    this.removeMessage('error');
  }

  /**
   * Removes the message of the type specified and/or tooltip error
   *
   * @param type; defaults to 'error'
   */
  removeMessage(type?: SohoAlertType) {
    this.type = type || 'error';
    this.message = '';
  }

  removeAllMessages() {
    this.removeMessage('error');
    this.removeMessage('alert');
    this.removeMessage('confirm');
    this.removeMessage('info');
  }

  /**
   * Scrolls the element into the visible area of the browser window
   *
   * @param alignToTop (boolean) optional - true (default) element will be aligned to the top of the visible area of the scrollable ancestor
   */
  scrollIntoView(alignToTop?: boolean) {
    this.jQueryElement.scrollIntoView(alignToTop, this._options);
  }
}
