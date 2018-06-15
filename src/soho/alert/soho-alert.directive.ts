import {AfterViewInit, Directive, ElementRef, Input, NgZone} from '@angular/core';

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
      this.ngZone.runOutsideAngular(() => {
        if (message) {
          this.jQueryElement.addMessage(this._options);
        } else {
          this.jQueryElement.removeMessage(this._options);
        }
      });
    }
  }

  /** Set message with the SohoAlertType. */
  @Input()
  public set type(type: SohoAlertType) {
    this._options.type = type || 'error';
  }

  /** Set message with or without control color */
  @Input()
  public set isAlert(isAlert: boolean) {
    this._options.isAlert = isAlert || false;
  }

  /** Set message whether to trigger events */
  @Input()
  public set triggerEvents(triggerEvents: boolean) {
    this._options.triggerEvents = (typeof triggerEvents !== 'boolean') ? true : triggerEvents;
  }

  /** Set message with or without custom icon */
  @Input()
  public set icon(icon: string) {
    this._options.icon = icon;
  }

  /**
   * Returns the data object data-errormessage
   * @deprecated use getMessage() instead
   * @returns {string}
   */
  get errorMessage(): string {
    return this.getMessage('error');
  }

  constructor(
    public elementRef: ElementRef,
    private ngZone: NgZone,
  ) {
    this._options.inline = true;
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any alerts.
   */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);
    });
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
   * @param {string} message
   * @param {SohoAlertType} type optional - 'error' (default)
   * @param {boolean} isAlert optional - false (default)
   * @param {boolean} triggerEvents optional - true (default)
   * @param {string} icon optional
   */
  addInlineMessage(message: string, type?: SohoAlertType, isAlert?: boolean, triggerEvents?: boolean, icon?: string) {
    this.type = type;
    this.isAlert = isAlert;
    this.triggerEvents = triggerEvents;
    this.icon = icon;
    this.message = message;
  }

  /**
   * Gets the message of the type specified
   *
   * @param {SohoAlertType} type optional - 'error' default
   * @returns {string}
   */
  getMessage(type?: SohoAlertType): string {
    if (this.jQueryElement) {
      this.type = type;
      return this.jQueryElement.getMessage(this._options);
    }

    return '';
  }

  /**
   * Removes the error message
   * @deprecated use removeMessage() instead
   */
  removeError() {
    this.removeMessage('error');
  }

  /**
   * Removes the message of the type specified
   *
   * @param {SohoAlertType} type optional - 'error' (default)
   * @param {boolean} triggerEvents optional - true (default) triggers events
   */
  removeMessage(type?: SohoAlertType, triggerEvents?: boolean) {
    this.type = type;
    this.triggerEvents = triggerEvents;
    this.message = '';
  }

  /**
   * Removes the message for all types
   *
   * @param {boolean} triggerEvents optional - true (default) triggers events
   */
  removeAllMessages(triggerEvents?: boolean) {
    this.removeMessage('error', triggerEvents);
    this.removeMessage('alert', triggerEvents);
    this.removeMessage('confirm', triggerEvents);
    this.removeMessage('info', triggerEvents);
    this.removeMessage('icon', triggerEvents);
  }

  /**
   * Scrolls the element into the visible area of the browser window
   *
   * @param {boolean} alignToTop optional - true (default) element will be aligned to the top of the visible area of the scrollable ancestor
   */
  scrollIntoView(alignToTop?: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.scrollIntoView(alignToTop, this._options);
    }
  }
}
