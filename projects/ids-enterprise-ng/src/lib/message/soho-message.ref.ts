import { Subject } from 'rxjs';

import { SohoModalDialogVetoableEventGuard } from '../modal-dialog/soho-modal-dialog.ref';

/**
 * Wrapper for the jQuery modal control.
 */
export class SohoMessageRef {
  /** Vetoable Event Guard */
  private eventGuard: SohoModalDialogVetoableEventGuard<any> = {};

  /** Selector referencing the modal-dialog after it has been moved to the dialog container. */
  private jQueryElement?: JQuery;

  /** Soho Control Api */
  private _message?: SohoMessageStatic;

  /** The result of the dialog. */
  private _dialogResult: any;

  /** Dialog placeholder, defaults to $('body')*/
  private _placeholder: JQuery;

  /** Event fired when the message is opened. */
  private open$: Subject<any> = new Subject();

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  /**
   * Cached options.
   */
  private _options: SohoMessageOptions = {};

  /**
   * Sets the whole options block for this modal dialog.
   *
   * @param options - the options to set.
   */
  options(options?: SohoMessageOptions): SohoMessageRef {
    this._options = options || {};
    return this;
  }

  /**
   * Sets the width for the dialog.
   *
   * @param width - the extra frame height to allow.
   */
  frameHeight(width: number): SohoMessageRef {
    this._options.width = width;
    return this;
  }

  /**
   * Sets the title of the message dialog.
   *
   * @param title - the title of the dialog.
   */
  title(title: string): SohoMessageRef {
    this._options.title = title;
    return this;
  }

  /**
   * Sets the buttons to use on the modal dialog.
   *
   * @param buttons - list of buttons to display
   */
  buttons(buttons: SohoModalButton[]): SohoMessageRef {
    this._options.buttons = buttons;
    return this;
  }

  /**
   * Is this an error dialog?
   *
   * @param isError - true if this dialog is to be styled an an alert.
   */
  isError(isError: boolean): SohoMessageRef {
    this._options.isError = isError;
    return this;
  }

  /**
   * Sets the 'message' that the message dialog displays.
   *
   * @param message - a selector or string representing the dialog content.
   */
  message(message: string): SohoMessageRef {
    this._options.message = message;
    return this;
  }

  /**
   * Sets the 'status' of the modal control.
   */
  status(status: string): SohoMessageRef {
    this._options.status = status;
    return this;
  }

  /**
   * Sets the 'cssClass' of the modal control.
   */
  cssClass(cssClass: string): SohoMessageRef {
    this._options.cssClass = cssClass;
    return this;
  }

  /**
   * If true, it will show a close icon button on the top right of the message.
   * 
   * @param showCloseBtn - if true, the x button will be shown.
   */
  showCloseBtn(showCloseBtn: boolean): SohoMessageRef {
    this._options.showCloseBtn = showCloseBtn;
    return this;
  }

  /**
   * Sets the 'allowTags' of the modal control.
   */
  allowedTags(allowedTags: string): SohoMessageRef {
    this._options.allowedTags = allowedTags;
    return this;
  }

  /**
   * Sets the 'returnFocus' of the modal control.
   *
   * @param returnFocus -if true; the dialog will autoFocus.
   */
  returnFocus(returnFocus: JQuery): SohoMessageRef {
    this._options.returnFocus = returnFocus;
    return this;
  }

  /**
   * Controls the opacity of the background overlay.
   *
   * @param overlayOpacity - The percent between 0 and 1 of opacity to use.
   */
  overlayOpacity(overlayOpacity: number): SohoMessageRef {
    this._options.overlayOpacity = overlayOpacity;
    return this;
  }

  /**
   * Causes this modal instance to become hidden when another modal is displayed over top.
   *
   * @param hideUnderneath - If it should be on top or bottom.
   */
  hideUnderneath(hideUnderneath: boolean): SohoMessageRef {
    this._options.hideUnderneath = hideUnderneath;
    return this;
  }

  /**
   * Causes this modal instance to become hidden when another modal is displayed over top.
   *
   * @param hideUnderneath - If it should be on top or bottom.
   */
  attributes(attributes: Array<Object> | Object): SohoMessageRef {
    this._options.attributes = attributes;
    return this;
  }

  /**
   * Dialog result property.
   *
   * @param dialogResult - the stored restult of the dialog.
   */
  set dialogResult(dialogResult: any) {
    this._dialogResult = dialogResult;
  }
  get dialogResult(): any {
    return this._dialogResult;
  }

  /**
   * Constructor.
   *
   * @param placeholder for the dialog; defaults to the body.
   */
  constructor() {
    this._placeholder = $('body');
  }

  /**
   * Displays the message.
   *
   * @return the dialog ref.
   */
  open(): SohoMessageRef {
    // Returns the body!
    this._placeholder.message(this._options);

    // Need a better way of locating the message dialog.
    this.jQueryElement = this._placeholder.find('.modal.message');

    // Get the api.
    this._message = this.jQueryElement.data('modal');

    // Add listeners to control event (which are on the placeholder)
    this._placeholder.off('open').on('open', ((event: any) => {
      this.onOpen(event);
    }));

    // These are vetoable events.
    this._placeholder.off('beforeopen').on('beforeopen', ((event: any) => this.onBeforeOpen(event)));
    this._placeholder.off('beforeclose').on('beforeclose', ((event: any) => this.onBeforeClose(event)));

    return this;
  }

  /**
   * Closes the modal dialog, if open.
   *
   * @param dialogResult - optional result - held for the caller.
   */
  close(dialogResult?: any): SohoMessageRef {
    this.dialogResult = dialogResult;
    if (this._message) {
      this._message.close();
    }
    return this;
  }

  // ------------------------------------------
  // Event Registration
  // ------------------------------------------

  /**
   * Registers a before open guard.
   *
   * @param eventFn - the function to call before openning the dialog.
   */
  beforeOpen(eventFn: () => boolean): SohoMessageRef {
    this.eventGuard.beforeOpen = eventFn;
    return this;
  }

  /**
   * Opened Event.
   *
   * This event is fired when the dialog is being opened.
   *
   * @param eventFn - the function to invoke when the dialog is to be opened.
   */
  opened(eventFn: Function): SohoMessageRef {
    this.open$.subscribe((f: any) => {
      eventFn(f, this);
    });
    return this;
  }

  /**
   * Registers a before close guard.
   *
   * @param eventFn - the function to call before closing the dialog.
   */
  beforeClose(eventFn: () => boolean): SohoMessageRef {
    this.eventGuard.beforeClose = eventFn;
    return this;
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handles the 'beforeOpen' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   *
   * @return true if the dialog can be opened; otherwise false if veoted.
   */
  private onBeforeOpen(_event: any): boolean | undefined {
    const fn: Function = (this.eventGuard.beforeOpen as any);
    return fn ? fn.call(this.eventGuard) : true;
  }

  /**
   * Handles the 'beforeCloseEvent, fired before the modal dialog
   * is closed, allowing the closure to be vetoed.
   *
   * @param event - event object.
   * @return true if the dialog can be closed; otherwise false if veoted.
   */
  private onBeforeClose(_event: any): boolean {
    const fn = this.eventGuard.beforeClose;
    return fn ? fn.call(this.eventGuard, this, ({} as any), undefined) : true;
  }

  /**
   * Handles the 'open' event, fired just before
   * the focus is assigned to a message.
   *
   * @param event - full event object.
   */
  private onOpen(event: any) {
    this.open$.next(event);
  }

}
