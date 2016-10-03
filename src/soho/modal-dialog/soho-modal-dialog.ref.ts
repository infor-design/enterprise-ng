import { Type, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Trigger types.
 */
export type SohoModalDialogTriggerType = 'immediate' | 'click' | 'manual';

/**
 * Wrapper for the jQuery modal control.
 *
 * @todo implement string html content
 */
export class SohoModalDialogRef<T> {
  /** The instance of component opened into the modal dialog. */
  public componentInstance: ComponentRef<T>;

  /** Selector referencing the modal-dialog after it has been moved to the dialog container. */
  private jQueryElement: any;

  /** Soho Control Api */
  private modal: ModalStatic;

  /** The result of the dialog. */
  private _dialogResult: any;

  /** Event fired when the modal is opened. */
  private open$: Subject<any> = new Subject();

  /** Event fired when the modal is closed. */
  private close$: Subject<any> = new Subject();

  /** Event fired after closing the modal. */
  private afterClose$: Subject<any> = new Subject();

  /** Event fired before openning the modal dialog. */
  private beforeOpen$: Subject<any> = new Subject();

  /** Event fired after openning the modal dialog. */
  private afterOpen$: Subject<any> = new Subject();

  /** Event fired before closing the modal dialog. */
  private beforeClose$: Subject<any> = new Subject();

  // @todo add other events.

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  /**
   * Cached options.
   */
  private _options: SohoModalOptions = {};

  /**
   * Sets the whole options block for this modal dialog.
   *
   * @param options - the options to set.
   */
  options(options: SohoModalOptions): SohoModalDialogRef<T> {
    this._options = options;

    // @todo update the dialog if required.
    if (this.modal) {
      this.modal.settings = options;
      // @todo - need an api on modal to update settings.
    }

    return this;
  }

  /**
   * Sets the frame height for the dialog.
   *
   * @param frameHeight - the extra frame height to allow.
   */
  frameHeight(frameHeight: number): SohoModalDialogRef<T> {
    this._options.frameHeight = frameHeight;
    if (this.modal) {
      this.modal.settings.frameHeight = frameHeight;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the title of the modal dialog.
   *
   * @param title - the title of the dialog.
   */
  title(title: string): SohoModalDialogRef<T> {
    this._options.title = title;
    if (this.modal) {
      this.modal.settings.title = title;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the buttons to use on the modal dialog.
   *
   * @param buttons - list of buttons to display
   */
  buttons(buttons: SohoModalButton[]): SohoModalDialogRef<T> {
    this._options.buttons = buttons;
    if (this.modal) {
      this.modal.settings.buttons = buttons;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'id' that the modal control uses.
   *
   * @param id - the id.
   */
  id(id: string): SohoModalDialogRef<T> {
    this._options.id = id;
    if (this.modal) {
      this.modal.settings.id = id;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'trigger' that the modal control uses.
   *
   * @param trigger -
   */
  trigger(trigger: SohoModalDialogTriggerType): SohoModalDialogRef<T> {
    this._options = trigger;
    if (this.modal) {
      this.modal.settings.trigger = trigger;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'isAlert' that the modal control uses.
   */
  isAlert(isAlert: boolean): SohoModalDialogRef<T> {
    this._options.isAlert = isAlert;
    if (this.modal) {
      this.modal.settings.isAlert = isAlert;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'content' that the modal control uses.
   */
  content(content: JQuery | string): SohoModalDialogRef<T> {
    // @todo allow html content to be specified.
    return this;
  }

  /**
   * Sets the 'cssClass' of the modal control.
   */
  cssClass(cssClass: string): SohoModalDialogRef<T> {
    this._options.cssClass = cssClass;
    if (this.modal) {
      this.modal.settings.cssClass = cssClass;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'autoFocus' of the modal control.
   *
   * @param autoFocus -if true; the dialog will autoFocus.
   */
  autoFocus(autoFocus: boolean): SohoModalDialogRef<T> {
    this._options.autoFocus = autoFocus;
    if (this.modal) {
      this.modal.settings.autoFocus = autoFocus;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

 /**
   * Dialog result property.
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
   * @param component the component to be instantiated.
   */
  constructor(private component: Type<T>) {
  }

  /**
   * Opens the dialog.
   *
   * @return the dialog ref.
   */
  open(): SohoModalDialogRef<T> {
    if (!this.componentInstance) {
      throw Error('componentInstance must be initialised.');
    }

    const element = jQuery(this.componentInstance.location.nativeElement);
    // @todo support string HTML content?
    this._options.content = element;
    element.modal(this._options);
    this.modal = element.data('modal');

    // When the modal is opened, it is moved to the body, so
    // set the jQueryElement.
    this.jQueryElement = this.modal.element;

    // Add listeners to fire events
    this.jQueryElement.on('afteropen', ((event: any) => { this.onAfterOpen(event); }));
    this.jQueryElement.on('beforeopen', ((event: any) => { this.onBeforeOpen(event); }));
    this.jQueryElement.on('beforeclose', ((event: any) => { return this.onBeforeClose(event); }));
    this.jQueryElement.on('close', ((event: any, isCancelled: boolean) => { this.onClose(event, isCancelled); }));
    this.jQueryElement.on('afterclose', ((event: any) => { this.onAfterClose(event); }));
    this.jQueryElement.on('open', ((event: any) => { this.onOpen(event); }));
    this.jQueryElement.on('beforedestroy', ((event: any) => { return this.onBeforeDestroy(event); }));

    // @todo return a promise / observable for when the dialog is closed or opened?
    return this;
  }

  /**
   * Closes the modal dialog, if open.  The dialog is not closed
   * fully until the 'afterClosed' event is fired.
   *
   * @param dialogResult - optional result - passed abck to the caller.
   */
  close(dialogResult?: any): SohoModalDialogRef<T> {
    this.dialogResult = dialogResult;
    if (this.modal) {
      this.modal.close();
    }
    return this;
  };

  // ------------------------------------------
  // Events
  // ------------------------------------------

  /**
   * Opened Event.
   *
   * This event is fired when the dialog is being opened.
   *
   * @param eventFn - the function to invoke when the dialog is to be opened.
   */
  opened(eventFn: Function): SohoModalDialogRef<T> {
    this.open$.subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * Closed Event.
   *
   * This event is fired when the dialog is being closed.
   *
   * @param eventFn - the function to invoke when the dialog is to be closed.
   */
  closed(eventFn: SohoModalDialogEventFunction<T>): SohoModalDialogRef<T> {
    // @todo isCancelled
    this.close$.subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * After Closed Event.
   *
   * This event is fired, with the result of the dialog, when the dialog has been
   * closed and destroyed.
   *
   * @param eventFn - the function to invoke after the dialog has been closed.
   */
  afterClosed(eventFn: SohoModalDialogEventFunction<T>): SohoModalDialogRef<T> {
    this.afterClose$.subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handles the 'afterOpen' event, fired after the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   */
  private onAfterOpen(event: any) {
    this.afterOpen$.next(event);
  }

  /**
   * Handles the 'beforeOpen' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   */
  private onBeforeOpen(event: any) {
    this.beforeOpen$.next(event);
  }

  /**
   * Handles the 'beforeClose' event, fired before the modal dialog
   * has been closed.
   *
   * @param event - full event object.
   *
   * @todo how to handle closeure prevention?
   */
  private onBeforeClose(event: any): boolean {
    this.beforeClose$.next(event);
    return true;
  }

  /**
   * Handles the 'open' event, fired just before
   * the focus is assigned to a modal.
   *
   * @param event - full event object.
   */
  private onOpen(event: any) {
    this.open$.next(event);
  }

  /**
   * Handles the close event.
   *
   * @param event - full event object.
   * @param isCancelled - is true if the cancel button was pressed; otherwise false.
   */
  private onClose(event: any, isCancelled: boolean) {
    this.close$.next(isCancelled);
  }

  /**
   * Handles the 'afterClose' event, fired when the dialog
   * has been closed and tidy up is required.
   *
   * @param event - full event object.
   */
  private onAfterClose(event: any) {
    // Pass the dialog result back.
    this.afterClose$.next(this.dialogResult);
    this.afterClose$.complete();

    // SOHO-4879 - Closing modal dialog does not remove the 'modal-page-container'
    this.modal.destroy();
    this.modal = null;
  }

  /**
   * Handles the 'destroy' event.
   *
   * @param event - full event object.
   */
  private onBeforeDestroy(event: any): boolean {
    // Tidy up any angular component stuff.
    this.componentInstance.destroy();

    // @todo prevent destruction?
    return true;
  }
}

type SohoModalDialogEventFunction<T> = (f: any, modal: SohoModalDialogRef<T>) => void;
