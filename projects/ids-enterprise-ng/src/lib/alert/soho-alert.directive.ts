import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone
} from '@angular/core';

/**
 * Angular Wrapper for the SohoAlert Directive.
 *
 */
@Directive({
  selector: '[soho-alert]', // eslint-disable-line
  exportAs: 'soho-alert'
})
export class SohoAlertDirective implements AfterViewInit {

  private _options: SohoAlertOptions;
  private jQueryElement?: JQuery;

  /** Set or remove the message. */
  @Input()
  public set message(message: string) {
    this._options.message = message;
    if (this.jQueryElement) {
      this.ngZone.runOutsideAngular(() => {
        if (message) {
          this.jQueryElement?.addMessage(this._options);
        } else {
          this.jQueryElement?.removeMessage(this._options);
        }
      });
    }
  }

  @Input()
  public set id(id: string) {
    this._options.id = id;
  }

  @Input()
  public set type(type: SohoAlertType) {
    this._options.type = type || 'error';
  }

  /** Set message with or without control color */
  @Input()
  public set isAlert(isAlert: boolean | undefined) {
    this._options.isAlert = isAlert || false;
  }

  /** Set message whether to trigger events */
  @Input()
  public set triggerEvents(triggerEvents: boolean | undefined) {
    this._options.triggerEvents = (typeof triggerEvents !== 'boolean') ? true : triggerEvents;
  }

  /** Set message with or without custom icon */
  @Input()
  public set icon(icon: string | undefined) {
    this._options.icon = icon;
  }

  /**
   * Returns the data object data-errormessage
   *
   * @deprecated use getMessage() instead
   * @return error
   */
  get errorMessage(): string {
    return this.getMessage('error');
  }

  constructor(
    public elementRef: ElementRef,
    private ngZone: NgZone,
  ) {
    this._options = {
      inline: true,
      type: 'error'
    };
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
   *
   * @deprecated use addInlineMessage() instead
   * @param message the error message to add.
   */
  addInlineError(message: string) {
    this.addInlineMessage(message, 'error');
  }

  /**
   * Adds an inline message of the type specified
   *
   * @param message the message to add.
   * @param type optional - 'error' (default)
   * @param isAlert optional - false (default)
   * @param triggerEvents optional - true (default)
   * @param icon optional
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
   * @param type optional - 'error' default
   * @return returns the message for the given type.
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
   *
   * @deprecated use removeMessage() instead
   */
  removeError() {
    this.removeMessage('error');
  }

  /**
   * Removes the message of the type specified
   *
   * @param type optional - 'error' (default)
   * @param triggerEvents optional - true (default) triggers events
   */
  removeMessage(type?: SohoAlertType, triggerEvents?: boolean | undefined) {
    this.type = type;
    this.triggerEvents = triggerEvents;
    this.message = '';
  }

  /**
   * Removes the message for all types
   *
   * @param triggerEvents optional - true (default) triggers events
   */
  removeAllMessages(triggerEvents?: boolean) {
    this.removeMessage('error', triggerEvents);
    this.removeMessage('alert', triggerEvents);
    this.removeMessage('success', triggerEvents);
    this.removeMessage('info', triggerEvents);
    this.removeMessage('icon', triggerEvents);
  }

  /**
   * Scrolls the element into the visible area of the browser window
   *
   * @param alignToTop optional - true (default) element will be aligned to the top of the visible area of the scrollable ancestor
   */
  scrollIntoView(alignToTop?: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.scrollIntoView(alignToTop, this._options);
    }
  }
}
